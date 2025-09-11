/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { io, type Socket } from "socket.io-client";
import { useCookies } from "react-cookie";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  EllipsisVerticalIcon,
  Trash2Icon,
  Send,
  Wifi,
  WifiOff,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";

import {
  getMessage,
  getProfileApi,
  getUserProfileApi,
  sendMessage,
} from "@/lib/api/auth/auth";
import { getChatListApi } from "@/lib/api/core/core";
import { serverImageBuilder } from "@/lib/formatter";
import type { AnyType } from "@/lib/config/error-type";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import howl from "@/lib/howl";
import { BASE_ENDPOINT } from "@/lib/config/data";

interface Message {
  id?: string;
  sender_id: string;
  receiver_id: string;
  message: string;
  timestamp: string;
  status?: "sending" | "sent" | "delivered" | "failed";
}

interface SocketStatus {
  connected: boolean;
  reconnecting: boolean;
  error?: string;
}

const SOCKET_URL = BASE_ENDPOINT;

const RECONNECTION_ATTEMPTS = 10;
const RECONNECTION_DELAY = 1000;
const MESSAGE_RETRY_DELAY = 3000;

export default function ChatPage() {
  const [cookies] = useCookies(["ghost"]);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [socketStatus, setSocketStatus] = useState<SocketStatus>({
    connected: false,
    reconnecting: false,
  });
  const [retryQueue, setRetryQueue] = useState<Message[]>([]);

  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const retryTimeoutRef = useRef<AnyType>(null);

  const id = useSearchParams().get("id");

  useEffect(() => {
    if (id && id !== selectedChat) {
      setSelectedChat(id);
      setMessages([]); // Clear messages when switching chats
    }
  }, [id, selectedChat]);

  const { data: me, isError: profileError }: AnyType = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfileApi(cookies.ghost),
    enabled: !!cookies.ghost,
    retry: 3,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const {
    data: user,
    isPending: userPending,
    isError: userError,
  } = useQuery({
    queryKey: ["user", selectedChat],
    queryFn: (): AnyType =>
      getUserProfileApi(selectedChat ?? "", cookies.ghost),
    enabled: !!selectedChat && !!cookies.ghost,
    retry: 2,
  });

  const {
    data: list,
    isPending: listPending,
    isError: listError,
  } = useQuery({
    queryKey: ["chatList", search],
    queryFn: (): AnyType => getChatListApi(cookies.ghost, search),
    enabled: !!cookies.ghost,
    retry: 2,
    refetchInterval: 30000,
  });

  const {
    data: chatData,
    isLoading: chatLoading,
    isError: chatError,
  } = useQuery({
    queryKey: ["chat", selectedChat],
    queryFn: (): AnyType => getMessage(selectedChat ?? "", cookies.ghost),
    enabled: !!selectedChat && !!cookies.ghost,
    retry: 2,
  });

  const { mutate: sendMessageMutation, isPending: sendingMessage } =
    useMutation({
      mutationKey: ["chat_send"],
      mutationFn: (data: { receiver_id: string | number; message: string }) =>
        sendMessage(data, cookies.ghost),
      onError: (error, variables) => {
        console.error("Failed to send message:", error);
        toast.error("Failed to send message. Will retry...");

        // Add to retry queue
        const failedMessage: Message = {
          id: Date.now().toString(),
          sender_id: me?.data?.id.toString() || "",
          receiver_id: variables.receiver_id.toString(),
          message: variables.message,
          timestamp: new Date().toISOString(),
          status: "failed",
        };

        setRetryQueue((prev) => [...prev, failedMessage]);
        scheduleRetry();
      },
      onSuccess: () => {
        // Clear any failed messages for this chat from retry queue
        setRetryQueue((prev) =>
          prev.filter((msg) => msg.receiver_id !== selectedChat)
        );
      },
    });

  // const scrollToBottom = useCallback(() => {
  //   if (messagesEndRef.current) {
  //     messagesEndRef.current.scrollIntoView({ behavior: SCROLL_BEHAVIOR });
  //   }
  // }, []);

  useEffect(() => {
    if (!me?.data?.id || !cookies.ghost) return;
    if (socketRef.current?.connected) return;

    console.log("🔌 Initializing socket for user:", me.data.id);
    setSocketStatus((prev) => ({ ...prev, reconnecting: true }));

    const socket = io(SOCKET_URL, {
      query: {
        userId: me.data.id,
        token: cookies.ghost,
      },
      reconnectionAttempts: RECONNECTION_ATTEMPTS,
      reconnectionDelay: RECONNECTION_DELAY,
      timeout: 10000,
      forceNew: true,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket.id);
      setSocketStatus({ connected: true, reconnecting: false });
      toast.success("Connected to chat server");
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Socket connect error:", err.message);
      setSocketStatus({
        connected: false,
        reconnecting: true,
        error: err.message,
      });
      toast.error("Connection failed. Retrying...");
    });

    socket.on("disconnect", (reason) => {
      console.log("❌ Socket disconnected:", reason);
      setSocketStatus({
        connected: false,
        reconnecting: reason === "io client disconnect" ? false : true,
      });

      if (reason !== "io client disconnect") {
        toast.warning("Connection lost. Reconnecting...");
      }
    });

    socket.on("reconnect", (attemptNumber) => {
      console.log("🔄 Socket reconnected after", attemptNumber, "attempts");
      setSocketStatus({ connected: true, reconnecting: false });
      toast.success("Reconnected to chat server");
    });

    socket.on("reconnect_failed", () => {
      console.error("❌ Socket reconnection failed");
      setSocketStatus({
        connected: false,
        reconnecting: false,
        error: "Failed to reconnect",
      });
      toast.error("Unable to connect to chat server");
    });

    socket.on("privateMessage", (msg: any) => {
      try {
        const normalized: Message = {
          id: msg.id || `${msg.senderId || msg.sender_id}-${Date.now()}`,
          sender_id: (msg.senderId || msg.sender_id)?.toString() || "",
          receiver_id: (msg.receiverId || msg.receiver_id)?.toString() || "",
          message: msg.message || "",
          timestamp: msg.timestamp || new Date().toISOString(),
          status: "delivered",
        };

        // Only add if it's for the current chat
        if (
          normalized.sender_id === selectedChat ||
          normalized.receiver_id === selectedChat
        ) {
          setMessages((prev) => {
            // Prevent duplicates
            const exists = prev.some(
              (m) =>
                m.id === normalized.id ||
                (m.message === normalized.message &&
                  Math.abs(
                    new Date(m.timestamp).getTime() -
                      new Date(normalized.timestamp).getTime()
                  ) < 1000)
            );

            if (exists) return prev;
            return [...prev, normalized];
          });

          // Play notification sound for received messages
          if (normalized.sender_id !== me?.data?.id.toString()) {
            // You can add sound notification here
            console.log("📨 New message received");
          }
        }
      } catch (error) {
        console.error("Error processing incoming message:", error);
      }
    });

    return () => {
      console.log("🔌 Cleaning up socket connection");
      socket.disconnect();
      socketRef.current = null;
      setSocketStatus({ connected: false, reconnecting: false });
    };
  }, [me?.data?.id, cookies.ghost, selectedChat]);

  const handleSend = useCallback(() => {
    const trimmedMessage = newMessage.trim();

    if (!trimmedMessage || !selectedChat || !me?.data?.id) {
      return;
    }

    if (trimmedMessage.length > 1000) {
      toast.error("Message is too long (max 1000 characters)");
      return;
    }

    const tempId = `temp-${Date.now()}`;
    const optimisticMessage: Message = {
      id: tempId,
      sender_id: me.data.id.toString(),
      receiver_id: selectedChat,
      message: trimmedMessage,
      timestamp: new Date().toISOString(),
      status: "sending",
    };

    // Optimistically add message to UI
    setMessages((prev) => [...prev, optimisticMessage]);
    setNewMessage("");

    // Focus back to input
    setTimeout(() => inputRef.current?.focus(), 0);

    try {
      // Send via socket if connected
      if (socketRef.current?.connected) {
        socketRef.current.emit("privateMessage", {
          receiverId: Number.parseInt(selectedChat),
          message: trimmedMessage,
        });
      }

      // Send to backend
      sendMessageMutation(
        { receiver_id: Number.parseInt(selectedChat), message: trimmedMessage },
        {
          onSuccess: () => {
            // Update message status to sent
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === tempId ? { ...msg, status: "sent" } : msg
              )
            );

            // Invalidate queries to refresh chat list
            queryClient.invalidateQueries({ queryKey: ["chatList"] });
          },
          onError: () => {
            // Update message status to failed
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === tempId ? { ...msg, status: "failed" } : msg
              )
            );
          },
        }
      );
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === tempId ? { ...msg, status: "failed" } : msg
        )
      );
    }
  }, [
    newMessage,
    selectedChat,
    me?.data?.id,
    sendMessageMutation,
    queryClient,
  ]);

  const scheduleRetry = useCallback(() => {
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
    }

    retryTimeoutRef.current = setTimeout(() => {
      if (retryQueue.length > 0 && socketStatus.connected) {
        const messageToRetry = retryQueue[0];

        sendMessageMutation(
          {
            receiver_id: Number.parseInt(messageToRetry.receiver_id),
            message: messageToRetry.message,
          },
          {
            onSuccess: () => {
              setRetryQueue((prev) => prev.slice(1));
              toast.success("Message sent successfully");
            },
            onError: () => {
              // Move failed message to end of queue
              setRetryQueue((prev) => [...prev.slice(1), prev[0]]);
              scheduleRetry();
            },
          }
        );
      }
    }, MESSAGE_RETRY_DELAY);
  }, [retryQueue, socketStatus.connected, sendMessageMutation]);

  useEffect(() => {
    if (!chatLoading && chatData?.data && Array.isArray(chatData.data)) {
      const normalized = chatData.data.map((msg: any) => ({
        id: msg.id || `${msg.sender_id}-${msg.created_at}`,
        sender_id: msg.sender_id.toString(),
        receiver_id: msg.receiver_id.toString(),
        message: msg.message,
        timestamp: msg.created_at,
        status: "delivered" as const,
      }));

      setMessages(normalized);
    }
  }, [chatData, chatLoading]);

  // useEffect(() => {
  //   scrollToBottom();
  // }, [messages, scrollToBottom]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedChat(null);
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, []);

  const filteredChatList = useMemo(() => {
    if (!list?.data) return [];

    return list.data.filter(
      (chat: any) =>
        chat.full_name?.toLowerCase().includes(search.toLowerCase()) ||
        chat.last_message?.toLowerCase().includes(search.toLowerCase())
    );
  }, [list?.data, search]);

  if (!cookies.ghost) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Alert className="max-w-md">
          <AlertDescription className="text-center">
            Please log in to access the chat feature.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (profileError) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Alert variant="destructive" className="max-w-md">
          <AlertDescription className="text-center">
            Failed to load your profile. Please refresh the page.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <main className="lg:h-[80dvh] my-6 px-2 lg:px-8">
      <div className="w-full h-full grid lg:grid-cols-7 gap-6">
        {/* Chat List */}
        <div className="h-full lg:col-span-2 border rounded-lg bg-accent-foreground/5 overflow-hidden flex flex-col">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-2xl font-semibold">Chats</h3>
              <Badge
                variant={socketStatus.connected ? "default" : "destructive"}
                className="text-xs"
              >
                {socketStatus.connected ? (
                  <>
                    <Wifi className="w-3 h-3 mr-1" /> Online
                  </>
                ) : socketStatus.reconnecting ? (
                  "Connecting..."
                ) : (
                  <>
                    <WifiOff className="w-3 h-3 mr-1" /> Offline
                  </>
                )}
              </Badge>
            </div>
            <Input
              placeholder="Search conversations..."
              className="bg-background rounded-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex-1 overflow-y-auto">
            {listPending ? (
              <div className="space-y-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-4 px-4 py-3">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : listError ? (
              <div className="p-4">
                <Alert variant="destructive">
                  <AlertDescription>
                    Failed to load conversations. Please try again.
                  </AlertDescription>
                </Alert>
              </div>
            ) : filteredChatList.length === 0 ? (
              <div className="flex items-center justify-center h-32 text-muted-foreground">
                {search ? "No conversations found" : "No conversations yet"}
              </div>
            ) : (
              filteredChatList.map((x: any) => (
                <div
                  key={x.id}
                  className={`flex items-center gap-4 px-4 py-3 border-b hover:bg-foreground/10 cursor-pointer transition-colors ${
                    selectedChat === x.id?.toString() ? "bg-foreground/5" : ""
                  }`}
                  onClick={() => {
                    setSelectedChat(x?.id?.toString());
                    setMessages([]);
                  }}
                >
                  <div className="relative">
                    <Avatar className="!size-12">
                      <AvatarImage
                        src={
                          serverImageBuilder(x?.avatar) || "/placeholder.svg"
                        }
                      />
                      <AvatarFallback>
                        {x?.full_name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`absolute -bottom-1 -right-1 size-4 rounded-full border-2 border-background ${
                        x?.status === "Active" ? "bg-green-500" : "bg-gray-400"
                      }`}
                    />
                  </div>
                  <div className="flex flex-col w-full min-w-0">
                    <div className="flex justify-between items-center">
                      <h4 className="text-base font-bold truncate">
                        {x?.full_name}
                      </h4>
                      {x.last_message && (
                        <span className="text-xs text-muted-foreground">
                          {new Date(
                            x.updated_at || Date.now()
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {x.last_message || "No messages yet"}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Chat Window */}
        <div className="h-dvh lg:h-full lg:col-span-5 border rounded-lg flex flex-col bg-accent-foreground/5">
          {selectedChat ? (
            <>
              {/* Header */}
              <div className="flex items-center gap-3 px-4 py-3 border-b bg-background/50">
                {userPending ? (
                  <div className="flex items-center gap-3 flex-1">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </div>
                ) : userError ? (
                  <div className="flex-1">
                    <Alert variant="destructive">
                      <AlertDescription>
                        Failed to load user profile
                      </AlertDescription>
                    </Alert>
                  </div>
                ) : (
                  <>
                    <Avatar className="!size-12">
                      <AvatarImage
                        src={
                          serverImageBuilder(user?.data?.avatar) ||
                          "/placeholder.svg"
                        }
                      />
                      <AvatarFallback>
                        {user?.data?.full_name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col flex-1">
                      <h4 className="text-base font-bold">
                        {user?.data?.full_name}
                      </h4>
                      <div className="flex items-center gap-2 text-sm">
                        <div
                          className={`size-3 rounded-full ${
                            user?.data?.status === "Active"
                              ? "bg-green-500"
                              : "bg-gray-400"
                          }`}
                        />
                        <span className="text-muted-foreground">
                          {user?.data?.status === "Active"
                            ? "Online"
                            : "Offline"}
                        </span>
                      </div>
                    </div>
                  </>
                )}

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="ghost">
                      <EllipsisVerticalIcon className="size-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="bottom" align="end">
                    <DropdownMenuItem
                      variant="destructive"
                      onClick={async () => {
                        try {
                          const call: AnyType = await howl({
                            link: `/delete-conversation?receiver_id=${selectedChat}`,
                            token: cookies.ghost,
                            method: "delete",
                          });

                          if (!call?.status) {
                            toast.error(
                              call?.message ?? "Failed to delete messages"
                            );
                          } else {
                            toast.success("Conversation deleted successfully");

                            // Refresh UI
                            queryClient.invalidateQueries({
                              queryKey: ["chatList"],
                            });
                            setSelectedChat(null);
                            setMessages([]);
                          }
                        } catch (error) {
                          console.error(error);
                          toast.error("Something went wrong");
                        }
                      }}
                    >
                      <Trash2Icon className="w-4 h-4 mr-2" />
                      Delete Conversation
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Messages */}
              <div className="h-[65dvh] overflow-y-auto p-4 space-y-2  ">
                {chatLoading ? (
                  <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div
                        key={i}
                        className={`flex ${
                          i % 2 === 0 ? "justify-end" : "justify-start"
                        }`}
                      >
                        <Skeleton
                          className={`h-12 rounded-xl ${
                            i % 2 === 0 ? "w-48" : "w-36"
                          }`}
                        />
                      </div>
                    ))}
                  </div>
                ) : chatError ? (
                  <Alert variant="destructive">
                    <AlertDescription>
                      Failed to load messages. Please try again.
                    </AlertDescription>
                  </Alert>
                ) : messages.length === 0 ? (
                  <div className="flex items-center justify-center h-32 text-muted-foreground">
                    No messages yet. Start the conversation!
                  </div>
                ) : (
                  messages.map((msg, idx) => {
                    const isMe = msg.sender_id === me?.data?.id.toString();
                    const showStatus = isMe && idx === messages.length - 1;

                    return (
                      <div
                        key={msg.id || idx}
                        className={`flex ${
                          isMe ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[70%] p-3 rounded-xl relative ${
                            isMe
                              ? "bg-blue-500 text-white"
                              : "bg-gray-200 text-gray-900"
                          } ${msg.status === "failed" ? "opacity-50" : ""}`}
                        >
                          <div className="break-words">{msg.message}</div>
                          <div
                            className={`text-xs mt-1 ${
                              isMe ? "text-blue-100" : "text-gray-500"
                            }`}
                          >
                            {new Date(msg.timestamp).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                            {showStatus && (
                              <span className="ml-2">
                                {msg.status === "sending" && "⏳"}
                                {msg.status === "sent" && "✓"}
                                {msg.status === "delivered" && "✓✓"}
                                {msg.status === "failed" && "❌"}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="flex gap-2 px-4 py-3 border-t bg-background/50">
                <Input
                  ref={inputRef}
                  className="bg-background flex-1"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  disabled={!socketStatus.connected}
                  maxLength={1000}
                />
                <Button
                  onClick={handleSend}
                  disabled={
                    !newMessage.trim() ||
                    sendingMessage ||
                    !socketStatus.connected
                  }
                  size="icon"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>

              {/* Connection Status */}
              {!socketStatus.connected && (
                <div className="px-4 py-2 bg-yellow-50 border-t border-yellow-200">
                  <p className="text-sm text-yellow-800 text-center">
                    {socketStatus.reconnecting
                      ? "Reconnecting..."
                      : "Disconnected from chat server"}
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="text-6xl">💬</div>
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Select a conversation
                </h3>
                <p className="text-sm text-muted-foreground">
                  Choose a conversation from the sidebar to start chatting
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

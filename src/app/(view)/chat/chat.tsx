/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
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
import { EllipsisVerticalIcon, Trash2Icon } from "lucide-react";

import {
  getMessage,
  getProfileApi,
  getUserProfileApi,
  sendMessage,
} from "@/lib/api/auth/auth";
import { getChatListApi } from "@/lib/api/core/core";
import { serverImageBuilder } from "@/lib/formatter";
import { AnyType } from "@/lib/config/error-type";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import howl from "@/lib/howl";

interface Message {
  sender_id: string;
  receiver_id: string;
  message: string;
  timestamp: string;
}

const SOCKET_URL = "http://10.10.10.65:3000";

export default function ChatPage() {
  const [cookies] = useCookies(["ghost"]);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  const id = useSearchParams().get("id");

  useEffect(() => {
    if (id) setSelectedChat(id);
  }, [id]);

  // Fetch my profile
  const { data: me }: AnyType = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfileApi(cookies.ghost),
    enabled: !!cookies.ghost,
  });

  // Selected user profile
  const { data: user, isPending: userPending }: AnyType = useQuery({
    queryKey: ["user", selectedChat],
    queryFn: () => getUserProfileApi(selectedChat ?? "", cookies.ghost),
    enabled: !!selectedChat && !!cookies.ghost,
  });

  // Chat list
  const { data: list, isPending: listPending }: AnyType = useQuery({
    queryKey: ["chatList", search],
    queryFn: () => getChatListApi(cookies.ghost, search),
    enabled: !!cookies.ghost,
  });

  const { mutate } = useMutation({
    mutationKey: ["chat"],
    mutationFn: (data: { receiver_id: string | number; message: string }) =>
      sendMessage(data, cookies.ghost),
  });

  const { data, isLoading }: AnyType = useQuery({
    queryKey: ["chat"],
    queryFn: () => getMessage(selectedChat ?? "", cookies.ghost),
    enabled: !!selectedChat,
  });

  // connect socket once per user
  useEffect(() => {
    if (!me?.data?.id || socketRef.current) return;

    const socket = io(`${SOCKET_URL}`, {
      query: { userId: me.data.id },
      reconnectionAttempts: 10,
      reconnectionDelay: 500,
    });

    socketRef.current = socket;

    // receive messages
    socket.on("privateMessage", (msg: any) => {
      const normalized: Message = {
        sender_id:
          msg.sender_id?.toString?.() ?? msg.senderId?.toString?.() ?? "",
        receiver_id:
          msg.receiver_id?.toString?.() ?? msg.receiverId?.toString?.() ?? "",
        message: msg.message ?? "",
        timestamp: msg.timestamp || new Date().toISOString(),
      };

      const myId = me.data.id.toString();
      const involvesMe =
        normalized.sender_id === myId || normalized.receiver_id === myId;
      const matchesSelected =
        !selectedChat ||
        normalized.sender_id === selectedChat ||
        normalized.receiver_id === selectedChat;

      if (involvesMe && matchesSelected)
        setMessages((prev) => [...prev, normalized]);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [me?.data?.id, selectedChat]);

  const handleSend = () => {
    if (
      !newMessage.trim() ||
      !selectedChat ||
      !socketRef.current ||
      !me?.data?.id
    )
      return;

    const msg = { receiverId: parseInt(selectedChat), message: newMessage };
    socketRef.current.emit("privateMessage", msg);
    const payload = { receiver_id: msg.receiverId, message: msg.message };
    mutate(payload, { onError: console.error });
    setNewMessage("");
  };

  useEffect(() => {
    if (!isLoading && data?.data && Array.isArray(data.data)) {
      const normalized = data.data.map((msg: any) => ({
        sender_id: msg.sender_id.toString(),
        receiver_id: msg.receiver_id.toString(),
        message: msg.message,
        timestamp: msg.created_at,
      }));
      setMessages(normalized);
    }
  }, [data, isLoading]);

  if (!cookies.ghost) {
    return (
      <div className="flex justify-center items-center py-12 font-semibold text-muted-foreground">
        Please log in first
      </div>
    );
  }

  return (
    <main className="lg:h-[80dvh] my-6 px-2 lg:px-8">
      <div className="w-full h-full grid lg:grid-cols-7 gap-6">
        {/* Chat List */}
        <div className="h-full lg:col-span-2 border rounded-lg bg-accent-foreground/5 overflow-y-auto">
          <div className="p-4">
            <h3 className="text-2xl mb-3 font-semibold">Chats</h3>
            <Input
              placeholder="Search"
              className="bg-background rounded-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {!listPending &&
            list?.data?.map((x: AnyType) => (
              <div
                key={x.id}
                className="flex items-center gap-4 px-4 py-3 border-b hover:bg-foreground/10 cursor-pointer"
                onClick={() => {
                  setSelectedChat(x.id.toString());
                  setMessages([]);
                }}
              >
                <Avatar className="!size-12">
                  <AvatarImage src={serverImageBuilder(x.avatar)} />
                  <AvatarFallback>UI</AvatarFallback>
                </Avatar>
                <div className="flex flex-col w-full">
                  <div className="flex justify-between">
                    <h4 className="text-base font-bold">{x.full_name}</h4>
                  </div>
                  <p className="text-sm text-primary font-bold truncate">
                    {x.last_message ?? "Sent a message"}
                  </p>
                </div>
              </div>
            ))}
        </div>

        {/* Chat Window */}
        <div className="h-dvh lg:h-full lg:col-span-5 border rounded-lg flex flex-col justify-between bg-accent-foreground/5">
          {selectedChat && !userPending ? (
            <>
              {/* Header */}
              <div className="flex items-center gap-3 px-4 py-3 border-b">
                <Avatar className="!size-12">
                  <AvatarImage src={serverImageBuilder(user.data.avatar)} />
                  <AvatarFallback>UI</AvatarFallback>
                </Avatar>
                <div className="flex flex-col flex-1">
                  <h4 className="text-base font-bold">{user.data.full_name}</h4>
                  <div className="flex items-center gap-2 text-sm font-bold">
                    <div
                      className={`size-3 rounded-full ${
                        user.data.status === "Active"
                          ? "bg-green-500"
                          : "bg-red-800"
                      }`}
                    />
                    {user.data.status === "Active" ? "online" : "offline"}
                  </div>
                </div>

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
                          if (!call.status) {
                            toast.error(
                              call.message ?? "Failed to delete messages"
                            );
                          } else {
                            toast.success(
                              call.message ?? "Messages deleted successfully"
                            );

                            // Refresh chat UI
                            queryClient.invalidateQueries({
                              queryKey: ["chatList"],
                            });
                            queryClient.invalidateQueries({
                              queryKey: ["chat", selectedChat],
                            });
                            queryClient.invalidateQueries({
                              queryKey: ["user", selectedChat],
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
                      <Trash2Icon /> Delete Conversation
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
                {messages.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center mt-4">
                    No messages yet
                  </p>
                )}
                {messages.map((msg, idx) => {
                  const isMe = msg.sender_id === me?.data?.id.toString();
                  return (
                    <div
                      key={idx}
                      className={`max-w-[70%] p-3 rounded-xl ${
                        isMe
                          ? "bg-blue-500 text-white self-end"
                          : "bg-gray-200 self-start"
                      }`}
                    >
                      {msg.message}
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="flex gap-2 px-4 py-3 border-t">
                <Input
                  className="bg-background flex-1"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <Button onClick={handleSend}>Send</Button>
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center h-full text-sm font-bold text-muted-foreground">
              Please select a chat first
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

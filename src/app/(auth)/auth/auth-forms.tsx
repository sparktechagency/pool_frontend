"use client";
import type React from "react";
import { useState } from "react";
import SignIn from "./sign-in";
import SignUp from "./sign-up";
import { useSearchParams } from "next/navigation";
export default function AuthForms() {
  const as = useSearchParams().get("as");
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center !p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex border-b">
          <button
            type="button"
            onClick={() => setActiveTab("signin")}
            className={`flex-1 py-4! !px-6 text-center font-medium transition-colors ${
              activeTab === "signin"
                ? "text-gray-900 border-b-2 border-accent-foreground bg-white"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setActiveTab("signup")}
            type="button"
            className={`flex-1 py-4! !px-6 text-center font-medium transition-colors ${
              activeTab === "signup"
                ? "text-gray-900 border-b-2 border-accent-foreground bg-white"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Sign Up
          </button>
        </div>
        <div className="!p-8">
          {activeTab === "signin" ? <SignIn /> : <SignUp as={as ?? "user"} />}
        </div>
      </div>
    </div>
  );
}

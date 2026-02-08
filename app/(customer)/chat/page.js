"use client";

import { useEffect, useState, useRef } from "react";
import Navbar from "@/components/Navbar";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);
  const chatEndRef = useRef(null);

  // Fetch chat messages
  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/chats", { cache: "no-store" });
      if (res.status === 401) {
        setError("Please sign in to use chat.");
        setMessages([]);
        return;
      }
      const data = await res.json();
      setMessages(data);
    } catch (e) {
      setError("Failed to load chat.");
    }
  };

  // Scroll chat box to bottom only on user message
  const scrollToBottom = () => {
    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // Load messages on mount only
  useEffect(() => {
    setMounted(true);
    fetchMessages();
  }, []);

  // Send message
  const send = async () => {
    if (!text.trim()) return;
    const res = await fetch("/api/chats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ receiver_id: 1, message: text }),
    });
    if (res.status === 401) {
      setError("Please sign in to send messages.");
      return;
    }
    setText("");
    fetchMessages();
  };

  return (
    <div>
      <Navbar/>
    <div className="min-h-screen px-6 md:px-16 py-10 bg-gradient-to-b from-[#0E1D13] via-[#1A2E1B] to-[#2E3E2A] text-gray-100 flex flex-col">
      <h1 className="text-4xl font-bold text-green-200 mb-8 text-center drop-shadow-lg">
        Chat With Expert
      </h1>

      {/* Chat Box */}
      <div className="flex-1 border border-[#3C5F40] rounded-3xl p-6 bg-[#13221F] shadow-2xl overflow-y-auto h-[60vh] flex flex-col gap-4">
        {error && <p className="text-red-500 mb-2">{error}</p>}

        {messages.map((m) => (
          <div
            key={m.id}
            className={`max-w-[75%] px-4 py-3 rounded-2xl shadow-md ${
              m.is_self
                ? "bg-gradient-to-br from-[#356836] to-[#1F3C28] text-green-100 ml-auto rounded-tr-none"
                : "bg-[#1E3A28] text-green-200 rounded-tl-none"
            }`}
          >
            <div className="text-xs opacity-70 mb-1">
              {mounted ? new Date(m.created_at).toLocaleString() : ""}
            </div>
            <div className="text-sm">{m.message}</div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input Box */}
      <div className="mt-6 flex gap-3">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-4 py-3 rounded-2xl border border-[#3C5F40] bg-[#1B2F20] text-green-100 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-inner placeholder-green-400"
        />
        <button
          onClick={send}
          className="bg-gradient-to-br from-[#356836] to-[#1F3C28] text-green-100 px-6 py-3 rounded-2xl font-semibold shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300"
        >
          Send
        </button>
      </div>
    </div>
    </div>
  );
}

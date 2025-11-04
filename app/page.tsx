'use client'

import { useSession } from "@/lib/useSession";
import { FormEvent, useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([
    { id: 1, reply: "Hey there!", sender: "bot" },
    { id: 2, reply: "Hi! How are you?", sender: "user" },
  ]);
  const sessionId = useSession()
  const [input, setInput] = useState("");

  const sendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const newMessage = { id: Date.now(), reply: input, sender: "user" };
    setMessages([...messages, newMessage]);
    setInput("");
    
    // Submit the message
    console.log(sessionId);

  };

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-gray-100 max-w-[1200px] m-auto">
      {/* Header */}
      <header className="p-4 bg-gray-800 text-center text-xl font-semibold border-b border-gray-700">
        Simple Chat
      </header>

      {/* Chat Messages */}
      <main className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-200"
              }`}
            >
              {msg.reply}
            </div>
          </div>
        ))}
      </main>

      {/* Input Box */}
      <form
        onSubmit={sendMessage}
        className="p-4 bg-gray-800 border-t border-gray-700 flex"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 rounded-md bg-gray-700 text-gray-100 outline-none"
        />
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-500 cursor-pointer"
        >
          Send
        </button>
      </form>
    </div>
  );
}

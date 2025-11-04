'use client'

import RichContentResponse from "@/components/RichContentResponse";
import { useSession } from "@/lib/useSession";
import { FormEvent, useRef, useState } from "react";

const sendMsg = async(message: string, sessionId: string) => {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      sessionId
    }),
  });

  if (!response.ok) {
    throw new Error(`Server error: ${response.status}`);
  }

  const data = await response.json();
  return data as Message;
}

export default function Home() {
  const [messages, setMessages] = useState<({id: number, message: Message, sender: 'bot'} | {id: number, message: string, sender: 'user'})[]>([]);


  const sessionId = useSession()
  const mainRef = useRef<HTMLElement>(null)
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false)

  const scrollButtom = () => setTimeout(() => mainRef.current?.scroll({ behavior: 'smooth', top: mainRef.current.scrollHeight }), 100)

  const sendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setMessages([...messages, {sender: 'user', message: input, id: Date.now()}]);
    setInput("");

    scrollButtom();
    
    // Submit the message
    (async() => {
      setLoading(true)
      const data = await sendMsg(input, sessionId!)

      setMessages([
        ...messages,
        {sender: 'user', message: input, id: Math.random()},
        {message: data, id: Date.now(), sender: 'bot'}]
      );
      setLoading(false);
      scrollButtom();
    })()

  };

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-gray-100 max-w-[1200px] m-auto">
      {/* Header */}
      <header className="p-4 bg-gray-800 text-center text-xl font-semibold border-b border-gray-700">
        Medical Chat
      </header>

      {/* Chat Messages */}
      <main className="flex-1 overflow-y-auto p-4 space-y-3" ref={mainRef}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start w-[80%]"
            }`}
          >
            { msg.sender == 'user' ?
              <div
                className='max-w-xs px-4 py-2 rounded-lg bg-blue-600 text-white'
              >
                {msg.message}
              </div>
              : <div className="gap-3 flex-col flex w-full"><RichContentResponse content={msg.message.result} /></div>
            }
          </div>
        ))}
        {loading && (
          <div
            className='flex justify-start'
          >
            <div
              className='max-w-xs px-4 py-2 rounded-lg bg-gray-700 text-gray-200'
            >
              Loading ...
            </div>
          </div>
        )}
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
          disabled={loading}
          className="ml-2 px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-500 cursor-pointer"
        >
          Send
        </button>
      </form>
    </div>
  );
}

'use client'

import RichContentResponse from "@/components/RichContentResponse";
import { sendMsg } from "@/lib/api";
import { useSession } from "@/lib/useSession";
import { useMessage } from "@/store/useMessgae";
import { FormEvent, useEffect, useRef, useState } from "react";

export default function Home() {
  // const [messages, setMessages] = useState<({id: number, message: Message, sender: 'bot'} | {id: number, message: string, sender: 'user'})[]>([]);
  const {
    input, setInput,
    loading, setLoading,
    messages, setMessages, sendMessage,
    setObjectRef: setObjectRef, sessionId, loadSession
  } = useMessage()


  // const sessionId = useSession()
  const mainRef = useRef<HTMLDivElement>(null)
  // const [input, setInput] = useState("");
  // const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadSession();
    (async() => {
      setLoading(true)
      setObjectRef(mainRef)

      const data = await sendMsg('Hi', sessionId!)

      setMessages([
        ...messages,
        {message: data, id: Date.now(), sender: 'bot'}]
      );
      setLoading(false);
    })()
  }, [])

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="p-4 bg-[#36415350] text-center text-xl font-semibold border-b border-gray-700 backdrop-blur-md">
        Medical Chat
      </header>

      {/* Chat Messages */}
      { messages.length == 1 ?
          <div className="max-w-[1200px] w-full mx-auto overflow-y-auto p-4 space-y-3 mb-20 h-[40vh] flex items-center">
            {/* @ts-ignore */}
            <div className="gap-3 flex-col flex w-full items-center text-lg"><RichContentResponse content={messages[0].message.result} /></div>
          </div>
        :
        <div className="max-w-[1200px] w-full h-full mx-auto overflow-y-auto p-4 space-y-3 mb-20" ref={mainRef}>
          <main className="flex-1">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start w-[80%]"
                }`}
              >
                { msg.sender == 'user' ?
                  <div
                    className='max-w-xs px-4 py-2 rounded-lg bg-blue-600 text-white rise'
                  >
                    {msg.message}
                  </div>
                  : <div className="gap-3 flex-col flex w-full"><RichContentResponse content={msg.message.result} /></div>
                }
              </div>
            ))}
            {loading && (
              messages.length == 0 ?
              <div className="max-w-[1200px] w-full mx-auto overflow-y-auto p-4 space-y-3 mb-20 h-[40vh] flex items-center" ref={mainRef}>
                {/* @ts-ignore */}
                <div className="gap-3 flex-col flex w-full items-center text-lg">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="dot bg-blue-500 w-3 h-3 rounded-full"></div>
                    <div className="dot bg-blue-500 w-3 h-3 rounded-full animation-delay-200"></div>
                    <div className="dot bg-blue-500 w-3 h-3 rounded-full animation-delay-400"></div>
                  </div>
                </div>
              </div>
              :
              <div
                className='flex justify-start rise'
              >
                <div
                  className='max-w-xs px-4 py-2'
                >
                  <div className="flex items-center justify-center space-x-2">
                    <div className="dot bg-blue-500 w-3 h-3 rounded-full"></div>
                    <div className="dot bg-blue-500 w-3 h-3 rounded-full animation-delay-200"></div>
                    <div className="dot bg-blue-500 w-3 h-3 rounded-full animation-delay-400"></div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      }

      {/* Input Box */}
      <div className={`max-w-[1200px] transition w-full fixed left-[50%] translate-x-[-50%] ${
        messages.length <= 1 ? 'top-[50%] translate-y-[-50%]' : 'bottom-0'
      }`}>
        <form
          onSubmit={sendMessage}
          className={`p-4 flex ${
            messages.length <= 1 ? '' : 'border-t border-gray-700'
          }`}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 rounded-md bg-gray-700 text-gray-100 outline-none"
            autoFocus
          />
          <button
            type="submit"
            disabled={loading}
            className="ml-2 px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-500 cursor-pointer"
          >
            Send
          </button>
        </form>

        {messages.length == 1 && (
          <div className="flex gap-2">
            <div className="flex items-center ml-10">Try this</div>
            <button
              className="block px-4 py-1 cursor-pointer transition m-1 bg-neutral-600 hover:bg-neutral-700 rounded-full"
              onClick={e => {
                // @ts-ignore
                sendMessage(e, 'Looking for apex')
              }}
              >Looking for apex</button>
            <button
              className="block px-4 py-1 cursor-pointer transition m-1 bg-neutral-600 hover:bg-neutral-700 rounded-full"
              onClick={e => {
                // @ts-ignore
                sendMessage(e, 'What is apex')
              }}
              >What is apex</button>
          </div>
        )}
      </div>
    </div>
  );
}

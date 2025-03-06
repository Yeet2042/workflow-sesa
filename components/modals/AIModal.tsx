"use client";

import {
  PaperAirplaneIcon,
  TrashIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { useState, useEffect, useRef } from "react";

export default function AIModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    const newMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_LLM_API}/api/chat`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "llama3.2:3b",
            messages: [
              {
                role: "system",
                content:
                  "You are the AI ​​assistant of Workflow website that will answer questions efficiently and in Thai and you are a man.",
              },
              { role: "user", content: input },
            ],
            stream: true,
          }),
        }
      );

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let aiMessage = "";
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const jsonStrings = buffer
          .split("\n")
          .filter((line) => line.trim() !== "");
        buffer = "";

        for (const jsonString of jsonStrings) {
          try {
            const json = JSON.parse(jsonString);

            if (json.message?.content) {
              aiMessage += json.message.content;
            }

            if (json.done) {
              setMessages((prev) => [
                ...prev,
                { sender: "ai", text: aiMessage },
              ]);
              setLoading(false);
              return;
            }
          } catch (error) {
            void error;
            console.warn("Skipping invalid JSON:", jsonString);
          }
        }
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  return (
    <div className="fixed z-10 bottom-12 right-12 flex justify-end items-end">
      <button
        className="flex gap-2 bg-primary-950 text-neutral-100 px-4 py-3 rounded-lg shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <PaperAirplaneIcon className="w-5 h-5" />
        <span>Ask AI</span>
      </button>

      {isOpen && (
        <div className="absolute bottom-16 w-[350px]">
          <div className="flex justify-between items-center bg-primary-950 text-neutral-100 p-3 rounded-t-lg shadow-lg">
            <div className="flex items-center gap-2">
              <PaperAirplaneIcon className="w-5 h-5" />
              <span>Ask AI</span>
            </div>
            <div className="flex gap-2">
              <TrashIcon
                className="w-5 h-5 cursor-pointer"
                onClick={() => setMessages([])}
              />
              <XMarkIcon
                className="w-5 h-5 cursor-pointer"
                onClick={() => setIsOpen(false)}
              />
            </div>
          </div>

          <div className="bg-[#262930] h-[400px] p-3 shadow-lg overflow-y-auto flex flex-col gap-3 custom-scrollbar">
            {messages.map((message, index) => (
              <div key={index} className="flex flex-col gap-4">
                <div className={`flex gap-2 px-3 py-3 rounded-lg ${message.sender === "ai" && "bg-primary-900"}`}>
                  {message.sender === "ai" ? (
                    <PaperAirplaneIcon className="w-6 h-6 flex-shrink-0" />
                  ) : (
                    <UserIcon className="w-6 h-6 flex-shrink-0" />
                  )}
                  <span>{message.text}</span>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-2 px-3 py-3 rounded-lg bg-primary-900">
                <PaperAirplaneIcon className="w-6 h-6 flex-shrink-0" />
                <span className="animate-pulse">กำลังพิมพ์...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="bg-[#262930] p-3 flex gap-2">
            <input
              className="flex-1 bg-neutral-800 text-white p-2 rounded-lg outline-none"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button
              className="bg-primary-950 text-white p-2 rounded-lg"
              onClick={handleSendMessage}
            >
              <PaperAirplaneIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
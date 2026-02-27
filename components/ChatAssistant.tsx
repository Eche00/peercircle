"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Close, AutoAwesome } from "@mui/icons-material";
import { chatWithAssistant } from "@/lib/actions/chat-assistant";

interface Message {
  role: "user" | "model";
  text: string;
}

const SUGGESTED_QUESTIONS = [
  "What is PeerCircle?",
  "How do I earn points?",
  "Can I create my own circle?",
  "How do I join a circle?",
];

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      text: "Hi! I'm your PeerCircle AI guide.  I can help you find circles, understand how points work, and guide you through the community features. What can I help you with today?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [dynamicSuggestions, setDynamicSuggestions] =
    useState<string[]>(SUGGESTED_QUESTIONS);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (messageToOpen?: string) => {
    const userMessage = (messageToOpen || input).trim();
    if (!userMessage || isLoading) return;

    if (!messageToOpen) setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setIsLoading(true);
    setDynamicSuggestions([]); // Clear suggestions while loading

    try {
      const historyForApi = messages.slice(1).map((m) => ({
        role: m.role as "user" | "model",
        parts: [{ text: m.text }],
      }));

      const result = await chatWithAssistant(userMessage, historyForApi);

      if (result.success) {
        setMessages((prev) => [
          ...prev,
          { role: "model", text: result.message },
        ]);
        setDynamicSuggestions(result.suggestions || []);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "model",
            text: "Sorry, I'm having trouble connecting to my AI brain right now.",
          },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "model", text: "Something went wrong. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
              y: 20,
              transformOrigin: "bottom right",
            }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="bg-[#191A1E] border border-[#8F4AE3]/30 w-[350px] sm:w-[400px] h-[550px] rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-4"
          >
            {/* Header */}
            <div className="bg-[#8F4AE3] p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <AutoAwesome fontSize="small" />
                <span className="font-semibold soraFont tracking-wide text-sm uppercase">
                  PeerCircle AI assistant
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 rounded-full p-1 transition-colors"
              >
                <Close fontSize="small" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-[#16181B]">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-[14px] leading-relaxed ${
                      m.role === "user"
                        ? "bg-[#8F4AE3] text-white rounded-tr-none"
                        : "bg-[#212329] text-gray-200 border border-gray-800 rounded-tl-none shadow-sm"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#212329] text-gray-400 p-3 rounded-2xl rounded-tl-none border border-gray-800 flex items-center gap-1">
                    <motion.span
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                    >
                      •
                    </motion.span>
                    <motion.span
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                    >
                      •
                    </motion.span>
                    <motion.span
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                    >
                      •
                    </motion.span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />

              {/* Suggestion Questions under the latest model answer */}
              {!isLoading &&
                dynamicSuggestions.length > 0 &&
                messages[messages.length - 1].role === "model" && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {dynamicSuggestions.map((q) => (
                      <button
                        key={q}
                        onClick={() => handleSend(q)}
                        className="text-[11px] sm:text-[12px] bg-[#212329] text-[#8F4AE3] px-3 py-1.5 rounded-full border border-[#8F4AE3]/30 hover:bg-[#8F4AE3] hover:text-white transition-all text-left shadow-sm"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-[#212329] border-t border-gray-800">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2 bg-[#16181B] rounded-xl px-3 py-2 border border-gray-800 focus-within:border-[#8F4AE3]/50 transition-colors"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything about PeerCircle..."
                  className="flex-1 bg-transparent border-none outline-none text-white text-[14px] placeholder:text-gray-500"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="text-[#8F4AE3] disabled:text-gray-600 hover:scale-110 active:scale-95 transition-all"
                >
                  <Send fontSize="small" />
                </button>
              </form>
              <p className="text-[10px] text-center text-gray-500 mt-2">
                All You Need to know About Peercircle
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Bubble with Badge */}
      <div className="flex items-center gap-3">
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              className="bg-[#8F4AE3] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-xl soraFont border border-white/20 hidden sm:flex items-center gap-2"
            >
              <AutoAwesome sx={{ fontSize: 16 }} />
              Ask PeerCircle AI
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-16 h-16 bg-[#8F4AE3] rounded-full flex items-center justify-center text-white shadow-[0_8px_30px_rgb(143,74,227,0.4)] hover:shadow-[0_8px_30px_rgb(143,74,227,0.6)] transition-all relative border border-white/10"
        >
          {isOpen ? <Close /> : <AutoAwesome fontSize="large" />}

          {!isOpen && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-white"></span>
            </span>
          )}
        </motion.button>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #8f4ae340;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #8f4ae380;
        }
      `}</style>
    </div>
  );
}

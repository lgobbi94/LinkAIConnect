import { useQuery } from "@tanstack/react-query";
import React, { useState, useRef, useEffect, ChangeEvent, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LinkButton from "@/components/linktree/LinkButton";
import type { Link, ChatConfig } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { ProfilePicture } from "@/components/ProfilePicture";

export default function Home() {
  // Chat functionality state
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([]);
  const [input, setInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const { toast } = useToast();

  // API config query
  const { data: config } = useQuery<ChatConfig>({
    queryKey: ["/api/chat/config"],
  });

  const { data: links, isLoading } = useQuery<Link[]>({
    queryKey: ["/api/links"],
  });

  // Star Wars and AI-related words for random generation
  const starWarsAiWords = [
    "THE FORCE",
    "JEDI INTELLIGENCE",
    "DROID LEARNING",
    "GALACTIC NETWORKS",
    "REBEL ALGORITHMS",
    "HYPERSPACE DATA",
    "IMPERIAL ROBOTICS",
    "LIGHT SPEED AUTOMATION",
    "WOOKIEE LANGUAGE",
    "HOLOGRAM VISION",
    "PROTOCOL DROIDS",
    "TATOOINE INNOVATION",
    "KYBER TECHNOLOGY",
    "ARTIFICIAL REBELS",
    "MANDALORIAN INTELLIGENCE",
    "STAR DESTROYER FUTURE",
    "CLONE COGNITION",
    "SITH LEARNING",
    "JEDI PREDICTION",
    "CANTINA ANALYTICS",
  ];

  // Random word generation state
  const [currentWord, setCurrentWord] = useState<string>(starWarsAiWords[0]);

  // Effect for changing words every 4 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * starWarsAiWords.length);
      setCurrentWord(starWarsAiWords[randomIndex]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen overflow-auto">
      <div className="max-w-7xl mx-auto pt-20 px-4">
        <>
          <ProfilePicture />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8"
          >
            <h1 className="text-4xl font-bold font-poppins bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400">
              Lorenzo Gobbi
            </h1>
            <p className="text-slate-400 mt-3 text-lg font-space tracking-wider">
              CONNECTING THROUGH SPACE
            </p>
          </motion.div>



          {/* Chat Section */}
          <div className="mb-12">
            <div className="w-full relative cosmic-scene" style={{ minHeight: "400px" }}>
              <div className="absolute inset-0 flex flex-col items-center justify-start p-4" style={{ zIndex: 20 }}>
                <div className="w-full h-[300px] bg-slate-900/50 backdrop-blur-sm rounded-lg p-4 overflow-y-auto mb-4">
                  {messages.map((message, i) => (
                    <div
                      key={i}
                      className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"} mb-2`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-xl ${
                          message.role === "assistant" 
                            ? "bg-slate-800/80 text-violet-300" 
                            : "bg-violet-600/80 text-white"
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="w-full flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                    onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    placeholder="Ask me anything..."
                    className="flex-1 bg-slate-800/80 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                  <button
                    onClick={handleSend}
                    disabled={chatLoading}
                    className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {chatLoading ? "Sending..." : "Send"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Links Section */}
          <div className="space-y-4">
              {isLoading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="border border-slate-700 shadow rounded-xl p-4 animate-pulse"
                    >
                      <div className="h-6 bg-slate-700 rounded w-2/3 mb-2"></div>
                      <div className="h-4 bg-slate-700 rounded w-1/3"></div>
                    </div>
                  ))
                : links.map((link) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * (links.indexOf(link) + 1) }}
                    key={link.url}
                  >
                    <LinkButton link={link} />
                  </motion.div>
                ))}
            </div>
        </>
      </div>
    </div>
  );



  async function handleSend() {
    if (!input.trim() || chatLoading) return;

    const userMessage = { role: "user" as const, content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setChatLoading(true);

    try {
      const res = await apiRequest("POST", "/api/chat/message", {
        message: input,
      });
      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message },
      ]);
    } catch (err) {
      let errorMessage = "Failed to send message. Please try again.";
      if (err instanceof Error) {
        if (err.message.includes("503")) {
          errorMessage =
            "AI chat is currently unavailable. Please check the API configuration.";
        }
      }
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setChatLoading(false);
    }
  }
}
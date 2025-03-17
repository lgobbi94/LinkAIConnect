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
      <div className="md:max-w-7xl mx-auto pt-20 px-4 md:flex md:flex-row md:gap-8">
        <div className="md:w-1/2">
        <ProfilePicture />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold font-poppins bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400">
            Lorenzo Gobbi
          </h1>
          <p className="text-slate-400 mt-3 text-lg font-space tracking-wider">
            CONNECTING THROUGH SPACE
          </p>
        </motion.div>

        {/* Enhanced Star Wars Style AI Animation Section */}
        <motion.div
          className="flex justify-center items-center mb-12 cosmic-background py-12 rounded-xl perspective-1000 overflow-hidden"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 3, ease: "easeInOut" }}
        >
          <div className="flex flex-col items-center justify-center w-full relative">
            <motion.p 
              className="text-slate-300 mb-4 text-sm font-space tracking-widest glow-text"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              GALACTIC AI CONCEPT GENERATOR
            </motion.p>
            
            {/* Stars background */}
            <div className="stars-container">
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={`star-${i}`}
                  className="star"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    width: `${Math.random() * 3 + 1}px`,
                    height: `${Math.random() * 3 + 1}px`,
                    animationDelay: `${Math.random() * 5}s`,
                  }}
                />
              ))}
              <div className="nebula-1"></div>
              <div className="nebula-2"></div>
            </div>
            
            <div className="h-96 w-full relative cosmic-scene" style={{ zIndex: 10 }}>
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

              {/* Floating particles */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute rounded-full bg-white/50"
                  style={{
                    width: `${Math.random() * 4 + 2}px`,
                    height: `${Math.random() * 4 + 2}px`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    boxShadow: '0 0 8px 2px rgba(255, 255, 255, 0.3)',
                    zIndex: 1,
                  }}
                  animate={{
                    y: [0, Math.random() * 40 - 20],
                    x: [0, Math.random() * 40 - 20],
                    z: [0, Math.random() * 200 - 100],
                    scale: [1, Math.random() * 0.5 + 0.5]
                  }}
                  transition={{
                    duration: Math.random() * 5 + 5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        </div>
        <div className="md:w-1/2 md:mt-0 mt-8">
          <div className="space-y-4">
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-14 bg-white/50 backdrop-blur-sm animate-pulse rounded-2xl"
                  />
                ))
              : links?.map((link) => <LinkButton key={link.id} link={link} />)}
          </div>
        </div>
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
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LinkButton from "@/components/linktree/LinkButton";
import ChatButton from "@/components/chat/ChatButton";
import type { Link } from "@shared/schema";
import { ProfilePicture } from "@/components/ProfilePicture";

export default function Home() {
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
      <div className="max-w-lg mx-auto pt-20 px-4">
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

        {/* Star Wars Style AI Animation Section */}
        <motion.div
          className="flex justify-center items-center mb-12 bg-gradient-to-r from-purple-900/30 to-blue-900/30 py-12 rounded-xl backdrop-blur-sm perspective-500 overflow-hidden"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 3, ease: "easeInOut" }}
        >
          <div className="flex flex-col items-center justify-center">
            <p className="text-slate-400 mb-2 text-sm">AI CONCEPT GENERATOR</p>
            <div className="h-32 w-full max-w-xs overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentWord}
                  initial={{ y: 100, rotateX: 30, opacity: 0 }}
                  animate={{ y: 0, rotateX: 30, opacity: 1 }}
                  exit={{ y: -100, rotateX: 30, opacity: 0 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  className="text-3xl font-bold font-space text-center text-yellow-400 transform-gpu"
                  style={{ 
                    transformStyle: "preserve-3d", 
                    transform: "perspective(500px) rotateX(30deg)"
                  }}
                >
                  {currentWord}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

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

      <ChatButton />
    </div>
  );
}

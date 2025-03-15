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
            
            <div className="h-60 w-full relative cosmic-scene max-w-md space-rotation">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentWord}
                  initial={{ z: -600, y: 150, scale: 0.2, opacity: 0, rotateX: 35 }}
                  animate={{ z: 0, y: 0, scale: 1, opacity: 1, rotateX: 15 }}
                  exit={{ z: 300, y: -150, scale: 0.2, opacity: 0, rotateX: -15 }}
                  transition={{ 
                    duration: 4, 
                    ease: [0.1, 0.3, 0.5, 1],
                    opacity: { duration: 3 }
                  }}
                  className="text-4xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold font-space text-center text-yellow-400 transform-3d cosmic-text"
                  style={{ 
                    transformStyle: "preserve-3d", 
                    willChange: "transform, opacity",
                    letterSpacing: "3px"
                  }}
                >
                  {currentWord}

                  {/* Reflection effect */}
                  <motion.div
                    className="absolute w-full text-center opacity-30 blur-[1px]"
                    style={{ 
                      top: '1.5em',
                      left: 0,
                      transform: 'rotateX(180deg) scale(1, -0.5)',
                      transformOrigin: 'top',
                      maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%)'
                    }}
                  >
                    {currentWord}
                  </motion.div>
                </motion.div>
              </AnimatePresence>

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
                    zIndex: Math.random() > 0.5 ? 1 : -1,
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
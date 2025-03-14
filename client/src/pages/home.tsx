import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import LinkButton from "@/components/linktree/LinkButton";
import ChatButton from "@/components/chat/ChatButton";
import type { Link } from "@shared/schema";
import { ProfilePicture } from "@/components/ProfilePicture";

export default function Home() {
  const { data: links, isLoading } = useQuery<Link[]>({
    queryKey: ["/api/links"],
  });

  const words = ["AI", "Machine Learning", "Innovation", "Technology"];

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

        {/* Enhanced AI Animation Section */}
        <motion.div
          className="flex justify-center items-center mb-12 overflow-hidden"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <motion.div
            className="flex justify-center w-full"
            initial={{ x: "100%" }}
            animate={{ x: "-100%" }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          >
            {words.map((word, index) => (
              <motion.div
                key={index}
                className="mx-8 text-white font-bold text-2xl"
                initial={{ scale: 0.8, rotate: 0 }}
                animate={{ scale: 1.2, rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                }}
              >
                {word}
              </motion.div>
            ))}
          </motion.div>
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

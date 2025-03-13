import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import LinkButton from "@/components/linktree/LinkButton";
import ChatButton from "@/components/chat/ChatButton";
import type { Link } from "@shared/schema";

export default function Home() {
  const { data: links, isLoading } = useQuery<Link[]>({
    queryKey: ["/api/links"],
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-50">
      <div className="max-w-lg mx-auto pt-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-primary to-accent mx-auto mb-6 shadow-lg ring-4 ring-background/95" />
          <h1 className="text-4xl font-bold text-[#2D2D2D] font-poppins bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Lorenzo Gobbi</h1>
          <p className="text-muted-foreground mt-3 text-lg">Connect with me on social media</p>
        </motion.div>

        <div className="space-y-4">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-14 bg-white/50 backdrop-blur-sm animate-pulse rounded-2xl"
              />
            ))
          ) : (
            links?.map((link) => (
              <LinkButton key={link.id} link={link} />
            ))
          )}
        </div>
      </div>

      <ChatButton />
    </div>
  );
}
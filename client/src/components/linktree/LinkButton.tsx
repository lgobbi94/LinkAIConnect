import { motion } from "framer-motion";
import type { Link } from "@shared/schema";

interface LinkButtonProps {
  link: Link;
}

export default function LinkButton({ link }: LinkButtonProps) {
  return (
    <motion.a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="block w-full p-4 bg-white/70 backdrop-blur-sm rounded-2xl 
                 shadow-lg hover:shadow-xl transition-all duration-300
                 border border-white/20 cursor-pointer text-center
                 font-medium text-[#2D2D2D]"
    >
      {link.title}
    </motion.a>
  );
}

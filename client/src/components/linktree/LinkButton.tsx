
import { motion } from "framer-motion";
import { getIconForSocialMedia } from "@/lib/icons";
import type { Link } from "@shared/schema";
import { Instagram, Linkedin, Twitter, Github, Youtube } from "lucide-react";

type Props = {
  link: Link;
};

export default function LinkButton({ link }: Props) {
  if (!link.enabled) return null;

  const getIcon = () => {
    const title = link.title.toLowerCase();
    
    if (title.includes("instagram")) return Instagram;
    if (title.includes("linkedin")) return Linkedin;
    if (title.includes("twitter") || title.includes("x")) return Twitter;
    if (title.includes("github")) return Github;
    if (title.includes("youtube")) return Youtube;
    
    // Default icon if no match
    return getIconForSocialMedia(link.title);
  };

  const Icon = getIcon();

  return (
    <motion.a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center p-4 bg-slate-900/60 backdrop-blur-md rounded-xl 
                 border border-violet-500/20 shadow-md hover:shadow-violet-500/20
                 transition-all duration-300 hover:border-violet-500 hover:bg-slate-800/80"
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-2 mr-4 rounded-lg bg-violet-600/20 text-violet-400">
        <Icon size={22} />
      </div>
      <span className="font-space tracking-wide text-slate-300">{link.title}</span>
    </motion.a>
  );
}

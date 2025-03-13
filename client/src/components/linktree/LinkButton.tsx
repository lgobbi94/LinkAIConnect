import { motion } from "framer-motion";
import type { Link } from "@shared/schema";
import {
  SiInstagram,
  SiX,
  SiLinkedin,
  SiGithub,
  SiYoutube
} from "react-icons/si";

interface LinkButtonProps {
  link: Link;
}

const SOCIAL_ICONS: { [key: string]: JSX.Element } = {
  Instagram: <SiInstagram className="w-5 h-5" />,
  "Twitter/X": <SiX className="w-5 h-5" />,
  LinkedIn: <SiLinkedin className="w-5 h-5" />,
  GitHub: <SiGithub className="w-5 h-5" />,
  YouTube: <SiYoutube className="w-5 h-5" />
};

const SOCIAL_COLORS: { [key: string]: string } = {
  Instagram: "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500",
  "Twitter/X": "bg-black",
  LinkedIn: "bg-[#0077B5]",
  GitHub: "bg-[#333333]",
  YouTube: "bg-[#FF0000]"
};

export default function LinkButton({ link }: LinkButtonProps) {
  const icon = SOCIAL_ICONS[link.title];
  const colorClass = SOCIAL_COLORS[link.title] || "bg-white/70";

  return (
    <motion.a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`block w-full p-4 ${colorClass} backdrop-blur-sm rounded-2xl 
                 shadow-lg hover:shadow-xl transition-all duration-300
                 border border-white/20 cursor-pointer
                 flex items-center justify-center gap-3
                 font-medium text-white`}
    >
      {icon}
      <span>{link.title}</span>
    </motion.a>
  );
}
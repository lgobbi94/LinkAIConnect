import { LucideIcon } from "lucide-react"
import { Button } from "./ui/button"
import { motion } from "framer-motion"

type SocialButtonProps = {
  title: string
  url: string
  icon: LucideIcon
  onClick?: () => void
}

export function SocialButton({ title, url, icon: Icon, onClick }: SocialButtonProps) {
  const handleClick = () => {
    window.open(url, "_blank")
    if (onClick) onClick()
  }

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="w-full"
    >
      <Button
        onClick={handleClick}
        className="w-full flex items-center justify-start gap-4 my-2 px-5 py-7 
                 bg-slate-900/60 backdrop-blur-md border border-violet-500/20 
                 transition-all group hover:border-violet-500 hover:bg-slate-800/80
                 shadow-md hover:shadow-violet-500/20"
        variant="outline"
      >
        <span className="text-violet-400 group-hover:text-violet-300 transition-colors">
          <Icon size={22} />
        </span>
        <span className="font-space tracking-wide group-hover:text-violet-300 transition-colors">{title}</span>
      </Button>
    </motion.div>
  )
}
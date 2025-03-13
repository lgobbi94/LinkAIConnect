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
        className="w-full flex items-center justify-start gap-3 my-2 px-5 py-7 border-2 transition-all 
                group hover:border-primary shadow-sm hover:shadow-md"
        variant="outline"
      >
        <span className="text-muted-foreground group-hover:text-primary transition-colors">
          <Icon size={22} />
        </span>
        <span className="font-medium group-hover:text-primary transition-colors">{title}</span>
      </Button>
    </motion.div>
  )
}
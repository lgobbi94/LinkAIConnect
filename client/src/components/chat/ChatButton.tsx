import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import ChatDialog from "./ChatDialog";

export default function ChatButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <Button
          onClick={() => setOpen(true)}
          size="lg"
          className="rounded-full w-28 h-28 bg-[#222831] hover:bg-[#393E46] shadow-lg text-white" // Dark space theme colors
        >
          <MessageCircle className="h-14 w-14 text-white" />
        </Button>
      </motion.div>

      <ChatDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
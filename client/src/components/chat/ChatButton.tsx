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
        className="fixed bottom-6 right-6"
      >
        <Button
          onClick={() => setOpen(true)}
          size="lg"
          className="rounded-full w-14 h-14 bg-[#6C63FF] hover:bg-[#5B52FF] shadow-lg"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </motion.div>

      <ChatDialog open={open} onOpenChange={setOpen} />
    </>
  );
}

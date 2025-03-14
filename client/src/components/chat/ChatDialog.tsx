import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { ChatConfig } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface ChatDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatDialog({ open, onOpenChange }: ChatDialogProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // API config query
  const { data: config } = useQuery<ChatConfig>({
    queryKey: ["/api/chat/config"],
  });

  // Function to handle message sending
  async function handleSend() {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user" as const, content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await apiRequest("POST", "/api/chat/message", {
        message: input,
      });
      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message },
      ]);
    } catch (err) {
      let errorMessage = "Failed to send message. Please try again.";
      if (err instanceof Error) {
        if (err.message.includes("503")) {

          errorMessage =
            "AI chat is currently unavailable. Please check the API configuration.";
        }
      }
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:w-[400px] h-[75vh] flex flex-col p-0 border-l-4 border-l-violet-600 bg-slate-900/90 backdrop-blur-lg">
        <SheetHeader className="p-5 border-b border-violet-800/30 bg-slate-800/60">
          <SheetTitle className="text-xl text-center font-space text-violet-300">
            Lorenzo Gobbi's AI Assistant
          </SheetTitle>
          <p className="text-center text-slate-400 text-sm mt-1 font-space">
            How can I help you today?
          </p>
        </SheetHeader>

        <ScrollArea className="flex-1 p-4 bg-gradient-to-b from-slate-900/70 to-slate-900/90 overflow-auto">
          <div className="space-y-4">
            {messages.map((message, i) => (
              <div
                key={i}
                className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${message.role === "assistant" ? "bg-gray-100 text-gray-800" : "bg-[#6C63FF] text-white"}`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="p-4 border-t flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
            placeholder="Type a message..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button onClick={handleSend} size="icon" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

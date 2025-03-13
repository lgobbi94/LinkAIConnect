
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function ProfilePicture() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  
  useEffect(() => {
    // LinkedIn profile picture URL from the server routes
    // This URL is extracted from your LinkedIn profile
    setImageUrl("https://media.licdn.com/dms/image/D4D03AQHqx9OxqE7t-A/profile-displayphoto-shrink_800_800/0/1685457850853?e=1716422400&v=beta&t=L_XfLmk-EcbSrVk8UJkZVA_9YDYdMXUcVUoqfQMOrFo");
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center my-6"
    >
      {imageUrl ? (
        <img 
          src={imageUrl} 
          alt="LinkedIn Profile" 
          className="w-24 h-24 rounded-full border-2 border-violet-500 shadow-lg object-cover"
        />
      ) : (
        <div className="w-24 h-24 rounded-full bg-slate-900/60 flex items-center justify-center">
          <span className="animate-pulse">Loading...</span>
        </div>
      )}
    </motion.div>
  );
}

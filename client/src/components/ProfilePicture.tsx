
import { motion } from "framer-motion";

export function ProfilePicture() {
  // Using the image from the public assets folder
  const imageUrl = "/assets/foto-lorenzo-gobbi-secsolutions.jpg";

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center my-6"
    >
      <img 
        src={imageUrl} 
        alt="Profile" 
        className="w-28 h-28 rounded-full border-2 border-violet-500 shadow-lg object-cover"
      />
    </motion.div>
  );
}

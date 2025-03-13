
// Import icons from lucide-react or other icon libraries
import { 
  Twitter, 
  Github, 
  Linkedin, 
  Instagram, 
  Youtube, 
  ExternalLink,
  Mail,
  Link,
  Facebook,
  Globe,
  Twitch,
  Music,
  Video,
  BookOpen,
  Radio,
  Store,
  MessageCircle
} from "lucide-react";

// Export the icons that will be used in the LinkButton component
export {
  Twitter,
  Github,
  Linkedin,
  Instagram,
  Youtube,
  ExternalLink,
  Mail,
  Link,
  Facebook,
  Globe,
  Twitch,
  Music,
  Video,
  BookOpen,
  Radio,
  Store,
  MessageCircle
};

// Function to get an icon based on social media name or link type
export function getIconForSocialMedia(title: string) {
  const lowercaseTitle = title.toLowerCase();
  
  if (lowercaseTitle.includes("instagram")) return Instagram;
  if (lowercaseTitle.includes("linkedin")) return Linkedin;
  if (lowercaseTitle.includes("twitter") || lowercaseTitle.includes("x.com")) return Twitter;
  if (lowercaseTitle.includes("github")) return Github;
  if (lowercaseTitle.includes("youtube")) return Youtube;
  if (lowercaseTitle.includes("facebook")) return Facebook;
  if (lowercaseTitle.includes("twitch")) return Twitch;
  if (lowercaseTitle.includes("music") || lowercaseTitle.includes("spotify") || lowercaseTitle.includes("soundcloud")) return Music;
  if (lowercaseTitle.includes("video") || lowercaseTitle.includes("tiktok")) return Video;
  if (lowercaseTitle.includes("blog") || lowercaseTitle.includes("medium")) return BookOpen;
  if (lowercaseTitle.includes("podcast")) return Radio;
  if (lowercaseTitle.includes("shop") || lowercaseTitle.includes("store")) return Store;
  if (lowercaseTitle.includes("discord") || lowercaseTitle.includes("chat")) return MessageCircle;
  if (lowercaseTitle.includes("mail") || lowercaseTitle.includes("email")) return Mail;
  
  // Default to external link icon
  return ExternalLink;
}


import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function ProfilePicture() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Replace with your LinkedIn profile URL
    const linkedinUrl = "https://linkedin.com/in/lorenzo-gobbi-72ab34335";
    
    // Fetch profile picture (in a real implementation, you would use LinkedIn API)
    // For now, this is a placeholder. LinkedIn doesn't allow direct image scraping
    fetch(`/api/linkedin-profile-image`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch profile image');
        }
        return response.json();
      })
      .then(data => {
        setImageUrl(data.imageUrl);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load LinkedIn profile image:", err);
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Skeleton className="w-24 h-24 rounded-full" />;
  }

  if (error || !imageUrl) {
    return (
      <div className="w-24 h-24 rounded-full bg-violet-800/30 flex items-center justify-center text-violet-200">
        <span className="text-2xl">LG</span>
      </div>
    );
  }

  return (
    <img 
      src={imageUrl} 
      alt="Profile" 
      className="w-24 h-24 rounded-full border-2 border-violet-500 shadow-lg"
    />
  );
}

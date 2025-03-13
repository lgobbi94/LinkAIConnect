import React from 'react';
import { SiX } from "react-icons/si";

function MyComponent() {
  return (
    <div>
      <h1>Social Media Links</h1>
      <p>Follow us on:</p>
      <a href="https://www.x.com" target="_blank" rel="noopener noreferrer">
        <SiX /> X
      </a>
      {/* Example of another social media link */}
      <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
        {/* Placeholder for Facebook icon -  replace with appropriate icon*/}
        Facebook
      </a>
    </div>
  );
}

export default MyComponent;
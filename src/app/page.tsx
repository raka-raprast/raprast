"use client";

import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h px-36 flex items-center justify-between" style={{ background: 'linear-gradient(135deg, #24243a, #1E1E2E)' }}>
      {/* Left section with title and description */}
      <div className="w-1/2">
        <h1 className="text-3xl font-bold mb-2 text-white">Welcome to My Page</h1>
        <p className="text-base text-gray-400">This is a description of the profile. Feel free to explore more content and learn more about me!</p>
      </div>

      {/* Image container with gradient */}
      <div className="w-1/4 flex justify-center">
        <div 
          className="rounded px-10 pt-10" 
          style={{ 
            // background: 'linear-gradient(135deg, #fb9a9a, #a9c0ec)', 
            // padding: '1rem'
          }}
        >
          <div 
          className="rounded overflow-hidden"
          >
            <Image 
              src={"/assets/profile_pict.png"} 
              alt="profile_pict" 
              width={280} 
              height={150} 
              className="rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

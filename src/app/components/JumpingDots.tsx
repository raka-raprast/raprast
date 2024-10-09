import React from 'react';

const JumpingDotsSpinner = () => {
    return (
      <div className="relative justify-center items-center ">
        {/* Donut-shaped Spinner with Pastel Gradient */}
        {/* <div className="relative w-24 h-24 rounded-full animate-spin">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'conic-gradient(#ff6b81, #ff9f40, #1dd1a1, #0abde3)', // Pastel gradient colors
              mask: 'radial-gradient(farthest-side, transparent 40%, black 42%)', // Creates the donut hole
              WebkitMask: 'radial-gradient(farthest-side, transparent 70%, black 42%)', // For WebKit browsers
            }}
          />
        </div> */}
  
        {/* Jumping Dots in the Center */}
        <div className="absolute flex space-x-2">
          <div
            className="w-3 h-3 bg-[#ff6b81] rounded-full animate-bounce"
            style={{ animationDelay: '0s' }}
          ></div>
          <div
            className="w-3 h-3 bg-[#ff9f40] rounded-full animate-bounce"
            style={{ animationDelay: '0.2s' }}
          ></div>
          <div
            className="w-3 h-3 bg-[#1dd1a1] rounded-full animate-bounce"
            style={{ animationDelay: '0.4s' }}
          ></div>
        </div>
      </div>
    );
  };
  

export default JumpingDotsSpinner;

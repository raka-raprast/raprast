"use client";

import { useState, useEffect } from "react";
import Link from "next/link"; // Import Link for navigation
import { usePathname } from "next/navigation"; // Import usePathname

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null); // Track the hovered item
  const pathname = usePathname(); // Get the current pathname

  // Close menu on route change
  useEffect(() => {
    const handleRouteChange = () => {
      setIsOpen(false);
    };

    // Attach event listener to router change
    window.addEventListener("popstate", handleRouteChange);
    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);

  const menuItems = ["Experience", "Education", "Projects", "Contacts"];

  return (
    <nav className="bg-[#1E1E2E] py-8 lg:px-24 px-8">
      <div className="container mx-auto flex justify-between items-center transition-all duration-200 ease-in-out">
        {/* Animated Logo in Navbar as a Link */}
        <Link href="/" className="font-custom font-bold text-4xl text-white text-center relative">
          {Array.from("Raprast").map((char, index) => (
            <span key={index} className="relative inline-block">
              {/* Shadow */}
              {/* <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-full h-[5px] bg-white opacity-30 rounded-full blur-md transition-all duration-300 animate-shadow-pulse"></span> */}
              <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-full h-[5px] rounded-full blur-md transition-all duration-300 animate-shadow-pulse"></span>

              {/* Text */}
              <span
                // className="inline-block animate-jump"
                style={{
                  background: "#FF5C58",
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                {char}
              </span>
            </span>
          ))}
        </Link>

        {/* Regular Menu for Larger Screens */}
        <div className="hidden md:flex">
          {menuItems.map((item) => {
            const isActive = pathname === `/${item.toLowerCase()}`; // Check if the current item is active
            const isHovered = hoveredItem === item; // Check if the item is hovered

            return (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`} // Set the href based on item
                className={`font-custom text-white px-3 py-2 transition-all duration-200 ease-in-out ${
                  (isHovered || (isActive && !hoveredItem)) ? "bg-gradient-to-r from-red-500 to-blue-500" 
                  : "hover:bg-gradient-to-r hover:from-red-500 hover:to-blue-500"} rounded`}
                onMouseEnter={() => setHoveredItem(item)} // Set hovered item on mouse enter
                onMouseLeave={() => setHoveredItem(null)} // Reset hovered item on mouse leave
              >
                {item}
              </Link>
            );
          })}
        </div>

        {/* Burger Menu for Smaller Screens */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen((prev) => !prev)} className="text-white focus:outline-none">
            {isOpen ? "✖️" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu with Smooth Transition */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-50 opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className="mt-2">
          {menuItems.map((item) => {
            const isActive = pathname === `/${item.toLowerCase()}`; // Check if the current item is active
            const isHovered = hoveredItem === item; // Check if the item is hovered

            return (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`} // Set the href based on item
                className={`block text-white px-3 py-2 transition-all duration-200 ease-in-out ${
                  (isHovered || (isActive && !hoveredItem)) ? "bg-gradient-to-r from-red-500 to-blue-500" 
                  : "hover:bg-gradient-to-r hover:from-red-500 hover:to-blue-500"} rounded`}
                onMouseEnter={() => setHoveredItem(item)} // Set hovered item on mouse enter
                onMouseLeave={() => setHoveredItem(null)} // Reset hovered item on mouse leave
                onClick={() => setIsOpen(false)} // Close menu on click
              >
                {item}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import React, { ReactNode, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Head from "next/head";
import ReactLoading from "react-loading";

interface BaseLayoutProps {
  children: ReactNode;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false); // Default to light mode
  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.body.classList.remove("dark-mode");
      localStorage.removeItem("theme");
    } else {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark-mode");
    }
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    // Check if the dark mode value is already in localStorage
    const theme = localStorage.getItem("theme");
    if (theme === "dark-mode") {
      document.body.classList.add("dark-mode");
      setIsDarkMode(true);
    }

    // Check if the isMobile value is already in localStorage
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 1000); // Adjust breakpoint as needed
    };

    // Initial check
    checkIsMobile();
    setIsLoading(false);

    // Add event listener for screen resizing
    window.addEventListener("resize", checkIsMobile);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", checkIsMobile);
    // const cachedIsMobile = localStorage.getItem('isMobile');
    // if (cachedIsMobile !== null) {
    //   setIsMobile(JSON.parse(cachedIsMobile));
    //   setIsLoading(false);
    // } else {
    //   // If not found in localStorage, determine and set isMobile
    //   if (typeof window !== 'undefined') {
    //     const userAgent = window.navigator.userAgent;
    //     const isMobileDevice = /Mobi|Android/i.test(userAgent);
    //     setIsMobile(isMobileDevice);
    //     setIsLoading(false);

    //     // Save to localStorage for future use
    //     localStorage.setItem('isMobile', JSON.stringify(isMobileDevice));
    //   }
    // }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <div className="loadingBarFullScreen">
        <ReactLoading
          type="bars"
          color={"var(--gradient-start)"}
          height={450}
          width={isMobile ? 200 : 375}
        />
      </div>
    );
  } else {
    return (
      <div className="layout">
        <Head>
          <title>Raprast - Full Stack Engineer</title>
          <meta property="og:title" content="Raprast - Full Stack Engineer" />
          <link rel="icon" href="/logo.ico" />
          <link rel="icon" type="image/png" href="/ai_avatar.png" />
          <meta
            name="description"
            content="Experienced Full Stack Engineering"
          />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="/logo.ico" />
          <meta
            property="og:description"
            content="Experienced Full Stack Engineering for Your Needs"
          />
        </Head>
        <Sidebar />
        {isMobile ? (
          <main className="layout__main-content_mobile">{children}</main>
        ) : (
          <main className="layout__main-content">{children}</main>
        )}
      </div>
    );
  }
};

export default BaseLayout;

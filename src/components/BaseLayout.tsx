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
      document.body.classList.remove('dark-mode');
      localStorage.removeItem('theme');
    } else {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark-mode');
    }
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    // Check if the dark mode value is already in localStorage
    const theme = localStorage.getItem('theme');
    if (theme === 'dark-mode') {
      document.body.classList.add('dark-mode');
      setIsDarkMode(true);
    }

    // Check if the isMobile value is already in localStorage
    const cachedIsMobile = localStorage.getItem('isMobile');
    if (cachedIsMobile !== null) {
      setIsMobile(JSON.parse(cachedIsMobile));
      setIsLoading(false);
    } else {
      // If not found in localStorage, determine and set isMobile
      if (typeof window !== 'undefined') {
        const userAgent = window.navigator.userAgent;
        const isMobileDevice = /Mobi|Android/i.test(userAgent);
        setIsMobile(isMobileDevice);
        setIsLoading(false);

        // Save to localStorage for future use
        localStorage.setItem('isMobile', JSON.stringify(isMobileDevice));
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <div className="loadingBarFullScreen">
        <ReactLoading type="bars" color="#7fc7d9" height={450} width={375} />
      </div>
    );
  }

  return (
    <div className="layout">
      <Head>
        <title>Raprast</title>
        <link rel="icon" href="/logo.ico" />
        <link rel="icon" type="image/png" href="/ai_avatar.png" />
      </Head>
      <Sidebar />
      {isMobile ? (
        <main className="layout__main-content_mobile">{children}</main>
      ) : (
        <main className="layout__main-content">{children}</main>
      )}
    </div>
  );
};

export default BaseLayout;

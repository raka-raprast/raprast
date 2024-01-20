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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mobileStatus = window.innerWidth <= 600;
      setIsMobile(mobileStatus);
      setIsLoading(false);
    }
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

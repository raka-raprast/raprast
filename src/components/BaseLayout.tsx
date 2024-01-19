import React, { ReactNode, useEffect, useState } from "react";
import Sidebar from "./Sidebar";

interface BaseLayoutProps {
  children: ReactNode;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mobileStatus = window.innerWidth <= 600;
      setIsMobile(mobileStatus);
    }
  }, []);
  return (
    <div className="layout">
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

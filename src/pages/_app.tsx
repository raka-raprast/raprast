import React from "react";
import { SidebarProvider } from "@/context/SidebarContext";
import "@/styles/globals.css";

interface AppProps {
  Component: React.ElementType;
  pageProps: Record<string, any>;
}

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <SidebarProvider>
      <Component {...pageProps} />
    </SidebarProvider>
  );
};

export default App;

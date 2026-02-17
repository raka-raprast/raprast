import React from "react";
import { SidebarProvider } from "@/context/SidebarContext";
import "@/styles/globals.css";
import { Oswald } from '@next/font/google';
import Chatbot from "@/components/Chatbot";

interface AppProps {
  Component: React.ElementType;
  pageProps: Record<string, any>;
}

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <SidebarProvider>
      <Component {...pageProps} />
      <Chatbot />
    </SidebarProvider>
  );
};

export default App;

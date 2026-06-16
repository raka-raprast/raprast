import React from "react";
import { SidebarProvider } from "@/context/SidebarContext";
import "@/styles/globals.css";
import { Oswald } from '@next/font/google';
import Chatbot from "@/components/Chatbot";
import SEO from "@/components/SEO";

interface AppProps {
  Component: React.ElementType;
  pageProps: Record<string, any>;
}

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <SEO />
      <SidebarProvider>
      <Component {...pageProps} />
      <Chatbot />
      </SidebarProvider>
    </>
  );
};

export default App;

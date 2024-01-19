import React, { createContext, useState, ReactNode } from "react";

interface SidebarContextProps {
  isCollapsed: boolean;
  toggleSidebarCollapse: () => void;
}

const initialValue: SidebarContextProps = {
  isCollapsed: true,
  toggleSidebarCollapse: () => {},
};

const SidebarContext = createContext<SidebarContextProps>(initialValue);

interface SidebarProviderProps {
  children: ReactNode;
}

const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
  const [isCollapsed, setCollapse] = useState(true);

  const toggleSidebarCollapse = () => {
    setCollapse((prevState) => !prevState);
  };

  const contextValue: SidebarContextProps = {
    isCollapsed,
    toggleSidebarCollapse,
  };

  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  );
};

export { SidebarContext, SidebarProvider };

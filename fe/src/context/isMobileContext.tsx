"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface IsMobileContextType {
  isMobile: boolean;
}

const IsMobileContext = createContext<IsMobileContextType | undefined>(
  undefined
);

export const IsMobileProvider = ({ children }: { children: ReactNode }) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // You can change 768 to your breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <IsMobileContext.Provider value={{ isMobile }}>
      {children}
    </IsMobileContext.Provider>
  );
};

export const useIsMobile = (): boolean => {
  const context = useContext(IsMobileContext);
  if (!context) {
    throw new Error("useIsMobile must be used within an IsMobileProvider");
  }
  return context.isMobile;
};

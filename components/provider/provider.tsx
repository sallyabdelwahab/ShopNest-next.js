"use client";

import React, { ReactNode, useEffect, useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import { Toaster } from "react-hot-toast";
import CartContextProvider from "@/components/Context/CartContext";
import WishContextProvider from "@/components/Context/wishContext";
import { SessionProvider } from "next-auth/react";
import Footer from "../Footer/Footer";
import { usePathname } from "next/navigation";

export default function Provider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [showFooter, setShowFooter] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); 
  }, []);

  useEffect(() => {
    if (!isClient || pathname === "/") {
      setShowFooter(false);
      return;
    }

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.body.scrollHeight;

      if (scrollTop + windowHeight >= fullHeight - 10) {
        setShowFooter(true);
      } else {
        setShowFooter(false);
      }
    };

    handleScroll(); 
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname, isClient]);

  return (
    <SessionProvider>
      <CartContextProvider>
        <WishContextProvider>
          <Navbar />
          <div className="container mx-auto py-4 pb-20">
            <Toaster />
            {children}
          </div>
          {/*Hydration safe rendering*/}
          {isClient && pathname !== "/" && showFooter && <Footer />}
        </WishContextProvider>
      </CartContextProvider>
    </SessionProvider>
  );
}

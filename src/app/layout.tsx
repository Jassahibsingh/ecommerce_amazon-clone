// "use client";
import React, { useEffect, useState } from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./header";
import Page from "./page";
import Footer from "./footer";
import Backdrop from "@mui/material/Backdrop";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Amazon - by Jassahib",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isBackdropOpen, setBackdropOpen] = useState<boolean>(false);
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const handleBackdrop = (open: boolean) => {
    setBackdropOpen(open);
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  useEffect(() => {
    if (isSidebarOpen) {
      handleBackdrop(true);
    } else {
      handleBackdrop(false);
    }
  }, [isSidebarOpen]);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Backdrop
          sx={{ color: "#fff", zIndex: isSidebarOpen ? 40 : 20 }}
          open={isBackdropOpen}
          onClick={() => {
            handleBackdrop(false);
            setSidebarOpen(false);
          }}
        />
        <div className="bg-gray-100 min-h-screen">
          <Header
            handleBackdrop={handleBackdrop}
            isBackdropOpen={isBackdropOpen}
            isSidebarOpen={isSidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
          <Page isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
          <Footer />
        </div>
      </body>
    </html>
  );
}

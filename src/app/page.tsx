"use client";
import React, { useEffect, useState } from "react";
import Header from "./header";
import PageContent from "./pageContent";
import Footer from "./footer";
import Backdrop from "@mui/material/Backdrop";

function Page() {
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
    <div>
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
        <PageContent
          isSidebarOpen={isSidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <Footer />
      </div>
    </div>
  );
}
export default Page;

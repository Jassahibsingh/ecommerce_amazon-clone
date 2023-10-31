"use client";
import React, { useEffect, useState } from "react";
import Header from "./header";
import PageContent from "./pageContent";
import Footer from "./footer";
import Backdrop from "@mui/material/Backdrop";
import LocationModal from "./locationModal";
// import Page from "./productView/page";
import SidebarMenu from "./sidebarMenu";

function Page() {
  const [isBackdropOpen, setBackdropOpen] = useState<boolean>(false);
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [isLocModalOpen, setLocModalOpen] = useState(false);

  const handleBackdrop = (open: boolean) => {
    setBackdropOpen(open);
    if (open && isSidebarOpen) {
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
    <div className="overflow-hidden">
      <Backdrop
        sx={{ color: "#fff", zIndex: isSidebarOpen ? 40 : 20 }}
        open={isBackdropOpen}
        onClick={() => {
          handleBackdrop(false);
          setSidebarOpen(false);
        }}
      />
      <LocationModal
        isLocModalOpen={isLocModalOpen}
        setLocModalOpen={setLocModalOpen}
      />
      <div
        className="absolute top-0 left-0 z-40"
        style={{
          transform: isSidebarOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease-in-out",
        }}
      >
        <SidebarMenu
          isSidebarOpen={isSidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
      </div>
      <div className="bg-gray-100 min-h-screen">
        <Header
          handleBackdrop={handleBackdrop}
          isSidebarOpen={isSidebarOpen}
          setSidebarOpen={setSidebarOpen}
          setLocModalOpen={setLocModalOpen}
        />
        <PageContent />
        {/* <Page
          setLocModalOpen={setLocModalOpen}
          img={""}
          heading={""}
          rating={0}
          price={0}
          info={""}
          about={""}
          infoSummary={""}
          inStock={true}
        /> */}
        <Footer />
      </div>
    </div>
  );
}
export default Page;

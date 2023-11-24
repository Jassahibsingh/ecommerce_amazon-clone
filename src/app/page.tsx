"use client";
import React, { useEffect } from "react";
import Header from "./header";
import PageContent from "./pageContent";
import Footer from "./footer";
import Backdrop from "@mui/material/Backdrop";
import LocationModal from "./components/locationModal";
import SidebarMenu from "./components/sidebarMenu";
import { useDispatch, useSelector } from "react-redux";
import { setBackdropOpen, setSidebarOpen } from "../redux/headerFuncSlices";
import { RootState } from "../redux/store";

function Page() {
  const isSidebarOpen = useSelector(
    (state: RootState) => state.header.isSidebarOpen
  );
  const isBackdropOpen = useSelector(
    (state: RootState) => state.header.isBackdropOpen
  );
  const dispatch = useDispatch();

  const handleBackdrop = (open: boolean) => {
    dispatch(setBackdropOpen(open));
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
          dispatch(setSidebarOpen(false));
        }}
      />
      <LocationModal />
      <div
        className="absolute top-0 left-0 z-40"
        style={{
          transform: isSidebarOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease-in-out",
        }}
      >
        <SidebarMenu />
      </div>
      <div className="bg-gray-100 min-h-screen">
        <Header handleBackdrop={handleBackdrop} />
        <PageContent />
        <Footer />
      </div>
    </div>
  );
}
export default Page;

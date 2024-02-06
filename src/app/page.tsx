"use client";
import React, { useEffect } from "react";
import Header from "./header";
import PageContent from "./pageContent";
import Footer from "./footer";
import { useDispatch, useSelector } from "react-redux";
import { setBackdropOpen } from "../redux/headerFuncSlices";
import { RootState } from "../redux/store";

function Page() {
  const isSidebarOpen = useSelector(
    (state: RootState) => state.header.isSidebarOpen
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
      <div className="bg-gray-100 min-h-screen">
        <Header />
        <PageContent />
        <Footer />
      </div>
    </div>
  );
}
export default Page;

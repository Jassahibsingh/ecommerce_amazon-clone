import Divider from "@mui/material/Divider";
import Link from "next/link";
import React from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { setLocModalOpen } from "./redux/headerFuncSlices";
import { RootState } from "./redux/store";

function LocationModal() {
  const dispatch = useDispatch();
  const isLocModalOpen = useSelector(
    (state: RootState) => state.header.isLocModalOpen
  );
  const closeModal = () => dispatch(setLocModalOpen(false));

  return (
    <div className="">
      <Modal
        isOpen={isLocModalOpen}
        onRequestClose={closeModal}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            padding: 0,
            backgroundColor: "white",
            width: 400,
            overflow: "hidden",
            borderRadius: 10,
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            zIndex: 50,
          },
        }}
      >
        <div className="flex w-full text-[16px] py-[16px] px-[25px] font-bold bg-[#F0F2F2]">
          Choose your location
        </div>
        <div className="px-[25px] py-[16px]">
          <span className="text-[#565959] text-[12px] leading-4">
            Delivery options and delivery speeds may vary for different
            locations
          </span>
          <Link
            className="flex mt-5 mb-3 text-[14px] font-medium text-[#007185] hover:text-[#f08804] hover:underline cursor-pointer"
            href={"#"}
          >
            Manage address book
          </Link>
          <Divider className="text-[12px]">or enter a US zip code</Divider>
          <span className="flex my-2 h-[31px] justify-between">
            <input
              type="text"
              className="border border-[#888C8C] focus:ring-cyan-400 focus:ring-opacity-100 rounded  py-[3px] px-[7px] w-full outline-none"
              style={{ boxShadow: "0 1px 2px rgba(15,17,17,.15)" }}
            />
            <div
              style={{ boxShadow: "0 2px 5px 0 rgba(213,217,217,.5)" }}
              className="flex items-center ml-2 px-10 py-4 border-[#D5D9D9] bg-white hover:bg-slate-50 text-[13px] border rounded-md cursor-pointer"
            >
              Apply
            </div>
          </span>
          <Divider className="text-[12px]">or</Divider>
          <select
            className="border bg-[#F0F2F2] border-[#D5D9D9] hover:bg-[#e9e9e9] text-[13px] focus:ring-cyan-400 focus:ring-opacity-100 rounded-lg my-3 py-[5px] px-[7px] w-full outline-none"
            style={{ boxShadow: "0 2px 5px 0 rgba(213,217,217,.5)" }}
            name="Country"
            id=""
          >
            <option className="" value="" disabled selected hidden>
              Ship outside the US
            </option>
          </select>
          <div className="flex items-end justify-end">
            <span className="bg-[#FED914] hover:bg-[#fed050] p-2 text-[13px] rounded-md cursor-pointer">
              Done
            </span>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default LocationModal;

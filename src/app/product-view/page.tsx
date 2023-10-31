"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Divider from "@mui/material/Divider";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Rating from "@mui/material/Rating";
import ReactImageMagnify from "@blacklab/react-image-magnify";
import { useZoomImageHover } from "@zoom-image/react";
import { BsChevronDown } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import Header from "../header";
import Footer from "../footer";

interface productViewPageProps {
  img: string;
  heading: string;
  rating: number;
  price: number;
  info: string;
  about: string;
  infoSummary: string;
  inStock: boolean;
  setLocModalOpen: (value: boolean) => void;
}

function Page({ inStock, setLocModalOpen }: productViewPageProps) {
  const { createZoomImage: createZoomImageHover } = useZoomImageHover();

  const imageHoverContainerRef = useRef<HTMLDivElement>(null);
  const zoomTargetRef = useRef<HTMLDivElement>(null);

  const imageContainer = imageHoverContainerRef.current as HTMLDivElement;
  const zoomTarget = zoomTargetRef.current as HTMLDivElement;

  useEffect(() => {
    if (imageContainer && zoomTarget) {
      createZoomImageHover(imageContainer, {
        zoomImageSource: "/uno.jpg",
        customZoom: { width: 580, height: 530 },
        zoomTarget,
        scale: 2,
        zoomLensScale: 0.75,
      });
      console.log("image");
    }
  }, [imageContainer]);

  const breadcrumbs = [
    <div key={1}>Books</div>,
    <div key={2}>Atomic Habits</div>,
  ];

  function formatDateWithOffset(offsetDays: number): string {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const currentDate = new Date();
    const targetDate = new Date(currentDate);
    targetDate.setDate(currentDate.getDate() + offsetDays);

    const dayOfWeek = days[targetDate.getDay()];
    const month = months[targetDate.getMonth()];
    const date = targetDate.getDate();
    const year = targetDate.getFullYear();

    return `${dayOfWeek}, ${month} ${date}, ${year}`;
  }

  return (
    <div className="flex flex-col items-center bg-white">
      <Header
        handleBackdrop={function (value: boolean): void {
          throw new Error("Function not implemented.");
        }}
        isSidebarOpen={false}
        setSidebarOpen={function (value: boolean): void {
          throw new Error("Function not implemented.");
        }}
        setLocModalOpen={function (value: boolean): void {
          throw new Error("Function not implemented.");
        }}
      />
      <Breadcrumbs
        className="w-full text-[12px]"
        separator="›"
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>

      {/* Product image part */}
      <div className="flex w-full my-3">
        <div className="flex bg-slate-5 w-[1250px]">
          <div className="flex flex-col items-center m-4">
            <span className="w-[45px] h-[45px] overflow-hidden mb-2">
              <img src="/uno.jpg" className="object-contain" alt="" />
            </span>
            <span className="w-[45px] h-[45px] overflow-hidden mb-2">
              <img src="/uno.jpg" className="object-contain" alt="" />
            </span>
            <span className="w-[45px] h-[45px] overflow-hidden mb-2">
              <img src="/uno.jpg" className="object-contain" alt="" />
            </span>
            <span className="w-[45px] h-[45px] overflow-hidden mb-2">
              <img src="/uno.jpg" className="object-contain" alt="" />
            </span>
          </div>
          <div
            ref={imageHoverContainerRef}
            className="relative flex h-[450px] items-start"
          >
            <img className="h-full w-full" alt="Small Pic" src="/uno.jpg" />
            <div
              ref={zoomTargetRef}
              className="absolute left-[400px] z-10"
            ></div>
          </div>
        </div>
        {/* Product image part */}

        {/* Product info part */}
        <div className="flex flex-col w-[1534px] m-4">
          <div className="text-[23px] font-medium leading-8">
            Mattel Games UNO Card Game, Toy for Kids and Adults, Family Game for
            Camping and Travel in Storage Tin Box (Amazon Exclusive)
          </div>
          <div className="flex items-center text-[14px]">
            <span className="flex items-center my-1 mr-4">
              4.8{" "}
              <Rating
                className="mx-1 tracking-tighter"
                name="read-only"
                value={4.8}
                precision={0.1}
                size="small"
                readOnly
              />
              <BsChevronDown size={10} />
            </span>
            <Link
              className="flex items-center text-[#007185] hover:text-[#f08804] hover:underline cursor-pointer"
              href={"#"}
            >
              {" "}
              64,834 ratings
            </Link>
          </div>
          <span className="text-[12px] text-[#565959]">
            20K+ bought in past month
          </span>
          <Divider className="w-[550px] my-1" />
          <div className="flex my-1 text-[23px]">
            <span className="text-[#CC0C39] text-[21px] mr-2">-33%</span>
            <div className="flex items-start">
              <span className="text-[12px] font-thin">$</span>
              <span className="font-medium">10</span>
              <span className="text-[12px] font-thin">99</span>
            </div>
          </div>
          <div className="flex text-[13px] text-[#565959] mb-1">
            $22.16 Shipping & Import Fees Deposit to India
            <Link
              className="flex items-center text-[#007185] ml-1 hover:text-[#f08804] hover:underline cursor-pointer"
              href={"#"}
            >
              <p className="mr-1">Details</p>
              <BsChevronDown size={8} />
            </Link>
          </div>
          <span className="text-[13px]">
            Available at a lower price from other sellers that may not offer
            free Prime shipping.
          </span>
          <table className="my-4">
            <tbody className="table-row-group align-middle text-[14px]">
              <tr className="">
                <td className="font-bold pb-2">Age Range (Description)</td>
                <td>7 years and up</td>
              </tr>
              <tr className="">
                <td className="font-bold pb-2">Number of Players</td>
                <td>2-10 players</td>
              </tr>
              <tr>
                <td className="font-bold pb-2">Brand Mattel</td>
                <td>Games</td>
              </tr>
              <tr>
                <td className="font-bold pb-2">Theme</td>
                <td>Game</td>
              </tr>
              <tr>
                <td className="font-bold pb-2">Material</td>
                <td>Paper</td>
              </tr>
            </tbody>
          </table>
          <Divider className="w-[550px] my-2" />
          <div className="mt-2">
            <span className="font-bold text-[15px] mb-4">About this item</span>
            <ul className="list-disc text-[14px] space-y-1 pl-4">
              <li>
                UNO is the classic family card game that&apos;s easy to learn
                and so much fun to play!
              </li>
              <li>
                In a race to deplete your hand, match one of your cards with the
                current card shown on top of the deck by either color or number.
              </li>
              <li>
                Strategize to defeat your competition with special action cards
                like Skips, Reverses, Draw Twos and color-changing Wild cards.
              </li>
              <li>
                When you&apos;re down to one card, don&apos;t forget to shout
                &quot;UNO!&quot;
              </li>
              <li>
                This fun family card game is perfect for adults, teens and kids
                7 years old and up.
              </li>
            </ul>
          </div>
        </div>
        {/* Product info part */}

        {/* Product pricing and delivery */}
        <div className="flex w-[700px] bg-white mr-4">
          <div className="flex flex-col  rounded-lg border border-[#ddd] p-[20px] mb-[22px]">
            <div className="flex items-start text-[28px] mb-3">
              <span className="text-[12px] font-thin">$</span>
              <span className="font-medium">10</span>
              <span className="text-[12px] font-thin">99</span>
            </div>
            <div className="text-[13px] text-[#565959] mb-1">
              $22.16 Shipping & Import Fees Deposit to India{" "}
              <Link
                className="text-[#007185] hover:text-[#f08804] hover:underline cursor-pointer"
                href={"#"}
              >
                Details
              </Link>
            </div>
            <div className="text-[13px] text-[#565959] mb-1">
              Delivery
              <b className="text-black"> {formatDateWithOffset(4)}</b>. Order
              within
              <Link
                className="text-[#007185] hover:text-[#f08804] hover:underline cursor-pointer"
                href={"#"}
              >
                {" "}
                14 hrs 26 mins
              </Link>
            </div>
            <span
              className="flex text-[12px] mt-1"
              onClick={() => setLocModalOpen(true)}
            >
              <CiLocationOn size={15} color={"black"} />
              <Link
                className="flex items-center text-[#007185] hover:text-[#f08804] hover:underline cursor-pointer"
                href={"#"}
              >
                {" "}
                Deliver to India
              </Link>
            </span>
            <span
              className={`${
                inStock ? "text-[#007600]" : "text-[#CC0C39]"
              } text-[18px] font-medium my-2`}
            >
              {inStock ? "In Stock" : "Out of Stock"}
            </span>
            <select
              className="w-[70px] border bg-[#F0F2F2] border-[#D5D9D9] hover:bg-[#e9e9e9] text-[13px] focus:ring-cyan-400 focus:ring-opacity-100 rounded-lg my-3 py-[5px] px-[7px] outline-none"
              style={{ boxShadow: "0 2px 5px 0 rgba(213,217,217,.5)" }}
              name="Country"
              id=""
            >
              <option className="" value="" disabled selected hidden>
                Qty:1
              </option>
              {Array.from({ length: 30 }, (_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <span className="flex items-center justify-center bg-[#FED914] hover:bg-[#fed050] p-2 mt-4 text-[13px] rounded-full cursor-pointer">
              Add to Cart
            </span>
            <span className="flex items-center justify-center bg-[#FFA41C] hover:bg-[#FF8F00] p-2 mt-2 text-[13px] rounded-full cursor-pointer">
              Buy now
            </span>
            <table className="space-y-3 mt-4">
              <tbody className="table-row-group text-[11px] text-[#565959]">
                <tr>
                  <td>Payment</td>
                  <td>
                    <Link
                      className="flex items-center text-[#007185] hover:text-[#f08804] hover:underline cursor-pointer"
                      href={"#"}
                    >
                      {" "}
                      Secure transaction
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>Ships from</td>
                  <td>Amazon.com</td>
                </tr>
                <tr>
                  <td>Sold by</td>
                  <td>Amazon.com</td>
                </tr>
                <tr>
                  <td>Returns</td>
                  <td>
                    <Link
                      className="flex items-center text-[#007185] hover:text-[#f08804] hover:underline cursor-pointer"
                      href={"#"}
                    >
                      {" "}
                      Eligible for Return, Refund or Replacement within 30 days
                      of receipt
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>Packaging</td>
                  <td>
                    <Link
                      className="flex items-center text-[#007185] hover:text-[#f08804] hover:underline cursor-pointer"
                      href={"#"}
                    >
                      {" "}
                      Shows what&apos;s inside
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
            <Divider className="text-[12px] my-3" variant="middle" />
            <div
              style={{ boxShadow: "0 2px 5px 0 rgba(213,217,217,.5)" }}
              className="flex items-center border-[#888C8C] px-3 py-1.5 bg-white hover:bg-slate-50 text-[13px] border rounded-lg cursor-pointer"
            >
              Add to List
            </div>
          </div>
        </div>
        {/* Product pricing and delivery */}
      </div>

      {/* Product info summary */}
      <div className="flex w-full p-5">
        <table className="my-4 mr-8 w-[50%]">
          <thead className="text-[17px] font-bold">Product information</thead>
          <tbody className="text-[14px]">
            <tr className="border-t-[1px] border-b-[1px] border-[#BABEBF]">
              <td className="text-[#565959] bg-[#F1F2F3] w-[50%] py-2 px-4">
                Product Dimensions
              </td>
              <td className="text-[#333] w-[50%] py-2 px-4">
                1.96 x 5.9 x 6.69 inches
              </td>
            </tr>
            <tr className="border-b-[1px] border-[#BABEBF]">
              <td className="text-[#565959] bg-[#F1F2F3] w-[50%] py-2 px-4">
                Item Weight
              </td>
              <td className="text-[#333] w-[50%] py-2 px-4">5.9 ounces</td>
            </tr>
            <tr className="border-b-[1px] border-[#BABEBF]">
              <td className="text-[#565959] bg-[#F1F2F3] w-[50%] py-2 px-4">
                Country of Origin
              </td>
              <td className="text-[#333] w-[50%] py-2 px-4">China</td>
            </tr>
            <tr className="border-b-[1px] border-[#BABEBF]">
              <td className="text-[#565959] bg-[#F1F2F3] w-[50%] py-2 px-4">
                ASIN
              </td>
              <td className="text-[#333] w-[50%] py-2 px-4">B07P6MZPK3</td>
            </tr>
            <tr className="border-b-[1px] border-[#BABEBF]">
              <td className="text-[#565959] bg-[#F1F2F3] w-[50%] py-2 px-4">
                Item model number
              </td>
              <td className="text-[#333] w-[50%] py-2 px-4">GDJ85</td>
            </tr>
            <tr className="border-b-[1px] border-[#BABEBF]">
              <td className="text-[#565959] bg-[#F1F2F3] w-[50%] py-2 px-4">
                Manufacturer recommended age
              </td>
              <td className="text-[#333] w-[50%] py-2 px-4">7 years and up</td>
            </tr>
            <tr className="border-b-[1px] border-[#BABEBF]">
              <td className="text-[#565959] bg-[#F1F2F3] w-[50%] py-2 px-4">
                Best Sellers Rank
              </td>
              <td className="text-[#333] w-[50%] py-2 px-4">
                #87 in Toys & Games (See Top 100 in Toys & Games)
              </td>
            </tr>
            <tr className="border-b-[1px] border-[#BABEBF]">
              <td className="text-[#565959] bg-[#F1F2F3] w-[50%] py-2 px-4">
                Customer Reviews
              </td>
              <td className="text-[#333] w-[50%] py-2 px-4">
                4.8 out of 5 stars 64,873 ratings
              </td>
            </tr>
            <tr className="border-b-[1px] border-[#BABEBF]">
              <td className="text-[#565959] bg-[#F1F2F3] w-[50%] py-2 px-4">
                Release date
              </td>
              <td className="text-[#333] w-[50%] py-2 px-4">April 10, 2019</td>
            </tr>
            <tr className="border-b-[1px] border-[#BABEBF]">
              <td className="text-[#565959] bg-[#F1F2F3] w-[50%] py-2 px-4">
                Language
              </td>
              <td className="text-[#333] w-[50%] py-2 px-4">English</td>
            </tr>
            <tr className="border-b-[1px] border-[#BABEBF]">
              <td className="text-[#565959] bg-[#F1F2F3] w-[50%] py-2 px-4">
                Manufacturer
              </td>
              <td className="text-[#333] w-[50%] py-2 px-4">Mattel</td>
            </tr>
          </tbody>
        </table>
        <div className="w-[50%]">
          <h2 className="mt-10">Feedback</h2>
          <Divider className="my-1" />
          <span className="text-[14px]">
            Would you like to
            <Link
              className="text-[#007185] hover:text-[#f08804] hover:underline cursor-pointer"
              href={"#"}
            >
              {" "}
              tell us about a lower price?
            </Link>
          </span>
        </div>
      </div>
      {/* Product info summary */}
      <Footer />
    </div>
  );
}

export default Page;

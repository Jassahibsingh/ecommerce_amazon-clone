"use client";
import React, { useEffect, useState } from "react";
import Header from "../header";
import Footer from "../footer";
import Rating from "@mui/material/Rating";
import { BsChevronDown } from "react-icons/bs";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/supabase/supabase";

interface Product {
  productid: number;
  productimage: string;
  rating: number;
  price: number;
  about: string;
  instock: boolean;
  heading: string;
}

function Search() {
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  const Router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams?.get("q");
  const category = searchParams?.get("category");

  async function searchedProducts() {
    setLoading(true);
    if (searchQuery) {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .ilike("heading", `%${searchQuery}%`);
      if (error) {
        console.error("Error fetching search results:", error);
      } else {
        setSearchResults([...data]);
      }
    }
    if (category) {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("category", category);
      if (error) {
        console.error("Error fetching search results:", error);
      } else {
        setSearchResults([...data]);
      }
    }
    setLoading(false);
  }

  function formatDateWithOffset(
    offsetDays: number,
    yearRequired?: boolean
  ): string {
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
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const currentDate = new Date();
    const targetDate = new Date(currentDate);
    targetDate.setDate(currentDate.getDate() + offsetDays);

    const dayOfWeek = days[targetDate.getDay()];
    const month = months[targetDate.getMonth()];
    const date = targetDate.getDate();
    const year = targetDate.getFullYear();

    if (yearRequired) {
      return `${date} ${month} ${year}`;
    }
    return `${dayOfWeek}, ${date} ${month}`;
  }
  useEffect(() => {
    searchedProducts();
  }, [searchQuery]);

  useEffect(() => {
    console.log("search", searchResults);
  }, [searchResults]);

  return (
    <div>
      <Header />
      {isLoading ? (
        <div className="flex items-center justify-center w-full p-10">
          <img src="/loader-big.gif" />
        </div>
      ) : (
        <div className="flex flex-col">
          <div
            className="flex w-full p-2 text-[15px]"
            style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}
          >
            {searchResults.length} results for
            <b className="text-[#C55400] ml-1">
              &quot;{searchQuery ? searchQuery : category}&quot;
            </b>
          </div>
          {searchResults.length > 0 ? (
            <div className="flex flex-col p-2">
              <p className="text-[18px] font-bold">Results</p>
              <p className="text-[14px] mb-4">
                Check each product page for other buying options.
              </p>
              {searchResults.map((product, id) => (
                <div key={id} className="flex px-8 my-3">
                  <img
                    className="min-w-[200px] max-w-[200px] max-h-[200px] object-contain mr-3 cursor-pointer"
                    src={product.productimage}
                    onClick={() =>
                      Router.push(
                        `/product-view?productID=${product.productid}`
                      )
                    }
                  />
                  <div className="flex flex-col items-start">
                    <p
                      className="flex items-center text-[18px] hover:text-[#f05b04] cursor-pointer"
                      onClick={() =>
                        Router.push(
                          `/product-view?productID=${product.productid}`
                        )
                      }
                    >
                      {product.heading}
                    </p>
                    <div className="flex items-center text-[14px]">
                      <span className="flex items-center my-1 mr-4">
                        {product?.rating && (
                          <Rating
                            className="mx-1 tracking-tighter"
                            name="read-only"
                            value={product?.rating}
                            precision={0.1}
                            size="small"
                            readOnly
                          />
                        )}
                        <BsChevronDown size={10} />
                      </span>
                      <p className="flex items-center text-[#007185] hover:text-[#f08804] hover:underline cursor-pointer">
                        {" "}
                        64,834
                      </p>
                    </div>
                    <span className="text-[12px] text-[#565959]">
                      20K+ bought in past month
                    </span>
                    <div className="flex items-start text-[24px] mt-1">
                      <span className="text-[12px] ">$</span>
                      <span className="font-medium">{product.price}</span>
                    </div>
                    <img
                      className="w-[60px] mb-"
                      src="/prime-delivery.png"
                      alt=""
                    />
                    <p className="flex text-[12px]">
                      FREE delivery
                      <b className="text-black ml-1">
                        {" "}
                        {formatDateWithOffset(4)}
                      </b>
                      .
                    </p>
                    <p className="text-[12px]">
                      Or fastest delivery <b>Today</b>
                    </p>
                    <p className="text-[12px]">Service: Setup at delivery</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col justify-center w-full bg-slate-300 p-4">
              <p className="text-[20px]">
                We&apos;re currently working on expanding our inventory, please
                try again later.
              </p>
              <span className="flex justify-center w-full">
                <img
                  src="/inventory.svg"
                  className="w-[800px] object-contain"
                />
              </span>
            </div>
          )}
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Search;

"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { supabase } from "@/supabase/supabase";
import "./scrollbar.css";

interface SliderArray {
  id: number;
  image: string;
}

interface ProductSliderProps {
  header: string;
  sliderArray: SliderArray[];
}

function ProductSlider({ header, sliderArray }: ProductSliderProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const slide = (slideOffset: number) => {
    if (ref.current) {
      ref.current.scrollLeft += slideOffset;
    }
    // console.log(data);
  };

  return (
    <div className="flex flex-col bg-white p-5 mx-5">
      <div className="font-bold text-xl mb-2">{header}</div>
      <div className="flex items-center w-full">
        <div
          className="flex items-center justify-center  rounded bg-white shadow-left w-14 h-24 cursor-pointer"
          onClick={() => slide(-1000)}
        >
          <GoChevronLeft color="#555" size={45} />
        </div>
        <div
          ref={ref}
          className="flex items-center w-[1155px] h-[206px] scroll overflow-x-scroll scroll-smooth"
        >
          {sliderArray.map((e: any) => (
            <Link key={e.id} href={"#"} className="min-w-[300px]">
              <img src={e.image} className="object-contain block" alt={""} />
            </Link>
          ))}
        </div>
        <div
          className="flex items-center justify-center bg-white shadow-right w-14 h-24 cursor-pointer"
          onClick={() => slide(1000)}
        >
          <GoChevronRight color="#555" size={45} />
        </div>
      </div>
    </div>
  );
}

export default ProductSlider;

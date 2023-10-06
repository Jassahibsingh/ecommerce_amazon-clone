"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { supabase } from "@/supabase/supabase";
import "./scrollbar.css";

interface Image {
  src: string;
  alt: string;
  url: string;
}

interface SliderData {
  title: string;
  images: Image[];
}

interface ProductArray {
  id: number;
  productimage: string;
}

interface ProductSliderProps {
  data: SliderData;
}

function ProductSlider({ data }: ProductSliderProps) {
  const [sliderImages, setSliderImages] = useState<ProductArray[]>([]);
  const ref = useRef<HTMLDivElement | null>(null);

  const slide = (slideOffset: number) => {
    if (ref.current) {
      ref.current.scrollLeft += slideOffset;
    }
    console.log(data);
  };

  async function getSliderImages() {
    try {
      const { data, error } = await supabase.from("product_slider").select("*");
      if (data) {
        console.log(data);
        setSliderImages(data);
      }
      if (error) throw error;
    } catch (error) {
      console.log("err", error);
    }
  }
  useEffect(() => {
    getSliderImages();
  }, []);

  return (
    <div className="flex flex-col bg-white p-5 mx-5">
      <div className="font-bold text-xl mb-2">{data.title}</div>
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
          {sliderImages.map((e, id) => (
            <Link key={id} href={"#"} className="min-w-[300px]">
              <img
                src={e.productimage}
                className="object-contain block"
                alt={""}
              />
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

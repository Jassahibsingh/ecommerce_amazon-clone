"use client";
import React, { useEffect, useRef, useState } from "react";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import Slider from "react-slick";
import ProductsCard from "./productsCard";
import prodCards from "./productCards.json";
import ProductSlider from "./productSlider";
import FRID from "./productSlider.json";
import SidebarMenu from "./sidebarMenu";
import { supabase } from "@/supabase/supabase";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";

interface PageProps {
  isSidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
}

function PageContent({ isSidebarOpen, setSidebarOpen }: PageProps) {
  const [carouselImg, setCarouselImg] = useState<any[]>([]);
  const [productCardInfo, setProductCardInfo] = useState<any[]>([]);
  const sliderRef = useRef<Slider | null>(null);

  const nextImg = () => {
    sliderRef.current!.slickNext();
  };
  const prevImg = () => {
    sliderRef.current!.slickPrev();
  };
  const settings = {
    arrows: true,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  async function getCarouselImages() {
    try {
      const { data, error } = await supabase.from("carousel").select("*");
      if (data) {
        setCarouselImg(data);
      } else {
        return error;
      }
    } catch (error) {
      console.log("Error while fetching carousel images", error);
    }
  }
  useEffect(() => {
    getCarouselImages();
    getproductCardInfo();
  }, []);

  async function getproductCardInfo() {
    try {
      const { data, error } = await supabase.from("cards").select("*");
      if (data) {
        setProductCardInfo(data);
        console.log("data", data);
      } else {
        return error;
      }
    } catch (error) {
      console.log("Error while fetching carousel images", error);
    }
  }

  return (
    <div className="flex flex-col w-full items-center select-none">
      <div className="w-full overflow-hidden absolute">
        <Slider {...settings} ref={sliderRef}>
          {carouselImg.map((e) => (
            <Link key={e.id} href={"#"}>
              <img src={e.images} alt={`Carousel image ${e.id}`} />
            </Link>
          ))}
        </Slider>
      </div>
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
      <div className="z-10 flex flex-col items-start justify-between w-full">
        <div className="flex items-start justify-between w-full bg-cover bg-left">
          <div
            className="flex items-center justify-center p-3 cursor-pointer h-60 hover:outline outline-2 outline-white"
            onClick={prevImg}
          >
            <GoChevronLeft color="black" size={45} />
          </div>
          <div
            className="flex items-center justify-center p-3 cursor-pointer h-60 hover:outline outline-2 outline-white"
            onClick={nextImg}
          >
            <GoChevronRight color="black" size={45} />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center space-y-5 w-full pb-4 bg-gradient-to-b from-transparent via-[#e3e5e1] to-[#e3e5e1]">
          <div className="grid grid-cols-4 gap-5">
            {productCardInfo.map((e: any) => (
              <ProductsCard
                key={e.id}
                heading={e.heading}
                image={e.image}
                url={e.url}
                urlText={e.urltext}
              />
            ))}
          </div>
          <div>
            <ProductSlider data={FRID} />
          </div>
          <div>
            <ProductSlider data={FRID} />
          </div>
          <div className="grid grid-cols-4 gap-5">
            {productCardInfo.map((e: any) => (
              <ProductsCard
                key={e.id}
                heading={e.heading}
                image={e.image}
                url={e.url}
                urlText={e.urltext}
              />
            ))}
          </div>
          <div>
            <ProductSlider data={FRID} />
          </div>
          <div>
            <ProductSlider data={FRID} />
          </div>
          <div className="grid grid-cols-4 gap-5">
            {productCardInfo.map((e: any) => (
              <ProductsCard
                key={e.id}
                heading={e.heading}
                image={e.image}
                url={e.url}
                urlText={e.urltext}
              />
            ))}
          </div>
          <div>
            <ProductSlider data={FRID} />
          </div>
          <div>
            <ProductSlider data={FRID} />
          </div>
          <div>
            <ProductSlider data={FRID} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageContent;

"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
    infinite: false,
    speed: 600,
    slidesToShow: 5,
    slidesToScroll: 4,
    swipe: false,
  };

  const slide = (slideOffset: number) => {
    if (ref.current) {
      ref.current.scrollLeft += slideOffset;
    }
  };

  return (
    <div className="flex flex-col bg-white p-5 mx-5">
      <div className="font-bold text-xl mb-2">{header}</div>
      <div className="flex items-center w-full">
        <div
          className="flex items-center justify-center  rounded bg-white shadow-left w-14 h-24 cursor-pointer"
          onClick={prevImg}
        >
          <GoChevronLeft color="#555" size={45} />
        </div>
        {/* <div
          ref={ref}
          className="flex items-center w-full h-[206px] scroll overflow-x-scroll scroll-smooth"
        >
          <Slider {...settings} ref={sliderRef}>
            {sliderArray.map((e: any) => (
              <Link href={"#"} key={e.id} className="min-w-[300p">
                <img src={e.image} className="object-contain block" alt={""} />
              </Link>
            ))}
          </Slider>
        </div> */}
        <div className="flex items-center justify-center">
          <div className="w-[1155px] h-full fle items-center justify-center scrol">
            <Slider {...settings} ref={sliderRef}>
              {sliderArray.map((e) => (
                <Link
                  key={e.id}
                  href={"#"}
                  className="flex items-center justify-center"
                >
                  <img
                    src={e.image}
                    className="bg-green-400"
                    alt={`image ${e.id}`}
                  />
                </Link>
              ))}
            </Slider>
          </div>
        </div>
        <div
          className="flex items-center justify-center bg-white shadow-right w-14 h-24 cursor-pointer"
          onClick={nextImg}
        >
          <GoChevronRight color="#555" size={45} />
        </div>
      </div>
    </div>
  );
}

export default ProductSlider;

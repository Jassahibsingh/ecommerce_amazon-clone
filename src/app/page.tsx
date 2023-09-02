"use client";
import React, { useState } from "react";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import ProductsCard from "./productsCard";
import prodCards from "./productCards.json";
import ProductSlider from "./productSlider";
import FRID from "./productSlider.json";

function Page() {
  const [imgNo, setImgNo] = useState(1);

  const nextImg = () => {
    if (imgNo >= 6) {
      setImgNo(1);
    } else {
      setImgNo(imgNo + 1);
    }
  };
  const prevImg = () => {
    if (imgNo <= 1) {
      setImgNo(6);
    } else {
      setImgNo(imgNo - 1);
    }
  };

  return (
    <div className="flex flex-col items-center select-none">
      <img
        src={`/carousel/${imgNo}.jpg`}
        alt="Carousel"
        className="absolute z-0 h-[600px]"
      />
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
            {prodCards.map((e: any) => (
              <ProductsCard
                key={e}
                title={e.title}
                image={e.image}
                link={e.linkUrl}
                linkText={e.linkText}
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
            {prodCards.splice(0, 4).map((e: any) => (
              <ProductsCard
                key={e}
                title={e.title}
                image={e.image}
                link={e.linkUrl}
                linkText={e.linkText}
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
            {prodCards.splice(0, 4).map((e: any) => (
              <ProductsCard
                key={e}
                title={e.title}
                image={e.image}
                link={e.linkUrl}
                linkText={e.linkText}
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

export default Page;

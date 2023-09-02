import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import "./scrollbar.css";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

interface Image {
  src: string;
  alt: string;
  url: string;
}

interface SliderData {
  data: {
    title: string;
    images: Image[];
  };
}

function ProductSlider(slideData: SliderData) {
  const ref = useRef<HTMLDivElement | null>(null);

  const slide = (slideOffset: number) => {
    if (ref.current) {
      ref.current.scrollLeft += slideOffset;
    }
    console.log(slideData);
  };

  return (
    <div className="flex flex-col bg-white p-5 mx-5">
      <div className="font-bold text-xl mb-2">{slideData.data.title}</div>
      <div className="flex items-center w-full">
        <div
          className="flex items-center justify-center z-10 rounded bg-white shadow-left w-14 h-24 cursor-pointer"
          onClick={() => slide(-1000)}
        >
          <GoChevronLeft color="#555" size={45} />
        </div>
        <div
          ref={ref}
          className="flex items-center w-[1155px] h-[206px] scroll overflow-x-scroll scroll-smooth"
        >
          {slideData.data.images.map((e, id) => (
            <Link key={id} href={e.url} className="min-w-[300px]">
              <Image
                src={e.src}
                width={600}
                height={1800}
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

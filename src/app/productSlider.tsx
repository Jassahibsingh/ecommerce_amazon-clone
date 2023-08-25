import React from "react";
import Link from "next/link";
import Image from "next/image";
import prodSlide from "./productSlider.json";
import "./scrollbar.css";

function productSlider() {
  return (
    <div className=" bg-white p-5 mt-5 mx-5">
      <div className="font-bold text-xl mb-2">{prodSlide.title}</div>
      <div className="flex items-center scroll overflow-x-scroll">
        {prodSlide.images.map((e, id) => (
          <Link key={id} href={e.url}>
            <Image
              src={e.src}
              width={300}
              height={800}
              className="object-contain"
              alt={""}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default productSlider;

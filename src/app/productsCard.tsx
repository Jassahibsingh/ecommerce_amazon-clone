import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface cardInfo {
  heading: string;
  image: string;
  url: string;
  urlText: string;
  category: string;
}

function ProductsCard({ heading, image, url, urlText, category }: cardInfo) {
  const Router = useRouter();
  return (
    <div className="w-[19.5rem] h-[26rem] bg-white p-5 overflow-hidden">
      <div className="font-bold text-xl">{heading}</div>
      <div
        className={`mt-3 w-full ${
          heading.length < 25 ? "h-[19rem] mb-3" : "h-[17rem] mb-4"
        } object-cover`}
      >
        <img
          src={image}
          className={`object-cover ${
            heading.length < 25 ? "h-[305px]" : "h-[278px]"
          }`}
        />
      </div>
      <div className="pb-4 text-xs font-medium">
        <span
          onClick={() => Router.push(`/search?category=${category}`)}
          className="text-[#007185] hover:text-orange-400"
        >
          {urlText}
        </span>
      </div>
    </div>
  );
}

export default ProductsCard;

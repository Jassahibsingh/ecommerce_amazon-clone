import Link from "next/link";
import React from "react";

interface cardInfo {
  title: string;
  image: string;
  link: string;
  linkText: string;
}

function ProductsCard({ title, image, link, linkText }: cardInfo) {
  return (
    <div className="w-[19.5rem] h-[25.1rem] bg-white p-5">
      <div className="font-bold text-xl">{title}</div>
      <div className="mt-3 mb-4 w-full h-[18rem] bg-red-300 object-contain">
        <img src={image} className="object-contain" />
      </div>
      <div className="pb-4 text-xs font-medium">
        <Link href={link} className="text-[#007185] hover:text-orange-400">
          {linkText}
        </Link>
      </div>
    </div>
  );
}

export default ProductsCard;

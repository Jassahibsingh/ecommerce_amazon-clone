"use client";
import React, { useEffect, useRef, useState } from "react";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import ProductsCard from "./productsCard";
import ProductSlider from "./productSlider";
import SidebarMenu from "./sidebarMenu";
import { supabase } from "@/supabase/supabase";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";

interface productCardsArray {
  id: number;
  image: string;
  heading: string;
  url: string;
  urltext: string;
}

interface SliderArray {
  id: number;
  image: string;
}

function PageContent() {
  const [carouselImg, setCarouselImg] = useState<any[]>([]);
  const [productCardInfo, setProductCardInfo] = useState<productCardsArray[]>(
    []
  );
  const [productCard2Info, setProductCard2Info] = useState<productCardsArray[]>(
    []
  );
  const [productCard3Info, setProductCard3Info] = useState<productCardsArray[]>(
    []
  );
  const [sliderImages, setSliderImages] = useState<SliderArray[]>([]);
  const [movieSlider, setMovieSlider] = useState<SliderArray[]>([]);
  const [bookSlider, setBookSlider] = useState<SliderArray[]>([]);
  const [toySlider, setToySlider] = useState<SliderArray[]>([]);
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
      console.log(error);
    }
  }

  async function getproductCardInfo() {
    try {
      const { data, error } = await supabase.from("cards").select("*");
      if (data) {
        setProductCardInfo(data);
      } else {
        return error;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getproductCard2Info() {
    try {
      const { data, error } = await supabase.from("cards2").select("*");
      if (data) {
        setProductCard2Info(data);
      } else {
        return error;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getproductCard3Info() {
    try {
      const { data, error } = await supabase.from("cards3").select("*");
      if (data) {
        setProductCard3Info(data);
      } else {
        return error;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getSliderImages() {
    try {
      const { data, error } = await supabase.from("product_slider").select("*");
      if (data) {
        setSliderImages(data);
      }
      if (error) throw error;
    } catch (error) {
      console.log("err", error);
    }
  }

  async function getMovieSlider() {
    try {
      const { data, error } = await supabase.from("movie_slider").select("*");
      if (data) {
        setMovieSlider(data);
      }
      if (error) throw error;
    } catch (error) {
      console.log("err", error);
    }
  }

  async function getBookSlider() {
    try {
      const { data, error } = await supabase.from("book_slider").select("*");
      if (data) {
        setBookSlider(data);
      }
      if (error) throw error;
    } catch (error) {
      console.log("err", error);
    }
  }

  async function getToySlider() {
    try {
      const { data, error } = await supabase.from("toy_slider").select("*");
      if (data) {
        console.log("toys images", data);
        setToySlider(data);
      }
      if (error) throw error;
    } catch (error) {
      console.log("err", error);
    }
  }

  useEffect(() => {
    getCarouselImages();
    getproductCardInfo();
    getproductCard2Info();
    getproductCard3Info();
    getSliderImages();
    getMovieSlider();
    getBookSlider();
    getToySlider();
  }, []);

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
            <ProductSlider
              header={"Frequently repurchased in Supplies"}
              sliderArray={sliderImages}
            />
          </div>
          <div>
            <ProductSlider
              header="Most wished for in Movies & TV"
              sliderArray={movieSlider}
            />
          </div>
          <div className="grid grid-cols-4 gap-5">
            {productCard2Info.map((e: any) => (
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
            <ProductSlider
              header="Best Sellers in Books"
              sliderArray={bookSlider}
            />
          </div>
          <div className="grid grid-cols-4 gap-5">
            {productCard3Info.map((e: any) => (
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
            <ProductSlider
              header="Best Sellers in Toys & Games"
              sliderArray={toySlider}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageContent;

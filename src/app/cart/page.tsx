"use client";
import { Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../header";
import Footer from "../footer";
import Link from "next/link";
import { supabase } from "@/supabase/supabase";
import { useRouter } from "next/navigation";

interface ProductArray {
  productid: number;
  productimage: string;
  rating: number;
  price: number;
  about: string;
  instock: boolean;
  heading: string;
  quantity: number;
}

interface ProductData {
  productID: string;
  quantity: number;
}

function Cart() {
  const Router = useRouter();
  const [userCartData, setUserCartData] = useState<ProductArray[]>([]);
  const [totalPrice, setTotalPrice] = useState<string>();
  const [isLoading, setLoading] = useState<boolean>(true);

  async function cartDataFetch() {
    try {
      const { data: cartData, error: Error } = await supabase
        .from("user_cart")
        .select("products")
        .eq("users", sessionStorage.getItem("userEmail"));

      if (cartData && cartData[0]?.products) {
        let totalPrice = 0;
        const productPromises = cartData[0].products.map(
          async (product: ProductData) => {
            const { data: productData, error: ProductError } = await supabase
              .from("products")
              .select("*")
              .eq("productid", product.productID);

            if (ProductError) {
              console.log("Error while fetching products data", ProductError);
            }

            if (productData && productData.length > 0) {
              productData[0]["quantity"] = product.quantity;
              totalPrice += productData[0].price * product.quantity;
              return productData[0];
            }
          }
        );

        const productsArray = await Promise.all(productPromises);

        setUserCartData(productsArray);
        setTotalPrice(totalPrice.toFixed(2));
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching cart data", error);
      setLoading(false);
    }
  }

  async function deleteFromCart(productID: number) {
    const updatedCartData = userCartData.filter(
      (item) => item.productid !== productID
    );
    setUserCartData(updatedCartData);
    let totalPrice = 0;

    if (updatedCartData && updatedCartData.length > 0) {
      updatedCartData.map(
        (product: ProductArray) =>
          (totalPrice += product.quantity * product.price)
      );
    }
    setTotalPrice(totalPrice.toFixed(2));

    const updatedProducts: ProductData[] = updatedCartData.map((product) => ({
      productID: String(product.productid),
      quantity: product.quantity || 0,
    }));

    const { data, error } = await supabase.from("user_cart").upsert([
      {
        users: sessionStorage.getItem("userEmail") || "",
        products: updatedProducts,
      },
    ]);

    if (error) {
      console.log("Error while adding to cart", error);
    } else {
      console.log("Cart Data updated successfully", data);
    }
  }

  useEffect(() => {
    if (!sessionStorage.getItem("userName")) {
      Router.push("/login");
    }
    cartDataFetch();
    console.log(userCartData);
  }, []);

  return (
    <div className="flex flex-col bg-gray-100 min-h-screen">
      <Header />
      {isLoading ? (
        <div className="flex items-center justify-center w-full p-56">
          <img src="/loader-big.gif" />
        </div>
      ) : (
        <div className="flex">
          <div className="flex flex-col w-full bg-white py-3 px-4 m-3">
            <h1 className="text-[28px] font-medium">
              {userCartData.length <= 0
                ? "Your Amazon Cart is empty."
                : "Shopping Cart"}
            </h1>
            <span className="my-3">
              <Divider />
            </span>
            <div>
              {userCartData.length <= 0 ? (
                <div className="flex flex-col mb-3">
                  Your Shopping Cart lives to serve. Give it purpose — fill it
                  with groceries, clothing, household supplies, electronics, and
                  more. Continue shopping on the Amazon.com homepage, learn
                  about today&apos;s deals, or visit your Wish List.
                </div>
              ) : (
                <div className="flex flex-col mb-3">
                  {userCartData.map((product: ProductArray, id: number) => (
                    <div className="flex mb-10" key={id}>
                      <img
                        className="w-[150px] mx-5"
                        src={product.productimage}
                        alt=""
                      />
                      <div className="flex flex-col w-full text-[18px] space-y-1">
                        <span className="w-full flex justify-between">
                          <p>
                            {product.heading.length > 140
                              ? product.heading.substring(0, 140) + "..."
                              : product.heading}
                          </p>
                          <p className="font-bold ml-10">${product.price}</p>
                        </span>
                        <p className="text-[12px]">{product.instock}</p>
                        <p className="text-[12px]">
                          Gift options not available.
                          <Link
                            className="text-[#007185] hover:text-[#f08804] hover:underline cursor-pointer"
                            href={"#"}
                          >
                            {" "}
                            Learn more
                          </Link>
                        </p>
                        <div className="flex items-center h-10">
                          <select
                            className="w-[70px] border bg-[#F0F2F2] border-[#D5D9D9] hover:bg-[#e9e9e9] text-[13px] focus:ring-cyan-400 focus:ring-opacity-100 rounded-lg my-3 py-[5px] px-[7px] outline-none"
                            style={{
                              boxShadow: "0 2px 5px 0 rgba(213,217,217,.5)",
                            }}
                            name="Country"
                            id=""
                            value={product.quantity}
                          >
                            {Array.from({ length: 30 }, (_, i) => (
                              <option key={i} value={i + 1}>
                                {i + 1}
                              </option>
                            ))}
                          </select>
                          <span className="mx-4 h-[15px]">
                            <Divider orientation="vertical" />
                          </span>
                          <button
                            className="text-[#007185] text-[12px] hover:text-[#f08804] hover:underline cursor-pointer"
                            onClick={() => deleteFromCart(product.productid)}
                          >
                            {" "}
                            Delete
                          </button>
                          <span className="mx-4 h-[15px]">
                            <Divider orientation="vertical" />
                          </span>
                          <Link
                            className="text-[#007185] text-[12px] hover:text-[#f08804] hover:underline cursor-pointer"
                            href={"#"}
                          >
                            {" "}
                            Save for Later
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <span className="my-3">
                <Divider />
              </span>
              <div className="flex w-full justify-end text-[18px] mt-3">
                Subtotal ({userCartData.length} item):{" "}
                <p className="font-bold ml-2"> ${totalPrice}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-[400px]">
            <div className="flex flex-col items-center justify-between h-[110px] bg-white py-3 px-4 m-3">
              <div className="flex w-full justify-start text-[18px]">
                Subtotal ({userCartData.length} item):{" "}
                <p className="font-bold ml-2"> ${totalPrice}</p>
              </div>
              <span
                onClick={() => Router.push("/checkout")}
                className="flex items-center justify-center w-full bg-[#FED914] hover:bg-[#fed050] my-1 p-2 text-[13px] rounded-md cursor-pointer"
              >
                Proceed to checkout
              </span>
            </div>
            <div className="flex items-start justify-between h-[110px] bg-white py-3 px-4 m-3">
              <img src="/prime.svg" className="w-[50px]" alt="" />
              <div className="flex flex-col ml-2">
                <p className="text-[13px] font-bold">
                  Get free and faster delivery with a 30-Day FREE trial
                </p>
                <div
                  style={{ boxShadow: "0 2px 5px 0 rgba(213,217,217,.5)" }}
                  className="flex my-2 px-3 py-1.5 w-[112px] border-[#D5D9D9] bg-white hover:bg-slate-50 text-[13px] border rounded-md cursor-pointer"
                >
                  Start free trial
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Cart;

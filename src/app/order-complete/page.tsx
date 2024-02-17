"use client";
import React, { useEffect, useState } from "react";
import Header from "../header";
import Footer from "../footer";
import { Divider } from "@mui/material";
import { BsCheckCircleFill, BsChevronRight } from "react-icons/bs";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/supabase/supabase";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import productSlice, { setProductData } from "@/redux/productSlice";

interface ProductArray {
  productid: number;
  productimage: string;
  rating: number;
  price: number;
  about: string;
  instock: boolean;
  heading: string;
  quantity?: number;
}

interface ProductData {
  productID: string;
  quantity: number;
}

interface UserData {
  address: String;
  city: String;
  country: String;
  phone_number: String;
  state: String;
  user_email: String;
  user_name: String;
  zipcode: number;
}

function OrderSuccessPage() {
  const dispatch = useDispatch();
  const Router = useRouter();
  const stripe = useStripe();
  const searchParams = useSearchParams();
  const orderID = searchParams?.get("order_id");

  const [userOrderData, setUserOrderData] = useState<ProductArray[]>([]);
  const [userData, setUserData] = useState<UserData[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  const productDataList = useSelector((state: RootState) => state.product);

  function formatDateWithOffset(offsetDays: number): string {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const currentDate = new Date();
    const targetDate = new Date(currentDate);
    targetDate.setDate(currentDate.getDate() + offsetDays);

    const dayOfWeek = days[targetDate.getDay()];
    const month = months[targetDate.getMonth()];
    const date = targetDate.getDate();

    return `${dayOfWeek}, ${date} ${month}`;
  }

  async function updateData() {
    try {
      const { data: usersData } = await supabase
        .from("users")
        .select("*")
        .eq("user_email", sessionStorage.getItem("userEmail"));

      if (usersData) {
        setUserData(usersData);
      }

      const { data: orderData, error: Error } = await supabase
        .from("order_history")
        .select("products")
        .eq("order_id", orderID);

      if (orderData && orderData[0]?.products) {
        const productPromises = orderData[0].products.map(
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
              return productData[0];
            }
          }
        );

        const productsArray = await Promise.all(productPromises);

        setUserOrderData(productsArray);
      } else {
        setUserOrderData(productDataList);

        let updatedProducts: ProductData[] = [];
        let totalPrice = 0;

        productDataList.forEach((product) => {
          const updatedProduct: ProductData = {
            productID: String(product.productid),
            quantity: product.quantity || 0,
          };

          updatedProducts.push(updatedProduct);

          totalPrice += product.price * (product.quantity || 0);
        });

        const { data: orderHistory, error: orderHistoryError } = await supabase
          .from("order_history")
          .upsert([
            {
              users: sessionStorage.getItem("userEmail") || "",
              products: updatedProducts,
              order_id: orderID,
              order_total: totalPrice,
              order_completion_date: formatDateWithOffset(0),
              delivery_date: formatDateWithOffset(4),
            },
          ]);

        if (orderHistoryError) {
          console.log("Error while adding to cart", orderHistoryError);
          return;
        } else {
          console.log("Cart Data updated successfully", orderHistory);
          const { data, error } = await supabase
            .from("user_cart")
            .delete()
            .eq("users", sessionStorage.getItem("userEmail") || "");

          if (error) {
            console.error("Error while deleting from user_cart", error);
          } else {
            console.log("Data deleted successfully", data);
          }
        }
      }
    } catch (error) {
      console.error("Error updating data", error);
    }
    dispatch(setProductData([]));
    setLoading(false);
  }

  useEffect(() => {
    if (!sessionStorage.getItem("userName")) {
      Router.push("/login");
    }
    updateData();
  }, []);

  return (
    <div>
      <Header />
      <div className="flex bg-slate-100 m-4">
        <div className="flex flex-col w-full bg-white m-4 pl-4 py-4 overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center w-full p-10">
              <img src="/loader-big.gif" />
            </div>
          ) : (
            <div>
              <h1 className="flex items-center text-[#007600] text-[20px] font-bold my-2">
                <BsCheckCircleFill color="green" size="24" />
                &nbsp; Order placed, thank you!
              </h1>
              <p className="my-2">Confirmation will be sent to your email.</p>
              {userData[0] && (
                <span className="flex mt-2 mb-2">
                  <p className="font-bold text-[15px]">
                    Shipping to {userData[0]?.user_name},
                  </p>
                  &nbsp; {userData[0]?.address}, {userData[0]?.city},{" "}
                  {userData[0]?.state}, {userData[0]?.country},{" "}
                  {userData[0]?.zipcode}
                </span>
              )}
              {userOrderData.map((data: ProductArray, id: number) => (
                <div key={id}>
                  <span className="flex bg-slate-400 w-[700px] pr-4 overflow-hidden">
                    <Divider />
                  </span>
                  <div className="flex mt-4">
                    <span className="flex flex-col text-[15px]">
                      <h4 className="font-bold">{formatDateWithOffset(4)}</h4>
                      Delivery Date
                    </span>
                    <div className="relative ">
                      {data?.quantity && data.quantity > 1 ? (
                        <span className="flex items-center justify-center absolute bottom-3 -right-2 text-[10px] text-slate-600 w-[20px] h-[20px] border border-slate-300 bg-white rounded-xl">
                          {data.quantity}
                        </span>
                      ) : (
                        <></>
                      )}
                      <img
                        className="w-[60px] h-[70px] ml-36 mb-4"
                        src={data.productimage}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Link
                className="flex items-center w-[120px] text-[12px] text-[#007185] hover:text-[#f08804] hover:underline mt-4 cursor-pointer"
                href={"/"}
              >
                {" "}
                Go to Homepage
                <BsChevronRight />
              </Link>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default OrderSuccessPage;

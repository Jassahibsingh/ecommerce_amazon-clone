"use client";
import React, { useState } from "react";
import Link from "next/link";
import { supabase } from "@/supabase/supabase";
import Divider from "@mui/material/Divider";
import countriesList from "../countires.json";
import CheckoutForm from "../components/StripeCheckoutButton";
import { useRouter } from "next/navigation";

function ProfilePage() {
  const Router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
  });
  const [selectedPaymentOption, setSelectedPaymentOption] = useState("card");
  const [showPaymentComponent, setShowPaymentComponent] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase
        .from("users")
        .upsert([{ ...formData }]);

      if (error) {
        console.error("Error saving user data:", error.message);
      } else {
        console.log("User data saved successfully:", data);
        setFormData({
          name: "",
          phoneNumber: "",
          address: "",
          city: "",
          state: "",
          zipcode: "",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleOptionChange = (event: any) => {
    setSelectedPaymentOption(event.target.value);
  };

  const handlePaymentSubmit = () => {
    if (selectedPaymentOption === "card") {
      setShowPaymentComponent(true);
    } else if (selectedPaymentOption === "cod") {
      console.log("Processing pay on delivery...");
    }
  };

  function formatDateWithOffset(offsetDays: number): string {
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

    const month = months[targetDate.getMonth()];
    const date = targetDate.getDate();
    const year = targetDate.getFullYear();

    return `${date} ${month} ${year}`;
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between bg-gray-100 pt-6 pb-2 border border-[#ddd]">
        <img
          className="w-[110px] ml-24 object-contain cursor-pointer"
          src="/amazon-logo-white.png"
          alt="Amazon Logo"
        />
        <h1 className="text-[28px] font-normal">Checkout</h1>
        <img
          className="w-[17px] mr-52 object-contain cursor-pointer"
          src="/lock.png"
          alt="Amazon Logo"
        />
      </div>
      <div className="flex justify-between ml-28 mr-32 mt-2 mb-8">
        <div className="flex flex-col w-[800px] mr-8">
          <div className="">
            <span className="text-[18px] text-[#c45500] font-bold">
              1 &nbsp; Enter a new shipping address
            </span>
            <div className="flex flex-col bg-white rounded-lg border border-[#ddd] p-[20px] my-2">
              <h1 className="text-[22px] font-semibold mb-2">
                Add a new address
              </h1>
              <form onSubmit={handleSubmit}>
                <label className="font-semibold tracking-wider text-[14px] mb-4">
                  Country/Region
                  <select
                    className="flex border bg-[#F0F2F2] border-[#D5D9D9] hover:bg-[#e9e9e9] text-[13px] focus:ring-cyan-400 focus:ring-opacity-100 rounded-lg mt-1 mb-4 mr-2 py-[5px] px-[7px] w-[530px] outline-none"
                    style={{ boxShadow: "0 2px 5px 0 rgba(213,217,217,.5)" }}
                    name="Country"
                    id=""
                    defaultValue={countriesList.countries[76]}
                  >
                    {countriesList.countries.map((name: string, id) => (
                      <option key={id} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="font-semibold tracking-wider text-[14px] mb-4">
                  Full name (First and Last name)
                  <input
                    type="text"
                    className="flex font-normal border border-[#888C8C] focus:ring-cyan-400 focus:ring-opacity-100 rounded py-[4px] px-[7px] mt-1 mb-4 mr-2 w-[530px] outline-none"
                    style={{ boxShadow: "0 1px 2px rgba(15,17,17,.15)" }}
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label className="flex flex-col font-semibold tracking-wider text-[14px] mb-4">
                  Phone Number
                  <input
                    type="tel"
                    className="flex font-normal border border-[#888C8C] focus:ring-cyan-400 focus:ring-opacity-100 rounded py-[4px] px-[7px] mt-1 w-[530px] outline-none"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                  <small className="text-black font-light mt-1">
                    May be used to assist delivery
                  </small>
                </label>
                <label className="font-semibold tracking-wider text-[14px] mb-4">
                  Address
                  <input
                    type="text"
                    className="flex font-normal border border-[#888C8C] focus:ring-cyan-400 focus:ring-opacity-100 rounded py-[4px] px-[7px] mt-1 mb-4 mr-2 w-[530px] outline-none"
                    placeholder="Street address or P.O. Box"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </label>
                <span className="flex">
                  <label className="font-semibold tracking-wider text-[14px] mb-4">
                    City
                    <input
                      type="text"
                      className="flex font-normal border border-[#888C8C] focus:ring-cyan-400 focus:ring-opacity-100 rounded py-[4px] px-[7px] mt-1 mb-4 mr-3 w-[200px] outline-none"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </label>
                  <label className="font-semibold tracking-wider text-[14px] mb-4">
                    State
                    <input
                      type="text"
                      className="flex font-normal border border-[#888C8C] focus:ring-cyan-400 focus:ring-opacity-100 rounded py-[4px] px-[7px] mt-1 mb-4 mr-3 w-[185px] outline-none"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                    />
                  </label>
                  <label className="font-semibold tracking-wider text-[14px] mb-4">
                    ZIP Code
                    <input
                      type="text"
                      className="flex font-normal border border-[#888C8C] focus:ring-cyan-400 focus:ring-opacity-100 rounded py-[4px] px-[7px] mt-1 mb-4 w-[120px] outline-none"
                      pattern="[0-9]{6}"
                      name="zipcode"
                      value={formData.zipcode}
                      onChange={handleChange}
                      required
                    />
                  </label>
                </span>
                <span
                  className="bg-[#FED914] hover:bg-[#fed050] p-2 text-[13px] rounded-md cursor-pointer"
                  style={{ boxShadow: "0 2px 5px 0 rgba(213,217,217,.5)" }}
                >
                  Use this address
                </span>
                {/* <button type="submit">Submit</button> */}
              </form>
            </div>
          </div>
          <span className="mt-2 mb-4">
            <Divider />
          </span>
          <div className="">
            <span className="text-[18px] text-[#c45500] font-bold">
              2 &nbsp; Select a payment method
            </span>
            <div className="flex flex-col bg-white rounded-lg border border-[#ddd] p-[20px] my-2">
              <div
                className={`font-bold py-4 px-4 mb-4 ${
                  selectedPaymentOption === "card"
                    ? `bg-[#FCF4EF] border border-[#FBD9B5] rounded-md`
                    : ``
                }`}
              >
                <label>
                  <input
                    type="radio"
                    value="card"
                    className="mr-4 mb-6"
                    checked={selectedPaymentOption === "card"}
                    onChange={handleOptionChange}
                  />
                  Card
                  <img src="/cards.png" alt="" />
                </label>
              </div>
              <div
                className={`font-bold py-4 px-4 mb-4 ${
                  selectedPaymentOption === "cod"
                    ? `bg-[#FCF4EF] border border-[#FBD9B5] rounded-md`
                    : ``
                }`}
              >
                <label>
                  <input
                    type="radio"
                    value="cod"
                    className="mr-4"
                    checked={selectedPaymentOption === "cod"}
                    onChange={handleOptionChange}
                  />
                  Pay on Delivery
                  <p className="ml-7 text-[14px] font-normal">
                    Cash, UPI and Cards accepted.
                  </p>
                </label>
              </div>
              <span
                className="bg-[#FED914] hover:bg-[#fed050] p-2 text-[13px] w-[180px] rounded-md cursor-pointer"
                style={{ boxShadow: "0 2px 5px 0 rgba(213,217,217,.5)" }}
                onClick={handlePaymentSubmit}
              >
                Use this payment method
              </span>
            </div>
          </div>
          <span className="mt-2 mb-4">
            <Divider />
          </span>
          <div className="">
            <span className="text-[18px] text-[#c45500] font-bold">
              3 &nbsp; Review items and delivery
            </span>
            <div className="flex flex-col bg-white rounded-lg border border-[#ddd] p-[20px] my-2">
              <h1 className="flex font-bold">
                Delivery Date: &nbsp;
                <p className="text-[#007600]">{formatDateWithOffset(4)}</p>
              </h1>
              <span className="text-slate-600 text-[14px]">
                If you order in the next 5 hours 26 minutes(
                <Link
                  className="text-[#007185] hover:text-[#f08804] hover:underline cursor-pointer"
                  href={"#"}
                >
                  Details
                </Link>
                )
              </span>
              <span className="flex text-slate-600 text-[14px]">
                Items dispatched by Amazon &nbsp;
                <img src="/aFulfilled.png" alt="" />
              </span>
              <div className="flex m-4">
                <img src="/uno.jpg" className="w-[80px] mr-4" alt="" />
                <div className="flex flex-col">
                  <h4 className="font-bold text-[14px]">
                    Amul Camel Milk Powder : Pack of 10 Sachets 25gm Each
                  </h4>
                  <span className="flex text-[#CC0C39] text-[14px] my-1 font-bold">
                    $23.99 &nbsp;
                    <img src="/aFulfilled.png" alt="" />
                  </span>
                  <span className="flex items-center">
                    Qty:
                    <select
                      className="w-[50px] border bg-[#F0F2F2] border-[#D5D9D9] hover:bg-[#e9e9e9] text-[13px] focus:ring-cyan-400 focus:ring-opacity-100 rounded-lg py-[5px] px-[7px] outline-none"
                      style={{ boxShadow: "0 2px 5px 0 rgba(213,217,217,.5)" }}
                      name="Quantity"
                      id=""
                      defaultValue={1}
                    >
                      {Array.from({ length: 30 }, (_, i) => (
                        <option key={i} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </span>
                </div>
              </div>
              <span
                className={`bg-[#FED914] hover:bg-[#fed050] p-2 text-[13px] ${
                  selectedPaymentOption === "cod" ? "w-[120px]" : "w-[160px]"
                } rounded-md cursor-pointer`}
                style={{ boxShadow: "0 2px 5px 0 rgba(213,217,217,.5)" }}
                onClick={() => {
                  selectedPaymentOption === "cod"
                    ? Router.push("/cart")
                    : setShowPaymentComponent(true);
                }}
              >
                {selectedPaymentOption === "cod"
                  ? "Place your order"
                  : "Place your order & Pay"}
              </span>
            </div>
          </div>
          {showPaymentComponent ? (
            <div className="flex flex-col bg-white rounded-lg border border-[#ddd] p-[20px] my-2">
              <CheckoutForm />
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="flex top-4 sticky flex-col w-[300px] max-h-[354px] min-h-[354px] bg-white rounded-lg border border-[#ddd] mt-2 mb-[22px]">
          <div className="p-[20px]">
            <span className="flex items-center justify-center w-full bg-[#FED914] hover:bg-[#fed050] my-1 p-2 text-[13px] rounded-md cursor-pointer">
              Use this address
            </span>
            <p className="text-[12px] mb-2">
              Choose a shipping address to continue checking out. You&apos;ll
              still have a chance to review and edit your order before it&apos;s
              final.
            </p>
            <span className="my-8">
              <Divider />
            </span>
            <table className="flex flex-col w-full my-2">
              <thead className="flex text-xl font-bold mb-2">
                <tr>
                  <th className="text-[16px]" colSpan={2}>
                    Order Summary
                  </th>
                </tr>
              </thead>
              <tbody className="text-[12px] w-full">
                <tr className="w-full">
                  <td className="w-[150px]">Items:</td>
                  <td className="flex justify-end w-[100px]">---</td>
                </tr>
                <tr className="">
                  <td className="w-[150px]">Shipping:</td>
                  <td className="flex justify-end w-[100px]">---</td>
                </tr>
                <tr className="">
                  <td className="w-[150px]">Total:</td>
                  <td className="flex justify-end w-[100px]">---</td>
                </tr>
              </tbody>
            </table>
            <span className="my-3">
              <Divider />
            </span>
            <span className="flex justify-between w-full text-[16px] text-[#B12704] font-bold mt-2">
              <p>Order total:</p>
              <p>$10.99</p>
            </span>
          </div>
          <div className="flex w-full bg-gray-200 py-5 px-4">
            <Link
              className="flex items-center text-[12px] text-[#007185] hover:text-[#f08804] hover:underline cursor-pointer"
              href={"#"}
            >
              {" "}
              How are shipping costs calculated?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;

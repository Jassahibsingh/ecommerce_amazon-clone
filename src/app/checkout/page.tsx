"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/supabase/supabase";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import Divider from "@mui/material/Divider";
import countriesList from "../countires.json";
import CheckoutForm from "../components/StripeCheckoutModal";

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

function CheckoutPage() {
  const Router = useRouter();
  const orderID = uuidv4();
  const [userCartData, setUserCartData] = useState<ProductArray[]>([]);
  const [totalPrice, setTotalPrice] = useState<string>();
  const [totalQty, setTotalQty] = useState<number>();
  const [visibleSection, setVisibleSection] = useState("address");
  const [formData, setFormData] = useState({
    user_email: sessionStorage.getItem("userEmail"),
    user_name: "",
    phone_number: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    country: countriesList.countries[76],
  });
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedPaymentOption, setSelectedPaymentOption] = useState("card");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [buttonText, setButtonText] = useState("Use this address");
  const [orderDesc, setOrderDesc] = useState(
    " Choose a shipping address to continue checking out. You'll still have a chance to review and edit your order before it's final."
  );

  const handleSubmit = async () => {
    const isAnyFieldEmpty = Object.values(formData).some(
      (value) => value === ""
    );

    if (isAnyFieldEmpty) {
      setErrorMessage("Please fill in all the fields");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("users")
        .upsert([{ ...formData }]);
      setLoading(true);
      if (error) {
        console.error("Error saving user data:", error.message);
        setLoading(false);
      } else {
        console.log("User data saved successfully:", data);
        setFormData({
          user_email: "",
          user_name: "",
          phone_number: "",
          address: "",
          city: "",
          state: "",
          zipcode: "",
          country: "",
        });
        handleVisibleSection("paymentMethod");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  function handleVisibleSection(section: string) {
    setVisibleSection(section);
    if (section === "paymentMethod") {
      setButtonText("Use this payment method");
      setOrderDesc(
        "Choose a payment method to continue checking out. You will still have a chance to review and edit your order before it is final."
      );
    }
    if (section === "placeOrder") {
      selectedPaymentOption === "cod"
        ? setButtonText("Place your order")
        : setButtonText("Place your order & Pay");
      setOrderDesc(
        "By placing your order, you agree to Amazon's privacy notice and conditions of use."
      );
    }
  }

  const handleOptionChange = (event: any) => {
    setSelectedPaymentOption(event.target.value);
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

  async function cartDataFetch() {
    try {
      const { data: cartData, error: Error } = await supabase
        .from("user_cart")
        .select("products")
        .eq("users", sessionStorage.getItem("userEmail"));

      if (cartData && cartData[0]?.products) {
        let totalPrice = 0,
          totalQty = 0;
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
              totalQty += product.quantity;
              return productData[0];
            }
          }
        );

        const productsArray = await Promise.all(productPromises);

        setUserCartData(productsArray);
        setTotalPrice(totalPrice.toFixed(2));
        setTotalQty(totalQty);
      }
    } catch (error) {
      console.error("Error fetching cart data", error);
    }
  }

  async function placeOrder() {
    const updatedProducts: ProductData[] = userCartData.map((product) => ({
      productID: String(product.productid),
      quantity: product.quantity || 0,
    }));

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
    }

    const { data, error } = await supabase
      .from("user_cart")
      .delete()
      .eq("users", sessionStorage.getItem("userEmail") || "");

    if (error) {
      console.error("Error while deleting from user_cart", error);
    } else {
      console.log("Data deleted successfully", data);
      Router.push(`/order-complete?order_id=${orderID}`);
    }
  }

  useEffect(() => {
    if (!sessionStorage.getItem("userName")) {
      Router.push("/login");
    }
    cartDataFetch();
  }, []);

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
            <span
              className={`text-[18px] ${
                visibleSection === "address"
                  ? "text-[#c45500]"
                  : "text-[#575958]"
              } font-bold`}
            >
              1 &nbsp; Enter a new shipping address
            </span>
            {visibleSection === "address" ? (
              <div className="flex flex-col bg-white rounded-lg border border-[#ddd] p-[20px] my-2">
                <h1 className="text-[22px] font-semibold mb-2">
                  Add a new address
                </h1>
                <form id="userData">
                  <label className="font-semibold tracking-wider text-[14px] mb-4">
                    Country/Region
                    <select
                      className="flex border bg-[#F0F2F2] border-[#D5D9D9] hover:bg-[#e9e9e9] text-[13px] focus:ring-cyan-400 focus:ring-opacity-100 rounded-lg mt-1 mb-4 mr-2 py-[5px] px-[7px] w-[530px] outline-none"
                      style={{ boxShadow: "0 2px 5px 0 rgba(213,217,217,.5)" }}
                      name="Country"
                      id=""
                      value={formData.country}
                      onChange={(e) =>
                        setFormData({ ...formData, country: e.target.value })
                      }
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
                      value={formData.user_name}
                      onChange={(e) =>
                        setFormData({ ...formData, user_name: e.target.value })
                      }
                      required
                    />
                  </label>
                  <label className="flex flex-col font-semibold tracking-wider text-[14px] mb-4">
                    Phone Number
                    <input
                      type="tel"
                      className="flex font-normal border border-[#888C8C] focus:ring-cyan-400 focus:ring-opacity-100 rounded py-[4px] px-[7px] mt-1 w-[530px] outline-none"
                      name="phoneNumber"
                      value={formData.phone_number}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phone_number: e.target.value,
                        })
                      }
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
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
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
                        onChange={(e) =>
                          setFormData({ ...formData, city: e.target.value })
                        }
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
                        onChange={(e) =>
                          setFormData({ ...formData, state: e.target.value })
                        }
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
                        onChange={(e) =>
                          setFormData({ ...formData, zipcode: e.target.value })
                        }
                        required
                      />
                    </label>
                  </span>
                  {!isLoading ? (
                    <div className="flex items-center">
                      <button
                        className="bg-[#FED914] hover:bg-[#fed050] p-2 text-[13px] rounded-md cursor-pointer"
                        style={{
                          boxShadow: "0 2px 5px 0 rgba(213,217,217,.5)",
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          handleSubmit();
                        }}
                        type="submit"
                      >
                        Use this address
                      </button>
                      <span className="flex justify-center ml-[100px] text-[#DF1B41] font-bold">
                        {errorMessage}
                      </span>
                    </div>
                  ) : (
                    <span className="flex ml-[20px]">
                      <img src="/loader-big.gif" className="w-[40px]" alt="" />
                    </span>
                  )}
                </form>
              </div>
            ) : (
              <></>
            )}
          </div>
          <span className="mt-2 mb-4">
            <Divider />
          </span>
          <div className="">
            <span
              className={`text-[18px] ${
                visibleSection === "paymentMethod"
                  ? "text-[#c45500]"
                  : "text-[#575958]"
              } font-bold`}
            >
              2 &nbsp; Select a payment method
            </span>
            {visibleSection === "paymentMethod" ? (
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
                  onClick={() => handleVisibleSection("placeOrder")}
                >
                  Use this payment method
                </span>
              </div>
            ) : (
              <></>
            )}
          </div>
          <span className="mt-2 mb-4">
            <Divider />
          </span>
          <div className="">
            <span
              className={`text-[18px] ${
                visibleSection === "placeOrder"
                  ? "text-[#c45500]"
                  : "text-[#575958]"
              } font-bold`}
            >
              3 &nbsp; Review items and delivery
            </span>
            {visibleSection === "placeOrder" ? (
              <div className="flex flex-col bg-white rounded-lg border border-[#ddd] p-[20px] my-2">
                <h1 className="flex font-bold">
                  Delivery Date: &nbsp;
                  <p className="text-[#007600]">{formatDateWithOffset(4)}</p>
                </h1>
                <span className="text-slate-600 text-[14px]">
                  If you place order in the next 5 hours 26 minutes(
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
                {userCartData.map((product: ProductArray, id: number) => (
                  <div key={id} className="flex m-4 space-y-1">
                    <img
                      src={product.productimage}
                      className="w-[80px] mr-4"
                      alt=""
                    />
                    <div className="flex flex-col">
                      <h4 className="font-bold text-[14px]">
                        {product.heading.length > 140
                          ? product.heading.substring(0, 140) + "..."
                          : product.heading}
                      </h4>
                      <span className="flex text-[#CC0C39] text-[14px] my-1 font-bold">
                        ${product.price} &nbsp;
                        <img src="/aFulfilled.png" alt="" />
                      </span>
                      <span className="flex items-center">
                        Qty:
                        <select
                          className="w-[55px] border bg-[#F0F2F2] border-[#D5D9D9] hover:bg-[#e9e9e9] text-[13px] focus:ring-cyan-400 focus:ring-opacity-100 rounded-lg py-[5px] px-[7px] outline-none"
                          style={{
                            boxShadow: "0 2px 5px 0 rgba(213,217,217,.5)",
                          }}
                          name="Quantity"
                          id=""
                          defaultValue={1}
                          value={product.quantity}
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
                ))}
                <span
                  className={`bg-[#FED914] hover:bg-[#fed050] p-2 text-[13px] ${
                    selectedPaymentOption === "cod" ? "w-[120px]" : "w-[160px]"
                  } rounded-md cursor-pointer`}
                  style={{ boxShadow: "0 2px 5px 0 rgba(213,217,217,.5)" }}
                  onClick={() => {
                    selectedPaymentOption === "cod"
                      ? placeOrder()
                      : setShowPaymentModal(true);
                  }}
                >
                  {selectedPaymentOption === "cod"
                    ? "Place your order"
                    : "Place your order & Pay"}
                </span>
              </div>
            ) : (
              <></>
            )}
          </div>
          <CheckoutForm
            showPaymentModal={showPaymentModal}
            setShowPaymentModal={setShowPaymentModal}
          />
        </div>
        <div className="flex top-4 sticky flex-col w-[300px] max-h-[354px] min-h-[354px] bg-white rounded-lg border border-[#ddd] mt-2 mb-[22px]">
          <div className="p-[20px]">
            <span
              onClick={() => {
                if (visibleSection === "address") {
                  handleSubmit();
                }

                if (visibleSection === "paymentMethod") {
                  selectedPaymentOption === "cod"
                    ? setButtonText("Place your order")
                    : setButtonText("Place your order & Pay");
                  setVisibleSection("placeOrder");
                }

                if (visibleSection === "placeOrder") {
                  selectedPaymentOption === "cod"
                    ? placeOrder()
                    : setShowPaymentModal(true);
                }
              }}
              className="flex items-center justify-center w-full bg-[#FED914] hover:bg-[#fed050] my-1 p-2 text-[13px] rounded-md cursor-pointer"
            >
              {buttonText}
            </span>
            <p className="text-[12px] mb-2">{orderDesc}</p>
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
                  <td className="flex justify-end w-[100px]">{totalQty}</td>
                </tr>
                <tr className="">
                  <td className="w-[150px]">Shipping:</td>
                  <td className="flex justify-end w-[100px]">---</td>
                </tr>
                <tr className="">
                  <td className="w-[150px]">Total:</td>
                  <td className="flex justify-end w-[100px]">{totalPrice}</td>
                </tr>
              </tbody>
            </table>
            <span className="my-3">
              <Divider />
            </span>
            <span className="flex justify-between w-full text-[16px] text-[#B12704] font-bold mt-2">
              <p>Order total:</p>
              <p>${totalPrice}</p>
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

export default CheckoutPage;

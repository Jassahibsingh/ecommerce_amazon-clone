import React from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { StripePaymentElementOptions } from "@stripe/stripe-js";
import Modal from "react-modal";
import { supabase } from "@/supabase/supabase";

interface CheckoutFormProps {
  orderID: string;
  showPaymentModal: boolean;
}

export default function CheckoutForm({
  orderID,
  showPaymentModal,
}: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = React.useState<string | undefined>("");
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe
      .retrievePaymentIntent(clientSecret)
      .then(async ({ paymentIntent }) => {
        switch (paymentIntent?.status) {
          case "processing":
            setMessage("Your payment is processing.");
            break;
          case "requires_payment_method":
            setMessage("Your payment was not successful, please try again.");
            break;
          case "succeeded":
            const { data, error } = await supabase
              .from("user_cart")
              .delete()
              .eq("users", sessionStorage.getItem("userEmail") || "");

            if (error) {
              console.error("Error while deleting from user_cart", error);
            } else {
              console.log("Data deleted successfully", data);
            }

            setMessage("Payment successful! Order complete.");
        }
      });
  }, [stripe]);

  React.useEffect(() => {
    if (message !== "") {
      setTimeout(() => setMessage(""), 4000);
    }
  }, [message]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `http://localhost:3000/order-complete?order_id=${orderID}`,
      },
    });
    if (error) {
      setIsLoading(false);
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message);
      } else {
        setMessage("An unexpected error occurred.");
      }
    }
    console.log("Payment Confirmation Error:", error);
  };

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: "accordion",
  };

  return (
    <Modal
      isOpen={showPaymentModal}
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          padding: 0,
          backgroundColor: "white",
          width: 400,
          overflow: "hidden",
          borderRadius: 10,
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          zIndex: 50,
        },
      }}
    >
      <form className="h-[360px]" id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        {message && (
          <span className="flex justify-center mt-2 text-[#DF1B41]">
            {message}
          </span>
        )}
        <span className="flex items-center justify-end p-2">
          {stripe && elements ? (
            <button
              className={`flex items-center justify-center ${
                isLoading
                  ? "bg-[#fed] text-slate-500"
                  : "bg-[#FED914] hover:bg-[#fed050] text-black"
              } p-2 mt-2 text-[13px] w-[120px] rounded-md cursor-pointer`}
              style={{ boxShadow: "0 2px 5px 0 rgba(213,217,217,.5)" }}
              disabled={!stripe || !elements || isLoading}
              id="submit"
            >
              Pay now
            </button>
          ) : (
            ""
          )}
        </span>
      </form>
    </Modal>
  );
}

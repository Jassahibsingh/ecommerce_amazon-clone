"use client";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../utils/stripe";

interface Appearance {
  theme?: "flat" | "stripe" | "night" | undefined;
}
interface Options {
  clientSecret: string | undefined;
  appearance: Appearance;
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [clientSecret, setClientSecret] = React.useState();

  React.useEffect(() => {
    fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance: Appearance = {
    theme: "stripe",
  };
  const options: Options = {
    clientSecret,
    appearance,
  };
  return (
    <Provider store={store}>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          {children}
        </Elements>
      )}
    </Provider>
  );
}

import { NextApiRequest, NextApiResponse } from "next";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1400,
    currency: "inr",
    description: "Testing payment for amazon clone",
  });
  const customer = await stripe.customers.create({
    name: "Jenny Rosen",
    address: {
      line1: "510 Townsend St",
      postal_code: "98140",
      city: "San Francisco",
      state: "CA",
      country: "US",
    },
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
}

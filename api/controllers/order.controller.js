import Gig from "../models/gig.model.js";
import Order from "../models/order.model.js";

import Stripe from "stripe";
import createError from "../utils/createError.js";

export const intent = async (req, res, next) => {
  const stripe = new Stripe(process.env.STRIPE_KEY);
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) return next(createError(404, "Gig not found"));
    const paymentIntent = await stripe.paymentIntents.create({
      amount: gig.price * 100,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });
    const newOrder = new Order({
      gigId: gig._id,
      title: gig.title,
      price: gig.price,
      sellerId: gig.userId,
      buyerId: req.userId,
      img: gig.cover,
      payment_intent: paymentIntent.id,
    });

    await newOrder.save();
    res.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    next(err);
  }
};

// export const createOrder = async (req, res, next) => {
//   try {
//     const gig = await Gig.findById(req.params.gigId);
//     const newOrder = new Order({
//       gigId: gig._id,
//       title: gig.title,
//       price: gig.price,
//       sellerId: gig.userId,
//       buyerId: req.userId,
//       img: gig.cover,
//       payment_intent: "temporary",
//     });
//     const savedOrder = await newOrder.save();
//     res.status(201).json(savedOrder);
//   } catch (err) {
//     next(err);
//   }
// };
export const confirm = async (req, res, next) => {
  try {
    const orders = await Order.findOneAndUpdate(
      {
        payment_intent: req.body.payment_intent,
      },
      {
        $set: {
          isCompleted: true,
        },
      }
    );

    res.status(200).send("Order has been confirmed.");
  } catch (err) {
    next(err);
  }
};

export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({
      ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
      isCompleted: true,
    });
    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
};

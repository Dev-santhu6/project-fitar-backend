// paymentRoutes.js
import express from 'express';
import stripe from 'stripe';
import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';
import Transaction from '../models/paymentModel.js';

const router = express.Router();
const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);

router.post("", (req, res) => {
  const { design, token ,info} = req.body;
  const transactionKey = uuidv4();
  const amountInCents = Math.max(design.price * 100, 50);
  stripeClient.customers.create({
    email: token.email,
    source: token.id
  }).then((customer) => {
    stripeClient.charges.create({
      amount: amountInCents ,
      currency: "LKR",
      customer: customer.id,
      receipt_email: token.email,
      
      
    }).then(async (result) => {
      // Save payment information to MongoDB
      console.log(result);
      const payment = new Transaction({
        transactionKey,
        amount: design.price ,
        currency: "LKR",
        user: info._id,
        customer: customer.id,
        receipt_email: token.email,

      });
      console.log( payment );

     

      try {
        await payment.save();
        res.json(result);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Payment failed" });
      }
    }).catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Payment failed" });
    });
  });
});



export default router;
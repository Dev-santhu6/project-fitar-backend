// // controllers/paymentController.js

// import stripePackage from 'stripe';
// const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);// const Payment = require('../models/Payment');
// import Payment from '../models/paymentModel.js';

// const createPayment = async (req, res) => {
//   const { amount, currency, paymentMethodId } = req.body;

//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount,
//       currency,
//       payment_method: paymentMethodId,
//       confirm: true,
//     });

//     const payment = new Payment({
//       amount: paymentIntent.amount,
//       currency: paymentIntent.currency,
//       paymentId: paymentIntent.id,
//       status: paymentIntent.status,
//     });

//     await payment.save();

//     res.status(200).json({ success: true, payment });
//   } catch (err) {
//     res.status(400).json({ success: false, error: err.message });
//   }
// };

// export { createPayment };

import stripePackage from 'stripe';
const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);      // const Payment = require('../models/Payment');
import Payment from '../models/paymentModel.js';

// const createPaymentIntent = async (req, res) => {
//   try {
//     const { amount, currency } = req.body;

//     const paymentIntent = await stripe.paymentIntents.create({
//       amount,
//       currency,
//     });

//     res.json({ clientSecret: paymentIntent.client_secret });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to create payment intent' });
//   }
// };

// const processPayment = async (req, res) => {
//   try {
//     const { paymentMethodId, amount } = req.body;

//     const paymentIntent = await stripe.paymentIntents.create({
//       amount,
//       currency: 'usd',
//       payment_method: paymentMethodId,
//       confirm: true,
//     });

//     const payment = new Payment({
//       amount,
//       currency: 'usd',
//       paymentMethodId,
//     });

//     await payment.save();

//     res.json({ message: 'Payment successful' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Payment failed' });
//   }
// };

// export { createPaymentIntent,processPayment };

// Create a payment
const createPayment = async (req, res) => {
  const { amount, currency, paymentMethodId, userEmail } = req.body;

  try {
    const payment = new Payment({
      amount,
      currency,
      paymentMethodId,
      userEmail,
    });
    await payment.save();
    res.status(201).json(payment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all payments
const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single payment
const getPayment = async (req, res) => {
  const { id } = req.params;

  try {
    const payment = await Payment.findById(id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.json(payment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a payment
const updatePayment = async (req, res) => {
  const { id } = req.params;
  const { amount, currency, paymentMethodId, userEmail } = req.body;

  try {
    const payment = await Payment.findById(id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    payment.amount = amount;
    payment.currency = currency;
    payment.paymentMethodId = paymentMethodId;
    payment.userEmail = userEmail;
    await payment.save();
    res.json(payment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a payment
const deletePayment = async (req, res) => {
  const { id } = req.params;

  try {
    const payment = await Payment.findById(id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    await payment.remove();
    res.json({ message: 'Payment deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { createPayment, getPayments, getPayment, updatePayment, deletePayment };


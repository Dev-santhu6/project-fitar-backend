// models/payment.js
import mongoose from'mongoose';

const emailpaymentSchema = new mongoose.Schema({
  paymentPrice: {
    type: Number,
    required: true
  },
  // Add other fields as needed
});

const emailPayment = mongoose.model('Payment', emailpaymentSchema);
export default emailPayment;
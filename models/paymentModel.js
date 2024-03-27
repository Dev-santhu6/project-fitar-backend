//chatgpt
import mongoose from'mongoose';

const paymentSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: 'lkr',
  },
  paymentMethodId: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;


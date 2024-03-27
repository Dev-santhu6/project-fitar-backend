// routes/paymentRoutes.js

// import express from 'express';
// const router = express.Router();
// import { createPayment } from '../Controllers/paymentController.js';

// router.post('/payments', createPayment);

// export default router;


import express from 'express';
const router = express.Router();
import { createPayment, getPayments, getPayment, updatePayment, deletePayment } from '../Controllers/paymentController.js';


// router.post('/payment-intent', createPaymentIntent);
// router.post('/process-payment', processPayment);

router.post('/', createPayment);
router.get('/', getPayments);
router.get('/:id', getPayment);
router.put('/:id', updatePayment);
router.delete('/:id', deletePayment);

export default router;
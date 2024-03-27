// routes/reviewRoutes.js

import express from 'express';
const router = express.Router();

import {   verifyReview,updateReview,getReviews, postReview, deleteReview } from "../Controllers/reviewController.js";

// Get all reviews
router.get('/getreview', getReviews);
router.get('/verifyreview',  verifyReview);
router.put('/updatereview/:email',  updateReview);


// Create a new review
router.post('/uploadreview', postReview);

// Delete a review
router.delete('/deletereview', deleteReview);

export default router;

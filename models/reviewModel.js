// models/Review.js

import mongoose from "mongoose";


const reviewSchema = mongoose.Schema({
    email: { type: String },
    question1: { type: String },
    question2: { type: String },
    question3: { type: String },
    question4: { type: String },
    rating: { type: Number },
    ispost:{
        type:Boolean,
        default:false
    }
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;
import Review from "../models/reviewModel.js";


// Get all reviews
const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a specific review by email
// const getReviewByEmail = async (req, res) => {
//     const email = req.params.email;
  
//     try {
//       const review = await Review.findOne({ email });
//       if (!review) {
//         return res.status(404).json({ message: 'Review not found' });
//       }
//       res.json(review);
//     console.log("add review");
//     } catch (err) {
//       res.status(500).json({ message: err.message });

//     }
//   };
// const verifyReview = async (req, res) => {
//     const { email } = req.params;
  
//     try {
//       const review = await Review.findOne({ email });
//       if (!review) {
//         return res.status(404).json({ message: 'Review not found' });
//       }
//       review.isPost = true;
//       await review.save();
//       res.status(200).json({ message: 'Review verified successfully' });
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   };
  

  const verifyReview = (async (req, res) => {
    const review = await Review.find({ ispost: true });
    res.json(review);
  });

// Create a new review
// const postReview = async (req, res) => {
//     const review = new Review({
//         email: req.body.email,
//         question1: req.body.question1,
//         question2: req.body.question2,
//         question3: req.body.question3,
//         question4: req.body.question4
//     });

//     try {
//         const newReview = await review.save();
//         res.status(201).json(newReview);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// };
// Create a new review
const postReview = async (req, res) => {
    const review = new Review({
        email: req.body.email,
        question1: req.body.question1,
        question2: req.body.question2,
        question3: req.body.question3,
        question4: req.body.question4,
        rating: req.body.rating ,
        isPost: false,
    });

    try {
        const newReview = await review.save();
        res.status(201).json(newReview);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const updateReview = async (req, res) => {
    const { email } = req.params;
    const { question1, question2, question3, question4, rating, ispost } = req.body;
    try {
      const review = await Review.findOne({ email });
      if (!review) {
        return res.status(404).json({ message: 'Review not found' });
      }
      review.question1 = question1 || review.question1;
      review.question2 = question2 || review.question2;
      review.question3 = question3 || review.question3;
      review.question4 = question4 || review.question4;
      review.rating = rating || review.rating;
      review.ispost = ispost !== undefined ? ispost : review.ispost; // Update ispost if provided
  
      await review.save();
      res.json(review);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
  
// Delete a review
// const deleteReview = async (req, res) => {
//     try {
//         await Review.findByIdAndDelete(req.params.id);
//         res.json({ message: 'Review deleted' });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };
// Delete a review by email
const deleteReview = async (req, res) => {
    const email = req.body.email;

    try {
        const deletedReview = await Review.findOneAndDelete({ email });
        if (deletedReview) {
            res.json({ message: 'Review deleted' });
        } else {
            res.status(404).json({ message: 'Review not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


export {  verifyReview,updateReview ,getReviews, postReview, deleteReview };

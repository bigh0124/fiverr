import Review from "../models/review.model.js";
import Gig from "../models/gig.model.js";
import createError from "../utils/createError.js";

export const createReview = async (req, res, next) => {
  if (req.isSeller) return next(createError(403, "Seller can not create review for own gig"));

  const newReview = new Review({
    ...req.body,
    userId: req.userId,
  });
  try {
    const review = await Review.findOne({ gigId: req.body.gigId, userId: req.userId });
    if (review) return next(createError(403, "You have already created a review for this gig"));
    const savedReview = await newReview.save();
    await Gig.findByIdAndUpdate(req.body.gigId, { $inc: { totalStars: req.body.star, starNumber: 1 } });
    res.status(201).json(savedReview);
  } catch (err) {
    next(err);
  }
};

export const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ gigId: req.params.id });

    res.status(200).json(reviews);
  } catch (err) {
    next(err);
  }
};

export const deleteReview = async (req, res, next) => {
  try {
    const review = Review.findOne({ gigId: req.params.id });
    if (req.userId !== review.userId) return next(createError(403, "You only can delete your own review"));
  } catch (err) {
    next(err);
  }
};

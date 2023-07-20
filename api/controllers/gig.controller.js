import Gig from "../models/gig.model.js";
import createError from "../utils/createError.js";

export const getGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) return next(createError(404, "Gig not found"));
    res.status(200).json(gig);
  } catch (err) {
    next(err);
  }
};

export const getGigs = async (req, res, next) => {
  const q = req.query;
  const filter = {
    ...(q.cat && { cat: { $regex: q.cat, $options: "i" } }),
    ...((q.min || q.max) && { price: { ...(q.min && { $gt: q.min }), ...(q.max && { $lt: q.max }) } }),
    ...(q.search && { title: { $regex: q.search, $options: "i" } }),
    ...(q.userId && { userId: q.userId }),
  };
  try {
    const gigs = await Gig.find(filter).sort({ [q.sort]: -1 });
    res.status(200).json(gigs);
  } catch (err) {
    next(err);
  }
};

export const createGig = async (req, res, next) => {
  if (!req.isSeller) return next(createError(403, "Only seller can create gig"));
  const newgig = new Gig({
    ...req.body,
    userId: req.userId,
  });

  try {
    const savedGig = await newgig.save();
    res.status(201).json(savedGig);
  } catch (err) {
    next(err);
  }
};

export const deleteGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (gig.userId !== req.userId) return next(createError(403, "You can delete only your gig"));
    await Gig.findByIdAndDelete(req.params.id);
    res.status(200).send("Gig has been deleted");
  } catch (err) {
    next(err);
  }
};

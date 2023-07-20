import User from "../models/user.model.js";
import createError from "../utils/createError.js";

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (user._id.toString() !== req.userId) {
      return next(createError(403, "You can't delete this account"));
    }

    await User.findByIdAndDelete(user._id);
    res.status(200).send("Account has been deleted");
  } catch (err) {
    next(err);
  }
};

export const fetchUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(createError(404, "User not found"));

    const { password, ...info } = user._doc;

    res.status(200).json(info);
  } catch (err) {
    next(err);
  }
};

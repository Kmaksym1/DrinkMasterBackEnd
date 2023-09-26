const { HttpError, createEmail, sendEmail } = require("../helpers");
const { User } = require("../models/user");

const getCurrentUser = async (req, res, next) => {
  try {
    const { user } = req;
    res.json({ user });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const updateData = req.body;
    const updatedUser = await User.findByIdAndUpdate(_id, updateData, {
      new: true,
    });

    if (!updatedUser) {
      throw HttpError(404, "User not found");
    }

    res.json({ user: updatedUser });
  } catch (error) {
    next(error);
  }
};

const subscribeEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      throw HttpError(404, "User not found");
    }

    if (user.subscribe) {
      return res.status(400).json({
        message: `Subscriber with the address ${user.email} already exists.`,
      });
    }

    user.subscribe = true;
    await user.save();

    const recipiaet = createEmail(email);
    await sendEmail(recipiaet);

    res.status(200).json({ message: "Subscription success" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCurrentUser,
  updateUser,
  subscribeEmail,
};

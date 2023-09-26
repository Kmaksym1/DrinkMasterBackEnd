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
        message: `Підписник з адресою ${user.email} вже існує`,
      });
    }

    const recipiaet = createEmail(email, user.id);
    await sendEmail(recipiaet);

    res.status(200).json({ message: "Subscription sent to your email" });
  } catch (error) {
    next(error);
  }
};

const updateSubscribeEmail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      throw HttpError(404, "User not found");
    }

    if (user.subscribe) {
      return res.status(400).json({
        message: `Підписник з адресою ${user.email} вже існує`,
      });
    }

    await User.findByIdAndUpdate(id, { subscribe: true }, { new: true });

    res.status(200).json({ message: "Subscription sucsess" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCurrentUser,
  updateUser,
  subscribeEmail,
  updateSubscribeEmail,
};

const { HttpError, createEmail, sendEmail } = require("../helpers");
const { UserModel } = require("../shemas/user");

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
    const { id } = req.params;
    const updateData = req.body;
    const updatedUser = await UserModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!user) {
      throw HttpError(404, "User not found");
    }

    res.json({ user: updatedUser });
  } catch (error) {
    next(error);
  }
};

const subscribeEmail = async (req, res, next) => {
  try {
    // const { verificationToken } = req.params;
    // const user = await UserModel.findOne({ verificationToken });
    const { email } = req.body;
    const user = await UserModel.findOne({ email });

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
    const { user } = req;
    const { _id } = req.user;

    if (!user) {
      throw HttpError(404, "User not found");
    }

    if (user.subscribe) {
      return res.status(400).json({
        message: `Підписник з адресою ${user.email} вже існує`,
      });
    }

    await UserModel.findByIdAndUpdate(_id, { subscribe: true }, { new: true });

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

const { UserModel } = require("../shemas/user");

const getCurrentUser = async (req, res, next) => {
  const { user } = req;

  try {
    res.json({ user });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user: updatedUser });
  } catch (error) {
    next(error);
  }
};

module.exports = { getCurrentUser, updateUser };

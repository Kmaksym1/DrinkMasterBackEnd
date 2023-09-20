const { HttpError, ctrlWrapper } = require("../helpers");
const { User } = require("../shemas/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { updateUsersSubscription, getUserByEmail } = require("../services/user");
require("dotenv").config();
const { SECRET } = process.env;

const renderMainPage = (req, res) => {
  res.render("index");
};
const renderRegisterPage = (req, res) => {
  res.render("register");
};
const renderLoginPage = (req, res) => {
  res.render("login");
};

const registerController = async (req, res) => {
  const { email, password } = req.body;
  const user = await getUserByEmail(email);
  if (user) {
    throw HttpError(409, "Email already in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashPassword });
  res.status(201).json({
    email: newUser.email,
  });
};
const signInController = async (req, res) => {
  const { email, password } = req.body;
  const user = await getUserByEmail(email);

  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw HttpError(401, "Email or password invalide");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
  });
};

const signOutController = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.json({
    message: "SignOut Success",
  });
};
const getCurrent = (req, res) => {
  const { email, subscription } = req.user;
  res.json({ email, subscription });
};

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  if (!["starter", "pro", "business"].includes(subscription)) {
    throw HttpError(404, "Invalid subscription value");
  }
  const result = await updateUsersSubscription(_id, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ result });
};

module.exports = {
  renderMainPage,
  renderLoginPage,
  renderRegisterPage,
  registerController: ctrlWrapper(registerController),
  signInController: ctrlWrapper(signInController),
  signOutController: ctrlWrapper(signOutController),
  getCurrent: ctrlWrapper(getCurrent),
  updateSubscription: ctrlWrapper(updateSubscription),
};

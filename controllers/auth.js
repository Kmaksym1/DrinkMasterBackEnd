const { HttpError, ctrlWrapper } = require("../helpers");
const { User } = require("../shemas/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { SECRET } = process.env;

const signUp = async (req, res) => {
  console.log(req.body);
  // перевірка на унікальність email
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email already in use");
  }

  // хешування паролю
  const hashPassword = await bcrypt.hash(password, 10);

  // додавання нового юзера в базу
  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json(newUser);
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
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

const signOut = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.json({
    message: "Logout success",
  });
};

module.exports = {
  signUp: ctrlWrapper(signUp),
  signIn: ctrlWrapper(signIn),
  signOut: ctrlWrapper(signOut),
};

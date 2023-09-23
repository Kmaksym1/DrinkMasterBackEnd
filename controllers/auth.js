const { HttpError, ctrlWrapper, cloudinary } = require("../helpers");
const { User } = require("../shemas/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const fs = require("fs/promises");
const jimp = require("jimp");

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

  const avatarURL = gravatar.url(email);

  // додавання нового юзера в базу
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });

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

const updateAvatar = async (req, res, next) => {
  const { _id } = req.user;
  const { path: tempUpload } = req.file;
  console.log(tempUpload);

  // зміна розміру аватара
  const passAvatar = await jimp.read(tempUpload);
  await passAvatar
    .autocrop()
    .cover(250, 250, jimp.HORIZONTAL_ALIGN_CENTER, jimp.VERTICAL_ALIGN_MIDDLE);

  await passAvatar.writeAsync(tempUpload);
  //

  const { secure_url: avatarURL, public_id: avatartCloudId } =
    await cloudinary.uploader.upload(tempUpload, {
      folder: "avatars",
    });

  await fs.unlink(tempUpload);

  await User.findByIdAndUpdate(_id, { avatarURL, avatartCloudId });

  res.json({
    avatarURL,
    avatartCloudId,
  });
};

module.exports = {
  signUp: ctrlWrapper(signUp),
  signIn: ctrlWrapper(signIn),
  signOut: ctrlWrapper(signOut),
  updateAvatar: ctrlWrapper(updateAvatar),
};

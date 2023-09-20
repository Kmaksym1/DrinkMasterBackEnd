const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const userRouter = require("./routes/api/user");
const contactsRouter = require("./routes/api/contacts");
const {
  renderMainPage,
  renderRegisterPage,
  registerController,
  renderLoginPage,
} = require("./controllers/auth");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.set("view engine", "ejs");
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", renderMainPage);
app.get("/register", renderRegisterPage);
app.post("/register", registerController);
app.get("/login", renderLoginPage);

app.use("/api/user", userRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found!" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;

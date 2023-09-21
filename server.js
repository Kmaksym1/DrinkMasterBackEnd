const mongoose = require("mongoose");
const app = require("./app");
mongoose.set('strictQuery', true);



require("dotenv").config();

const DB_HOST = process.env.DB_HOST;

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(3000);
  })
  .catch((er) => {
    console.log(er.message);
    process.exit(1);
  });

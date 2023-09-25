const mongoose = require("mongoose");
const app = require("./app");
mongoose.set("strictQuery", true);
const { log } = require("console");

const { DB_HOST } = process.env;
const PORT = process.env.PORT || 3000;

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((er) => {
    console.log(er.message);
    process.exit(1);
  });

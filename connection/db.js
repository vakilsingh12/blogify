const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URL)
  .then((res) => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("Something went wrong!", err);
  });

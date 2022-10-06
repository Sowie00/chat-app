const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use("/api/auth", userRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database Connection Successful!"))
  .catch((err) => {
    console.log(err);
  });

app.listen(process.env.PORT || 8000, () => {
  console.log("Server running on port 8000...");
});

const mongoose = require("mongoose");

const { Schema, model } = mongoose;

require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_KEY, {
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => console.log("Connected"))
  .catch(() => {
    console.log("Connection error");
    process.exit();
  });

const Recipe = new Schema({
  name: String,
  description: String,
  cookingTime: Number,
});

const RecipeModel = model("Recipe", Recipe);

module.exports = {
  RecipeModel,
};

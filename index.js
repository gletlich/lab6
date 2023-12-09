const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { RecipeModel } = require("./database");

app.use(bodyParser.json());

app.post("/recipes", async (req, res) => {
  try {
    const recipe = new RecipeModel(req.body);
    await recipe.save();
    res.status(201).send(recipe);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/recipes", async (req, res) => {
  try {
    const recipes = await RecipeModel.find();
    res.send(recipes);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/recipes/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const recipe = await RecipeModel.findById(id);
    if (!recipe) {
      return res.status(404).send("Recipe not found");
    }
    res.send(recipe);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put("/recipes/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const recipe = await RecipeModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!recipe) {
      return res.status(404).send("Recipe not found");
    }
    res.send(recipe);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.patch("/recipes/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const recipe = await RecipeModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!recipe) {
      return res.status(404).send("Recipe not found");
    }
    res.send(recipe);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.delete("/recipes/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const recipe = await RecipeModel.findByIdAndDelete(id);
    if (!recipe) {
      return res.status(404).send("Recipe not found");
    }
    res.send(recipe);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(3000, () => {
  console.log("Starting the server on port 3000");
});

module.exports = app;

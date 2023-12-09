const chai = require("chai");
const chaiHttp = require("chai-http");
const _ = require("lodash");

const { RecipeModel } = require("./database");

const app = require("./index");
const { recipeOne, recipeTwo } = require("./constants");

const recipeKeys = Object.keys(recipeOne);

chai.use(chaiHttp);
const expect = chai.expect;

describe("Post", () => {
  it("Should create a new recipe", async () => {
    new RecipeModel(recipeOne);

    const res = await chai.request(app).post("/recipes").send(recipeOne);

    expect(res).to.have.status(201);
    expect(_.pick(res.body, recipeKeys)).to.deep.equal(recipeTwo);
  });
});

describe("Get", () => {
  before(async () => {
    const response = await chai.request(app).post("/recipes").send(recipeOne);

    createdRecipe = response.body;
  });

  it("Should get all recipes", async () => {
    const res = await chai.request(app).get("/recipes");

    expect(res.body).to.be.an("array");
    expect(res.body.some((recipe) => recipe._id === createdRecipe._id)).to.be
      .true;
  });

  it("Should get one recipe by id", async () => {
    const res = await chai.request(app).get(`/recipes/${createdRecipe._id}`);

    expect(res.body).to.deep.equal(createdRecipe);
  });
});

describe("Update", () => {
  before(async () => {
    const response = await chai.request(app).post("/recipes").send(recipeOne);

    createdRecipe = response.body;
  });

  it("Should update(patch) recipe by id", async () => {
    const difference = { cookingTime: 110 };

    const res = await chai
      .request(app)
      .patch(`/recipes/${createdRecipe._id}`)
      .send(difference);

    expect(res.body).to.deep.equal({ ...createdRecipe, ...difference });
  });

  it("Should update(put) recipe by id", async () => {
    const res = await chai
      .request(app)
      .put(`/recipes/${createdRecipe._id}`)
      .send(recipeTwo);

    expect(res.body).to.deep.equal({ ...createdRecipe, ...recipeTwo });
  });
});

describe("Delete", () => {
  before(async () => {
    const response = await chai.request(app).post("/recipes").send(recipeOne);

    createdRecipe = response.body;
  });

  it("Should delete recipe by id", async () => {
    const res = await chai.request(app).delete(`/recipes/${createdRecipe._id}`);

    expect(res.body).to.deep.equal(createdRecipe);
  });
});

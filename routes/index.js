const express = require("express");
const api = express.Router();
//const {isAuth} = require('../middlewares')
const {
  userController,
  serieController,
  chapterController,
} = require("../controllers");

const { userSchema } = require("../controllers/schemas");
const { serieSchema } = require("../controllers/schemas");
const { chapterSchema } = require("../controllers/schemas");

api.post("/login", userSchema, userController.signIn);
api.post("/register", userSchema, userController.signUp);
api.post("/favorites", userController.createFavorite);

api.get("/series", serieController.getSeries);
api.post("/series", serieSchema, serieController.createSerie);
api.put("/series/:id", serieSchema, serieController.updateSerie);
api.delete("/series/:id", serieController.deleteSerie);

api.get("/chapters", chapterController.getChapters);
api.post("/chapters", chapterSchema, chapterController.createChapter);
api.put("/chapters/:id", chapterSchema, chapterController.updateChapter);
api.delete("/chapters/:id", chapterController.deleteChapter);

module.exports = api;

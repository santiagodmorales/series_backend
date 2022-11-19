const { userService } = require("../services");
const { validationResult } = require("express-validator");

const signUp = async (req, res) => {
  try {
    const validationResultReq = validationResult(req);
    const hasErrors = !validationResultReq.isEmpty();
    const { email, password } = req.body;

    if (hasErrors) {
      console.log("Errores en peticion");
      return res.status(400).send(validationResultReq);
    }

    const result = await userService
      .signUp(email, password)
      .catch((error) => error);
    res.status(result.status).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const signIn = async (req, res) => {
  try {
    const validationResultReq = validationResult(req);
    const hasErrors = !validationResultReq.isEmpty();
    const { email, password } = req.body;

    if (hasErrors) {
      console.log("Errores en peticion");
      return res.status(400).send(validationResultReq);
    }
    const result = await userService
      .signIn(email, password)
      .catch((error) => error);
    res.status(result.status).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const createFavorite = async (req, res) => {
  const { userId, serieId } = req.query;
  try {
    const result = await userService.createFavorite(userId, serieId);
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send("Error al crear favorito");
  }
};

module.exports = {
  signUp,
  signIn,
  createFavorite,
};

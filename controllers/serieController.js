const { serieService } = require("../services");
const { validationResult } = require("express-validator");

const getSeries = async (req, res) => {
  const { id } = req.query;
  try {
    const series = await serieService.getSeries(id);
    res.status(200).send(series);
  } catch (error) {
    res.status(500).send(error);
  }
};

const createSerie = async (req, res) => {
  try {
    const validationResultReq = validationResult(req);
    const hasErrors = !validationResultReq.isEmpty();
    const { title, description, image, category } = req.body;
    if (hasErrors) {
      console.log("Errores en peticion");
      return res.status(400).send(validationResultReq);
    } else{
    const result = await serieService.createSerie(
      title,
      description,
      image,
      category
    );
    res.status(201).send(result);
  }} catch (error) {
    res.status(500).send("Error al crear serie");
  }
};

const updateSerie = async (req, res) => {
  const { id } = req.params;
  const { title, description, image, category } = req.body;
  try {
    const updatedSerie = await serieService.updateSerie(
      id,
      title,
      description,
      image,
      category
    );
    res
      .status(201)
      .send({ message: "Serie actualizada correctamente ", updatedSerie });
  } catch (error) {
    res.status(500).send("Error al actualizar serie");
  }
};

const deleteSerie = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await serieService.deleteSerie(id);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createSerie,
  getSeries,
  updateSerie,
  deleteSerie,
};

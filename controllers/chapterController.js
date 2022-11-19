const { chapterService } = require("../services");
const { validationResult } = require("express-validator");

const getChapters = async (req, res) => {
  const { serieId } = req.query;
  try {
    const chapters = await chapterService.getChapters(serieId);
    res.status(201).send(chapters);
  } catch (error) {
    res.status(500).send(error);
  }
};
const createChapter = async (req, res) => {
  try {
    const validationResultReq = validationResult(req);
    const hasErrors = !validationResultReq.isEmpty();
    const { title, description, URL, serieId } = req.body;
    if (hasErrors) {
      console.log("Errores en peticion");
      return res.status(400).send(validationResultReq);
    } else {
      const result = await chapterService.createChapter(
        title,
        description,
        URL,
        serieId
      );
      res.status(201).send(result);
    }
  } catch (error) {
    res.status(500).send("Error al crear chapter");
  }
};

const updateChapter = async (req, res) => {
  const { id } = req.params;
  const { title, description, URL } = req.body;
  try {
    const updatedChapter = await chapterService.updateChapter(
      id,
      title,
      description,
      URL
    );
    res
      .status(201)
      .send({ message: "Capitulo actualizado correctamente ", updatedChapter });
  } catch (error) {
    res.status(500).send("Error al actualizar capitulo");
  }
};

const deleteChapter = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedChapter = await chapterService.deleteChapter(id);
    res
      .status(200)
      .send({ message: "Capitulo eliminado correctamente", deletedChapter });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createChapter,
  getChapters,
  updateChapter,
  deleteChapter,
};

const Chapter = require("../models/chapter");
const Serie = require("../models/serie");

const getChapters = (serieId) => {
  return new Promise((resolve, reject) => {
    Chapter.find({ serie: serieId }, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
      console.log(result);
    });
  });
};

const createChapter = async (title, description, URL, serieId) => {
  try {
    const chapterFound = await Chapter.findOne({ title });
    if (chapterFound) {
      return res.status(400).send("Capitulo ya se encuentra registrado");
    }
    const serieFound = await Serie.findById(serieId);
    if (!serieFound) {
      return res.status(400).send("No existe serie correspondiente!");
    }
    const newChapter = new Chapter({
      title,
      description,
      URL,
      serie: serieId,
    });
    serieFound.chapters.push(newChapter._id);
    await serieFound.save();
    return await newChapter.save();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateChapter = (id, title, description, URL) => {
  return new Promise((resolve, reject) => {
    Chapter.findByIdAndUpdate(
      { _id: id },
      { title, description, URL },
      (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      }
    );
  });
};

const deleteChapter = (id) => {
  return new Promise((resolve, reject) => {
    Chapter.findByIdAndRemove(id, (err, result) => {
      if (err) {
        reject(err);
      } else if (!result) {
        reject("Id no existente");
      }
      resolve(result);
    });
  });
};

module.exports = {
  createChapter,
  getChapters,
  updateChapter,
  deleteChapter,
};

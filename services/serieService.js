const Chapter = require("../models/chapter");
const Serie = require("../models/serie");
const User = require("../models/user");

const getSeries = (id) => {
  try {
    return new Promise((resolve, reject) => {
      if (id) {
        Serie.findById(id, (err, result) => {
          if (err) {
            reject(err);
          }
          return resolve(result);
        });
      } else {
        Serie.find(
          {},
          { title: 1, description: 1, image: 1 },
          (err, result) => {
            if (err) {
              reject(err);
            }
            return resolve(result);
          }
        );
      }
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createSerie = async (title, description, image, category) => {
  try {
    const serieFound = await Serie.findOne({ title });
    if (serieFound) {
      return { status: 400, message: "Serie ya se encuentra registrada" };
    } else {
      const newSerie = new Serie({
        title,
        description,
        image,
        category,
      });
      return await newSerie.save();
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateSerie = (id, title, description, image, category) => {
  try {
    return new Promise((resolve, reject) => {
      Serie.findByIdAndUpdate(
        { _id: id },
        { title, description, image, category },
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteSerie = async (id) => {
  try {
    const serie = await Serie.findById(id);
    if (serie) {
      await Chapter.deleteMany({ serie: { $in: id } });
      await Serie.deleteOne({ _id: id });
      return { status: 201, message: "Serie eliminada", serie };
    } else {
      return { status: 400, message: "Id no encontrado" };
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  createSerie,
  getSeries,
  updateSerie,
  deleteSerie,
};

const User = require("../models/user");
const Serie = require("../models/serie");
const authService = require("./authService");

const signUp = (email, password) => {
  return new Promise((resolve, reject) => {
    const newUser = new User({ email, password });
    User.findOne({ email: newUser.email }, (error, user) => {
      if (error) {
        reject({ status: 500, message: "Se produjo un error" });
      }
      if (user) {
        reject({ status: 400, message: "El usuario se encuantra registrado" });
      }
      newUser.save((error) => {
        if (error) {
          reject({
            status: 500,
            message: "Se produjo un error al registrar usuario",
          });
        }
        resolve({ message: "Usiario registrado!", status: 200, token: authService.createToken(newUser) });
      });
    });
  });
};

const signIn = (email, password) => {
  return new Promise((resolve, reject) => {
    User.findOne({ email }, (error, user) => {
      if (error) {
        reject({ status: 500, message: "Se produjo un error" });
      }
      if (!user.comparePasswords(password)) {
        reject({ status: 404, message: "Clave incorrecta" });
      }
      resolve({
        status: 200,
        message: "Te has logueado correctamente",
        token: authService.createToken(user),
      });
    });
  });
};

const createFavorite = async (userId, serieId) => {
  try {
    const serieFound = await Serie.findById(serieId);
    if (!serieFound) {
      return { status: 400, message: "Serie no registrada" };
    }
    const userFound = await User.findById(userId);
    if (!userFound) {
      return { status: 400, message: "Usuario no registrad0" };
    } else {
      userFound.favoriteSeries.push(serieId);
      return await userFound.save();
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  signUp,
  signIn,
  createFavorite,
};

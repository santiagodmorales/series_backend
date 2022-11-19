const { authService } = require("../services");

const isAuth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res
        .status(401)
        .send({ message: "Se produjo un error al valida token" });
    }

    const token = req.headers.authorization.split(" ")[1];
    const response = await authService.decodeToken(token);
    req.user = response;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Error al validar token" });
  }
};

module.exports = isAuth;

const { check } = require('express-validator');

module.exports = [
  check('title')
    .notEmpty()
    .withMessage("Title es requerido")
    .isString()
    .withMessage("Debe ser string"),

  check('description')
    .notEmpty()
    .withMessage("Description es requerido")
    .isString()
    .withMessage("Debe ser string"),

  check('URL')
    .notEmpty()
    .withMessage("URL es requerido")
    .custom(
      (value, { req }) => value.includes("https://")
    )
    .withMessage("Link no valido!"),

  check('serieId')
    .notEmpty()
    .withMessage("serieId es requerido")
];

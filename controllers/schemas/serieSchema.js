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

  check('image')
    .notEmpty()
    .withMessage("Image es requerido")
    .custom(
      (value, { req }) => value.includes("https://") && value.includes(".jpg")
    )
    .withMessage("Link no valido!"),

  check('category')
    .notEmpty()
    .withMessage("Category es requerido")
    .isString()
    .withMessage("Debe ser string")
];

const { check } = require('express-validator');

module.exports = [
    check('email')
    .exists()
    .notEmpty()
    .withMessage('Email es requerido')
    .custom((value, {req}) => value.includes('@') && value.includes(".com"))
    .withMessage('Email no valido!'),

    check('password')
    .exists()
    .notEmpty()
    .withMessage('Password requerida')
]
const {body} = require('express-validator');
const User = require('../models/User');

const validateUser = [
    body("name").notEmpty().withMessage("name tidak boleh kosong"),
    body("gender").notEmpty().withMessage("gender tidak boleh kosong"),
    body("email").notEmpty().withMessage("email tidak boleh kosong").custom((v, x) => {
        const id = x.req.params.id
        console.log(id)
        if (id) {
            return User.findOne({email: v, _id: {$ne: id}}).then((h) => {
                if (h) {
                    return Promise.reject('Email sudah digunakan')
                }
            })
        } else {
            return User.findOne({email: v}).then((h) => {
                console.log(h)
                if (h) {
                    return Promise.reject('Email sudah digunakan')
                }
            })
        }
    }),
];

const validateLogin = [
    body("username").notEmpty().withMessage("username tidak boleh kosong"),
    body("password").notEmpty().withMessage("password tidak boleh kosong")
]

module.exports = {validateUser, validateLogin};
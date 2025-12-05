const Joi = require('joi');

const login = {
    body: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required()
    })
}

const register = {
    body: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required(),
        confirmPassword: Joi.string().required(),
        fullName: Joi.string().required() 
    })
}

module.exports = {
    login,
    register
}
const Joi = require('joi')

const id_user = Joi.number().id()
const name = Joi.string().min(3).max(100)
const username = Joi.string().min(3).max(100)
const password = Joi.string().min(3).max(100)

const storeUserSchema = Joi.object({
    name: name.required(),
    username : username.required(),
    password : password.required(),
})

const updateUserSchema = Joi.object({
    id_user: id_user.required(),
    name: name,
    username : username,
    password : password
})

const getUserSchema = Joi.object({
    id_user: id_user.required()
})

module.exports = {
    storeUserSchema,
    updateUserSchema,
    getUserSchema
}
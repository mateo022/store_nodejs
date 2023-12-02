const express = require('express')
const sql = require('../../db')
const {models} = require('../libs/sequelize')
const service = require('../services/usersService')
const { validatorHandler } = require('../middlewares/validatorHandler')
const { storeUserSchema, getUserSchema, updateUserSchema } = require('../schemas/usersSchema')

const usersRouter = express.Router()

usersRouter.use((req, res, next) =>{
    if(req.user){
        next()
    }
    else{
        console.log(req)
        req.user.returnTo = req.originalUrl;
        res.redirect('/auth/signIn')
    }
})

usersRouter.route('/users').get(
    async(req,res) =>{
    const users = await service.index()
    res.render('admin/users/users', {
        users: users
    });
})

usersRouter.route('/create').get((req, res) => {
    res.render('admin/users/create')
})

usersRouter.route('/store').post(
    //Llamar al middleware de validacion del esquema de creacion
    validatorHandler(storeUserSchema, 'body'),
    async(req, res) => {
    console.log(req.body)
    const user = await service.store( req.body ) //Almacenamos en BD
    res.redirect('/admin/users/users')
})

usersRouter.route('/edit/:id').get(async(req,res) =>{
    //1. Consultar el registro en la base de datos a partir de su ID
    const id_user = req.params.id
    const user = await service.show(id_user)
    //2. Enviar el registro a la plantilla EJS
    res.render('admin/users/edit', {
        user: user
    })
})

usersRouter.route('/update').post(
    //2 Middleware
    validatorHandler(updateUserSchema, 'body'),
    async(req, res) => {
        console.log(req.body)
        //Actualizar en BD
        const user = await service.update (req.body.id_user, req.body)
        //Redireccionar
        res.redirect('/admin/users/users')
})

usersRouter.route('/destroy/:id_user').post(
    validatorHandler(getUserSchema, 'params'),
    async(req, res) => {
    const id_user = req.params.id_user
    const user = await service.destroy(id_user)
    await user.destroy()
    res.redirect('/admin/users/users')
})

usersRouter.route('/:id').get(async(req,res) =>{
    const id_user = req.params.id
    const user = await service.show(id_user)
    console.log(user)
    // res.send(`Buscando la sesión ${req.params.id}`)
    res.json(user) //Deberia renderizar una vista pero en este caso estamos mostrando un json

})

module.exports = usersRouter
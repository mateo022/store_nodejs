const express = require('express')
const sql = require('../../db')
const {models} = require('../libs/sequelize')
const service = require('../services/categoriesService')
const { validatorHandler } = require('../middlewares/validatorHandler')
const { storeCategorySchema, getCategorySchema, updateCategorySchema } = require('../schemas/categoriesSchema')

const categoriesRouter = express.Router()

categoriesRouter.use((req, res, next) =>{
    if(req.user){
        next()
    }
    else{
        console.log(req)
        req.category.returnTo = req.originalUrl;
        res.redirect('/auth/signIn')
    }
})

// async function store( data ){
//     // const response = await sql`
//     // INSERT INTO sessions(session_name, session_description, session_date)
//     // VALUES (${session.session_name}, ${session.session_description}, ${session.session_date});`
//     const category = await models.category.create(data)
//     return category
// }

// async function update( data ){
//     // const response = await sql`
//     // UPDATE sessions SET
//     // session_name =${session.session_name}, 
//     // session_description = ${session.session_description}, 
//     // session_date = ${session.session_date}
//     // WHERE id_session = ${session.id_session};`
//     const category = await models.category.findByPk(data.category_id)
//     category.update(data)
//     return category
// }

categoriesRouter.route('/categories').get(
    async(req,res) =>{
    const categories = await service.index()
    res.render('admin/categories/categories', {
        categories: categories
    });
})

categoriesRouter.route('/create').get((req, res) => {
    res.render('admin/categories/create')
})

categoriesRouter.route('/store').post(
    //Llamar al middleware de validacion del esquema de creacion
    validatorHandler(storeCategorySchema, 'body'),
    async(req, res) => {
        console.log(req.body)
        const category = await service.store( req.body ) //Almacenamos en BD
        res.redirect('/admin/categories/categories')
})

categoriesRouter.route('/edit/:id').get(async(req,res) =>{
    //1. Consultar el registro en la base de datos a partir de su ID
    const category_id = req.params.id
    const category = await service.show(category_id)
    //2. Enviar el registro a la plantilla EJS
    res.render('admin/categories/edit', {
        category: category
    })
})

categoriesRouter.route('/update').post(
    //2 Middleware
    validatorHandler(updateCategorySchema, 'body'),
    async(req, res) => {
        console.log(req.body)
        //Actualizar en BD
        const category = await service.update (req.body.category_id, req.body)
        //Redireccionar
        res.redirect('/admin/categories/categories')
})

categoriesRouter.route('/destroy/:category_id').post(
    validatorHandler(getCategorySchema, 'params'),
    async(req, res) => {
    const category_id = req.params.category_id
    const category = await service.destroy(category_id)
    await category.destroy()
    res.redirect('/admin/categories/categories')
})

categoriesRouter.route('/:id').get(async(req,res) =>{
    const category_id = req.params.id
    const category = await service.show(category_id)
    console.log(user)
    // res.send(`Buscando la sesión ${req.params.id}`)
    res.json(category) //Deberia renderizar una vista pero en este caso estamos mostrando un json

})

module.exports = categoriesRouter
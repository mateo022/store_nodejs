const express = require('express')
const sql = require('../../db.js')
const {models} = require('../libs/sequelize.js')
const service = require('../services/productsService')
const categorieService = require('../services/categoriesService.js')
const { validatorHandler } = require('../middlewares/validatorHandler.js')
const upload = require('../middlewares/uploadMiddleware.js');
const { storeProductSchema, getProductSchema, updateProductSchema } = require('../schemas/productsSchema')
const fs = require('fs');
const multer = require('multer');


const productsRouter = express.Router()

productsRouter.use((req, res, next) =>{
    if(req.user){
        next()
    }
    else{
        console.log(req)
        res.redirect('/auth/signIn')
    }
})

productsRouter.route('/products').get(
    async(req,res) =>{
    const products = await service.index()
    res.render('admin/products/products', {
        products: products
    });
})

productsRouter.route('/create').get(async(req, res) => {
    const categories = await categorieService.index()
    res.render('admin/products/create',{
        categories : categories
    })
})

productsRouter.route('/store').post(
    upload.single('product_image'),
    //Llamar al middleware de validacion del esquema de creacion
    validatorHandler(storeProductSchema, 'body'),
    async(req, res) => {
        console.log(req.body)
        const data = { req, res, ...req.body, product_image: req.file.filename };
        const { product_category } = req.body; // Obtener el ID de la categoría desde req.body
        const product = await service.store( data, product_category ) //Almacena en BD
        res.redirect('/admin/products/products')

})
  

  

productsRouter.route('/edit/:id').get(async(req,res) =>{
    //1. Consultar el registro en la base de datos a partir de su ID
    const product_id = req.params.id
    const product = await service.show(product_id)
    const categories = await categorieService.index()
    //2. Enviar el registro a la plantilla EJS
    res.render('admin/products/edit', {
        product: product,
        categories : categories
    })
})

productsRouter.route('/update').post(
    upload.single('product_image'),
    //2 Middleware
    validatorHandler(updateProductSchema, 'body'),
    async(req, res) => {
        console.log(req.body)
        // Obtener el nombre de archivo de la imagen
        const imageFilename = req.file ? req.file.filename : null;

        // Obtener el ID de la categoría desde req.body
        const { product_category } = req.body;

        //Actualizar en BD
        const product = await service.update(req.body.product_id, req.body, imageFilename, product_category)

        //Redireccionar
        res.redirect('/admin/products/products')
})

productsRouter.route('/destroy/:product_id').post(
    validatorHandler(getProductSchema, 'params'),
    async(req, res) => {
    const product_id = req.params.product_id
    const product = await service.destroy(product_id)
    res.redirect('/admin/products/products')
})

productsRouter.route('/:id').get(async(req,res) =>{
    const product_id = req.params.id
    const product = await service.show(product_id)
    console.log(product)
    // res.send(`Buscando la sesión ${req.params.id}`)
    res.json(product) //Deberia renderizar una vista pero en este caso estamos mostrando un json

})

module.exports = productsRouter;
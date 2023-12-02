const express = require('express')
const sql = require('../../db')
const {models} = require('../libs/sequelize')
const service = require('../services/ordersService')
const productsService = require('../services/productsService.js')
const { validatorHandler } = require('../middlewares/validatorHandler')
const { storeOrderSchema, getOrderSchema, updateOrderSchema } = require('../schemas/ordersSchema')
const fs = require('fs');


const ordersRouter = express.Router()

ordersRouter.use((req, res, next) =>{
    if(req.user){
        next()
        // res.redirect('/indexUsers')
    }
    else{
        console.log(req)
        // req.order.returnTo = req.originalUrl;
        res.redirect('/auth/signUp')
    }
})
// Mirar el redireccionamiento despues del store
ordersRouter.route('/orders').get(
    async(req,res) =>{
    const orders = await service.index()
    res.render('admin/orders/orders', {
        orders: orders
    });
})

ordersRouter.route('/create').get(async(req, res) => {
    const products = await productsService.index()
    res.render('admin/orders/create',{
        products : products
    })
})

// formulario de crear desde admin 
ordersRouter.route('/store').post(
    //Llamar al middleware de validacion del esquema de creacion
    validatorHandler(storeOrderSchema, 'body'),
    async(req, res) => {
        console.log(req.body)
        const { product_id, product_name, product_price, ...data } = req.body; // Obtener el ID del televisor desde req.body
        const products = await productsService.index(); // Obtener la lista completa de televisores
        const order = await service.store( data, product_id ) //Almacenamos en BD
        res.redirect('/admin/orders/orders')
})

// Formulario de crear desde usuario
ordersRouter.route('/formOrder').post(
    // Llamar al middleware de validacion del esquema de creacion
    validatorHandler(storeOrderSchema, 'body'),
    async (req, res) => {
        console.log(req.body)
        const { product_id, product_name, product_price, ...data } = req.body;
        const products = await productsService.index(); // Obtener la lista completa de televisores
        // Guardar los datos en la tabla 'orders'
        const order = await service.store(data, product_id);
        // showAlerts("¡Orden creada exitosamente!");
        res.redirect('/indexUsers');
});

// const showAlerts = (message) => {
//     alert(message);
// };

  





  

ordersRouter.route('/edit/:id').get(async(req,res) =>{
    //1. Consultar el registro en la base de datos a partir de su ID
    const order_id = req.params.id
    const order = await service.show(order_id)
    //2. Enviar el registro a la plantilla EJS
    res.render('admin/orders/edit', {
        order: order
    })
})

ordersRouter.route('/update').post(
    //2 Middleware
    validatorHandler(updateOrderSchema, 'body'),
    async(req, res) => {
        console.log(req.body)
        //Actualizar en BD
        const order = await service.update(req.body.order_id, req.body)
        //Redireccionar
        res.redirect('/admin/orders/orders')
})

ordersRouter.route('/destroy/:order_id').post(
    validatorHandler(getOrderSchema, 'params'),
    async(req, res) => {
        const order_id = req.params.order_id
        const order = await service.destroy(order_id)
        res.redirect('/admin/orders/orders')
})

ordersRouter.route('/:id').get(async(req,res) =>{
    const order_id = req.params.id
    const order = await service.show(order_id)
    console.log(order)
    // res.send(`Buscando la sesión ${req.params.id}`)
    res.json(order) //Deberia renderizar una vista pero en este caso estamos mostrando un json

})

module.exports = ordersRouter;
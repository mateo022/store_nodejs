const Joi = require('joi')

const order_id = Joi.number().id()
const order_name = Joi.string().min(3).max(100)
const order_last_name = Joi.string().min(3).max(100)
const order_email = Joi.string().min(3).max(100)
const order_address = Joi.string().min(3).max(100)
// const order_total_price = Joi.number()
const order_date = Joi.date()
const product_id = Joi.number()


const storeOrderSchema = Joi.object({
    order_name: order_name.required(),
    order_last_name : order_last_name.required(),
    order_email : order_email.required(),
    order_address : order_address.required(),
    // order_total_price : order_total_price.required(),
    order_date : order_date.required(),
    product_id : product_id.required()
})

const updateOrderSchema = Joi.object({
    order_id: order_id.required(),
    order_name: order_name.required(),
    order_last_name : order_last_name.required(),
    order_email : order_email.required(),
    order_address : order_address.required(),
    // order_total_price : order_total_price.required(),
    order_date : order_date.required(),
    product_id : product_id.required()
})

const getOrderSchema = Joi.object({
    order_id: order_id.required()
})

module.exports = {
    storeOrderSchema,
    updateOrderSchema,
    getOrderSchema
}
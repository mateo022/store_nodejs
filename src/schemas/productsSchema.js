const Joi = require('joi')

const product_id = Joi.number().id()
const product_name = Joi.string().min(3).max(100)
const product_reference = Joi.string().min(3).max(100)
const product_size = Joi.string().min(3).max(100)
const product_description = Joi.string().min(3).max(100)
const product_image = Joi.string().min(3).max(100)
const category_id = Joi.number()
const product_price = Joi.number()

const storeProductSchema = Joi.object({
    product_name: product_name.required(),
    product_reference : product_reference.required(),
    product_size : product_size.required(),
    product_description : product_description.required(),
    product_image : product_image.optional(),
    category_id : category_id.required(),
    product_price : product_price.optional()
})

const updateProductSchema = Joi.object({
    product_id: product_id.required(),
    product_name: product_name.required(),
    product_reference : product_reference.required(),
    product_size : product_size.required(),
    product_description: product_description.required(),
    product_image : product_image.optional(),
    category_id : category_id.required(),
    product_price : product_price.optional()
})

const getProductSchema = Joi.object({
    product_id: product_id.required()
})

module.exports = {
    storeProductSchema,
    updateProductSchema,
    getProductSchema
}
const Joi = require('joi')

const category_id = Joi.number().id()
const category_name = Joi.string().min(3).max(100)
const category_description = Joi.string().min(3).max(100)

const storeCategorySchema = Joi.object({
    category_name: category_name.required(),
    category_description : category_description.required()
})

const updateCategorySchema = Joi.object({
    category_id: category_id.required(),
    category_name: category_name,
    category_description : category_description
})

const getCategorySchema = Joi.object({
    category_id: category_id.required()
})

module.exports = {
    storeCategorySchema,
    updateCategorySchema,
    getCategorySchema
}
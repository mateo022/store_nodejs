const defineProduct = require("./product.model");
const defineUser = require("./user.model");
const defineCategory = require("./category.model");
const defineOrder = require("./order.model");

function defineModels(sequelize) {
    defineProduct(sequelize)
    defineUser(sequelize)
    defineCategory(sequelize)
    defineOrder(sequelize)
};

module.exports = defineModels;

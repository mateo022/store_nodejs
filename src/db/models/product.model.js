const { DataTypes } = require('sequelize');
const sequelize = require('../../libs/sequelize');
const Category = require('./category.model')

function defineProduct(sequelize) {
    const Product = sequelize.define('product', {
        product_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        product_name: {
            type: DataTypes.STRING
        },
        product_reference: {
            type: DataTypes.STRING
        },
        product_size: {
            type: DataTypes.STRING
        },
        product_description: {
            type: DataTypes.STRING
        },
        product_image: {
            type: DataTypes.STRING
        },
        category_id:{
            type: DataTypes.INTEGER,
            foreignKey: true
        },
        product_price:{
            type: DataTypes.INTEGER,
        }
    }, {
        timestamps: false
    });

    setTimeout(() => {
        Product.belongsTo(sequelize.models.category, {foreignKey: 'category_id', tarjet_key: 'category_id'}, sequelize.models.order, {foreignKey: 'product_id', tarjet_key: 'product_id'});
    }, 0)

    return Product;
}

module.exports = defineProduct;


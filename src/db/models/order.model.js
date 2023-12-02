const { DataTypes } = require('sequelize');
const sequelize = require('../../libs/sequelize');

function defineOrder(sequelize) {
    const Order = sequelize.define('order', {
        order_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        order_name: {
            type: DataTypes.STRING
        },
        order_last_name: {
            type: DataTypes.STRING
        },
        order_email: {
            type: DataTypes.STRING
        },
        order_address: {
            type: DataTypes.STRING
        },
        // order_total_price: {
        //     type: DataTypes.INTEGER
        // },
        order_date: {
            type: DataTypes.DATE
        },
        product_id:{
            type: DataTypes.INTEGER,
            foreignKey: true
        }
    }, {
        timestamps: false
    });

    setTimeout(() => {
        Order.belongsTo(sequelize.models.product, {foreignKey: 'product_id', as: 'product'});
    }, 0)

    return Order;
}

module.exports = defineOrder;


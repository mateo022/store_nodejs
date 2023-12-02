const { DataTypes } = require('sequelize');
const sequelize = require('../../libs/sequelize') //Nuevo
const {models} = require('../../libs/sequelize') //Nuevo

function defineCategory( sequelize ){
    const Category = sequelize.define('category', {
        // Model attributes are defined here
        category_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey : true,
          allowNull: false
        },
        category_name: {
          type: DataTypes.STRING
        },
        category_description: {
          type: DataTypes.STRING
        }
      }, {
        // Other model options go here
        timestamps : false
      });

      setTimeout(() => {
      Category.hasMany(sequelize.models.product, { foreignKey: 'category_id' }); //Esto es nuevo
      }, 0)

      return Category
}

module.exports = defineCategory

// module.exports = Category; // Esto es nuevo
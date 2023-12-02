const { DataTypes } = require('sequelize');

function defineUser( sequelize ){
    const User = sequelize.define('user', {
        // Model attributes are defined here
        id_user: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey : true,
          allowNull: false
        },
        name: {
          type: DataTypes.STRING
        },
        username: {
          type: DataTypes.STRING
        },
        password: {
          type: DataTypes.STRING
        }
      }, {
        // Other model options go here
        timestamps : false
      });
      return User;
}

module.exports = defineUser
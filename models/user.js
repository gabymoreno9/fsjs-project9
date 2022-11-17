'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Course);
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: '"firstName" cannot be empty'
        },
        notEmpty:{
          msg: '"firstName" cannot be empty'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: '"lastName" cannot be empty'
        },
        notEmpty:{
          msg: '"lastName" cannot be empty'
        }
      }
    },
    emailAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: '"emailAddress" cannot be empty'
        },
        notEmpty:{
          msg: '"emailAddress" cannot be empty'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: '"password" cannot be empty'
        },
        notEmpty:{
          msg: '"password" cannot be empty'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
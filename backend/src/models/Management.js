const { Model, DataTypes } = require('sequelize')

class Management extends Model {
  static init(sequelize) {
    super.init({}, {
      sequelize,
      tableName: 'managements'
    })
  }


}

module.exports = Management
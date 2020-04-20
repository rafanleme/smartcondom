const { Model, DataTypes } = require('sequelize')

class Manager extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      cpf: DataTypes.STRING,
      email: DataTypes.STRING,
      celular: DataTypes.STRING,
    }, {
      sequelize,
    })
  }

}

module.exports = Manager
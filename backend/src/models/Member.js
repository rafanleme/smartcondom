const { Model, DataTypes } = require('sequelize')

class Member extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      cpf: DataTypes.STRING,
      email: DataTypes.STRING,
      celular: DataTypes.STRING,
      password: DataTypes.STRING,
      profile_picture: DataTypes.STRING,
      cover_picture: DataTypes.STRING,
    }, {
      sequelize,
      modelName: 'members'
    })
  }

}

module.exports = Member
const { Model, DataTypes } = require('sequelize')

class CondominiumAddress extends Model {
  static init(sequelize) {
    super.init({
      zipcode: DataTypes.STRING,
      street: DataTypes.STRING,
      number: DataTypes.STRING,
      neighborhood: DataTypes.STRING,
      city: DataTypes.STRING,
      uf: DataTypes.STRING
    }, {
      sequelize
    })
  }

  static associate(models) {
    this.belongsTo(models.condominiums, { foreignKey: 'condominium_id', as: 'condominium' })
  }
}

module.exports = CondominiumAddress
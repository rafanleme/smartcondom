const { Model, DataTypes } = require('sequelize')

class Condominium extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      cnpj: DataTypes.STRING,
    }, {
      sequelize,
      modelName: 'condominiums'
    })
  }

  static associate(models){
    this.belongsTo(models.Manager, { foreignKey: 'manager_id', as: 'manager'})
  }

}

module.exports = Condominium
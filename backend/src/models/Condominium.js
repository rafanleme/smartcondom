const { Model, DataTypes } = require('sequelize')

class Condominium extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      cnpj: DataTypes.STRING,
      ticket: DataTypes.STRING,
    }, {
      sequelize,
      modelName: 'condominiums'
    })
  }

  static associate(models) {
    this.hasOne(models.CondominiumAddress, { foreignKey: 'condominium_id', as: 'address' });
    this.belongsTo(models.Manager, { foreignKey: 'created_manager_id', as: 'created_manager' });
    this.belongsToMany(models.Manager, { foreignKey: 'condominium_id', through: models.Management, as: 'managers' })
    this.belongsToMany(models.Member, { foreignKey: 'condominium_id', through: models.Living, as: 'members' })
  }

}

module.exports = Condominium
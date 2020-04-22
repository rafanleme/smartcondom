const { Model, DataTypes } = require('sequelize')

class Manager extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      cpf: DataTypes.STRING,
      email: DataTypes.STRING,
      celular: DataTypes.STRING,
      password: DataTypes.STRING
    }, {
      sequelize,
    })
  }

  static associate(models){
    this.belongsTo(models.Manager, { foreignKey: 'created_manager_id', as: 'created_manager'});
    this.belongsToMany(models.Condominium, { foreignKey: 'manager_id', through: models.Management, as: 'condominium' });
  }

}

module.exports = Manager
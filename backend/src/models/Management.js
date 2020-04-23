const { Model, DataTypes } = require('sequelize')

class Management extends Model {
  static init(sequelize) {
    super.init({
      active: DataTypes.BOOLEAN,
      principal: DataTypes.BOOLEAN,
    }, {
      sequelize,
      tableName: 'managements'
    })
  }

  static associate(models){
    this.belongsTo(models.Manager, { foreignKey: 'created_manager_id', as: 'created_manager' });
  }


}

module.exports = Management
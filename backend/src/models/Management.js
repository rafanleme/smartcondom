const { Model, DataTypes } = require('sequelize')

class Management extends Model {
  static init(sequelize) {
    super.init({
      approved: DataTypes.BOOLEAN,
      approved_date: DataTypes.DATE
    }, {
      sequelize,
      tableName: 'managements'
    })
  }

  static associate(models) {
    this.belongsTo(models.Manager, { foreignKey: 'approved_manager_id', as: 'approved_manager' });
  }

}

module.exports = Management
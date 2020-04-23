const { Model, DataTypes } = require('sequelize')

class Living extends Model {
  static init(sequelize) {
    super.init({
      aproved: DataTypes.BOOLEAN,
      aproved_date: DataTypes.DATE,
      active: DataTypes.BOOLEAN,
      apartment_block: DataTypes.STRING,
      apartment_number: DataTypes.STRING,
    }, {
      sequelize,
      tableName: 'living'
    })
  }

  static associate(models) {
    this.belongsTo(models.Manager, { foreignKey: 'aproved_manager_id', as: 'aproved_manager' });
  }

}

module.exports = Living
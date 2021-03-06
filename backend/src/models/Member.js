const { Model, DataTypes } = require("sequelize");

class Member extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        cpf: DataTypes.STRING,
        email: DataTypes.STRING,
        cellphone: DataTypes.STRING,
        password: DataTypes.STRING,
        profile_picture: DataTypes.STRING,
        cover_picture: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsToMany(models.Condominium, {
      foreignKey: "member_id",
      through: models.Living,
      as: "condominium",
    });
  }
}

module.exports = Member;

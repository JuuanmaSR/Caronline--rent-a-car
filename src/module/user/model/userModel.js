const { Sequelize, Model, DataTypes } = require('sequelize');

module.exports = class UserModel extends Model {
  /**
     *
     * @param {import('sequelize').Sequelize} sequelizeIntance
     * @returns {Model} UserModel
     */
  static setup(sequelizeIntance) {
    UserModel.init({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      documentType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      documentNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      nationality: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      birthdate: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      },
      deletedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize: sequelizeIntance,
      modelName: 'User',
      tableName: 'users',
      underscored: true,
      paranoid: true,
    });
    return UserModel;
  }
};

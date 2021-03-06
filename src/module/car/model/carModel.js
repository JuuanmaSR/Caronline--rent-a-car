const { Sequelize, Model, DataTypes } = require('sequelize');

module.exports = class CarModel extends Model {
  /**
     * @param {import('sequelize').Sequelize} sequelizeInstance
     * @returns {Model} CarModel
     */
  static setup(sequelizeInstance) {
    CarModel.init({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      crestUrl: {
        type: DataTypes.STRING,
      },
      carModel: {
        type: DataTypes.STRING,
      },
      brand: {
        type: DataTypes.STRING,
      },
      year: {
        type: DataTypes.INTEGER,
      },
      kilometres: {
        type: DataTypes.INTEGER,
      },
      color: {
        type: DataTypes.STRING,
      },
      airConditioner: {
        type: DataTypes.BOOLEAN,
      },
      gearBox: {
        type: DataTypes.STRING,
      },
      rentalValuePerDay: {
        type: DataTypes.INTEGER,
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
      sequelize: sequelizeInstance,
      modelName: 'Car',
      tableName: 'cars',
      underscored: true,
      paranoid: true,
    });
    return CarModel;
  }
};

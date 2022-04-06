const { Sequelize, Model, DataTypes } = require('sequelize');

module.exports = class RentModel extends Model {
/**
 * @param {import('sequelize').Sequelize} sequelizeIntance
 * @returns {Model} RentModel
 */
  static setup(sequelizeIntance) {
    RentModel.init({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      pricePerDay: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      finishDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      totalPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      paymentStatus: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      status: {
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
      modelName: 'Rent',
      tableName: 'rents',
      underscored: true,
      paranoid: true,
    });
    return RentModel;
  }

  /**
   *
   * @param {typeof import('../../car/model/carModel')} CarModel
   * @param {typeof import('../../user/model/userModel')} UserModel
   */
  static setupAssociations(CarModel, UserModel) {
    CarModel.hasMany(RentModel, { foreignKey: 'carId', constraints: false });
    RentModel.belongsTo(CarModel, { foreignKey: 'carId', constraints: false });
    UserModel.hasMany(RentModel, { foreignKey: 'userId', constraints: false });
    RentModel.belongsTo(UserModel, { foreignKey: 'userId', constraints: false });

    return RentModel;
  }
};

'use strict';
module.exports = (sequelize, DataTypes) => {
  //values are in grams or milliliters depending on the isSolid option
  const Food = sequelize.define('Food', {
    name: DataTypes.STRING,
    calories: DataTypes.INTEGER,
    fat: DataTypes.INTEGER,
    carbs: DataTypes.INTEGER,
    protein: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    isSolid: DataTypes.BOOLEAN,
    img: DataTypes.STRING
  }, {
    tableName: 'foods'
  });
  Food.associate = function(models) {
    // Food belongsTo User when a user creates a new food
    Food.belongsTo(models.User);
    // Food belongs to Day when a user adds food to a day for logging
    Food.belongsTo(models.Day);
  };
  return Food;
};
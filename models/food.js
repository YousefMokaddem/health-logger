'use strict';
module.exports = (sequelize, DataTypes) => {
  // values are in grams or milliliters depending on the isSolid option
  // users will be instructed to add foods with nutritional values for 100 g/ml
  // the "amount" will be added when users add food to days, and will be used as a multiplier
  // (amount/100) * all of the nutritional values
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
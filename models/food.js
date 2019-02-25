'use strict';
module.exports = (sequelize, DataTypes) => {
  //values are per 100g
  const Food = sequelize.define('Food', {
    name: DataTypes.STRING,
    calories: DataTypes.INTEGER,
    fat: DataTypes.INTEGER,
    carbs: DataTypes.INTEGER,
    protein: DataTypes.INTEGER,
    img: DataTypes.STRING
  }, {
    tableName: 'foods'
  });
  Food.associate = function(models) {
    // Food belongsTo User
    Food.belongsTo(models.User);
  };
  return Food;
};
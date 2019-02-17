'use strict';
module.exports = (sequelize, DataTypes) => {
  //values are per 100g
  const Food = sequelize.define('foods', {
    name: DataTypes.STRING,
    calories: DataTypes.INTEGER,
    fat: DataTypes.INTEGER,
    carbs: DataTypes.INTEGER,
    protein: DataTypes.INTEGER,
    img: DataTypes.STRING
  }, {});
  Food.associate = function(models) {
    // associations can be defined here
  };
  return Food;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // User hasMany Foods that they create, users can edit and delete foods they created
    User.hasMany(models.Food);
    // User hasMany Days that they create and can add and remove foods to for logging
    User.hasMany(models.Day);
  };
  return User;
};
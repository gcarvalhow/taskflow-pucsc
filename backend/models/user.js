const { DataTypes } = require('sequelize');
const sequelize = require('../data/sequelize');

const User = sequelize.define('User', {
    id: { type: DataTypes.UUID, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false }
});

module.exports = User;
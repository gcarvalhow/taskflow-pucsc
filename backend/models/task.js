const { DataTypes } = require('sequelize');
const sequelize = require('../data/sequelize');

const Task = sequelize.define('Task', {
    id: { type: DataTypes.UUID, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    completed: { type: DataTypes.BOOLEAN, defaultValue: false },
    userId: { type: DataTypes.UUID, allowNull: false }
});

module.exports = Task;
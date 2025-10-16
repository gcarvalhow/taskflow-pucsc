const User = require('../models/user');
const Task = require('../models/task');

User.hasMany(Task, { foreignKey: 'userId' });
Task.belongsTo(User, { foreignKey: 'userId' });

module.exports = { User, Task };
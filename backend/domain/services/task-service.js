const validator = require('validator');
const TaskRepository = require('../../infra/repositories/task-repository');

class TaskService {
  async getAllTasks() {
    return await TaskRepository.getAll();
  }

  async getTaskById(id) {
    if (!id || typeof id !== 'string' || !validator.isUUID(id)) {
      throw new Error('ID inválido');
    }

    const task = await TaskRepository.getById(id);
    if (!task) {
        throw new Error('Task não encontrada');
    }

    return task;
  }

  async createTask(data, userId) {
    if (!userId || typeof userId !== 'string' || !validator.isUUID(userId)) {
      throw new Error('ID de usuário inválido');
    }

    const taskData = {
      ...data,
      userId: userId
    }

    return await TaskRepository.create(taskData);
  }

  async updateTask(id, data) {
    if (!id || typeof id !== 'string' || !validator.isUUID(id)) {
      throw new Error('ID inválido');
    }

    const task = await TaskRepository.getById(id);
    if (!task) {
      throw new Error('Task não encontrada');
    }

    return await TaskRepository.update(id, data);
  }

  async deleteTask(id) {
    if (!id || typeof id !== 'string' || !validator.isUUID(id)) {
      throw new Error('ID inválido');
    }

    const deleted = await TaskRepository.delete(id);
    if (!deleted) {
      throw new Error('Task não encontrada');
    }

    return true;
  }
}

module.exports = new TaskService();
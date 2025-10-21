const validator = require('validator');
const TaskRepository = require('../../infra/repositories/task-repository');

class TaskService {
  async getTasksByUserId(userId) {
    if (!userId || typeof userId !== 'string' || !validator.isUUID(userId)) {
      throw new Error('ID de usuário inválido');
    }

    return await TaskRepository.model.findMany({ where: { userId } });
  }
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

  async updateTask(id, data, userId) {
    if (!id || typeof id !== 'string' || !validator.isUUID(id)) {
      throw new Error('ID inválido');
    }
    if (!userId || typeof userId !== 'string' || !validator.isUUID(userId)) {
      throw new Error('ID de usuário inválido');
    }
    const task = await TaskRepository.model.findFirst({ where: { id, userId } });
    if (!task) {
      throw new Error('Task não encontrada');
    }

    return await TaskRepository.update(id, data);
  }

  async deleteTask(id, userId) {
    if (!id || typeof id !== 'string' || !validator.isUUID(id)) {
      throw new Error('ID inválido');
    }
    if (!userId || typeof userId !== 'string' || !validator.isUUID(userId)) {
      throw new Error('ID de usuário inválido');
    }
    const task = await TaskRepository.model.findFirst({ where: { id, userId } });
    if (!task) {
      throw new Error('Task não encontrada');
    }
    await TaskRepository.delete(id);
    return true;
  }
}

module.exports = new TaskService();
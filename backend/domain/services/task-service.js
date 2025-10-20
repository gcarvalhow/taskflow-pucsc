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

  async createTask(data) {
    return await TaskRepository.create(data);
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

module.exports = TaskService;
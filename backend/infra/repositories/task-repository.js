const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const GenericRepository = require('./generic-repository');

class TaskRepository extends GenericRepository {
  async getByUserId(userId) {
    return await this.model.findMany({ where: { userId } });
  }
  
  constructor() {
    super(prisma.task);
  }
}

module.exports = new TaskRepository();
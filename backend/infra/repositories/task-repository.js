const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const GenericRepository = require('./generic-repository');

class TaskRepository extends GenericRepository {
  constructor() {
    super(prisma.task);
  }
}

module.exports = new TaskRepository();
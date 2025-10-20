const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const GenericRepository = require('./generic-repository');

class UserRepository extends GenericRepository {
  constructor() {
    super(prisma.user);
  }

  async findByEmail(email) {
    return await this.model.findUnique({ where: { email } });
  }
}

module.exports = new UserRepository();
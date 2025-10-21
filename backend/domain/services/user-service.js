const bcrypt = require('bcrypt');
const validator = require('validator');
const UserRepository = require('../../infra/repositories/user-repository');

class UserService {
    async getUserById(id) {
        if (!id || typeof id !== 'string' || !validator.isUUID(id)) {
            throw new Error('ID inválido');
        }

        const user = await UserRepository.getById(id);
        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        return user;
    }

    async createUser(data) {
        if (await UserRepository.findOneByParams({ email: data.email })) {
            throw new Error('Email já cadastrado');
        }
        
        const hashedPassword = await bcrypt.hash(data.password, 10);
        
        const userData = {
            email: data.email,
            password: hashedPassword
        };

        return await UserRepository.create(userData);
    }
}

module.exports = new UserService();
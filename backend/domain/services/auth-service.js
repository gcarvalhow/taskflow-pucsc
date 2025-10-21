const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserRepository = require('../../infra/repositories/user-repository');

class AuthService {
    async login(data) {
        const user = await UserRepository.findByEmail(data.email);
        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        if (!await bcrypt.compare(data.password, user.password)) {
            throw new Error('Senha incorreta');
        }

        return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'secreta', { expiresIn: '1d' });
    }
}

module.exports = new AuthService();
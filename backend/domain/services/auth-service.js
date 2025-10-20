const bcrypt = require('bcrypt');
const UserRepository = require('../../infra/repositories/user-repository');

class AuthService {
    async login(data) {
        const user = await UserRepository.findOneByParams({ email: data.email });
        if (!user) {
            throw new Error('Usuário não encontrado');
        };

        if (!await bcrypt.compare(data.password, user.password)) {
            throw new Error('Senha inválida');
        }
    }
}

module.exports = AuthService;
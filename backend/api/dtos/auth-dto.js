class RequestLoginDTO {
    constructor({ email, password }) {
        this.isSuccess = true;
        this.errorMessage = null;

        if (!email || typeof email !== 'string' || email.trim() === '') {
            this.isSuccess = false;
            this.errorMessage = 'Email é obrigatório';
        } else if (!password || typeof password !== 'string' || password.trim() === '') {
            this.isSuccess = false;
            this.errorMessage = 'Senha é obrigatória';
        }

        this.email = email;
        this.password = password;
    }
}

module.exports = RequestLoginDTO;
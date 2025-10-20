class RequestUserDTO {
  constructor({ email, password, confirmPassword }) {
    this.isSuccess = true;
    this.errorMessage = null;

    if (!email || typeof email !== 'string' || email.trim() === '') {
      this.isSuccess = false;
      this.errorMessage = 'Email é obrigatório';
    }

    if (!password || typeof password !== 'string' || password.trim() === '') {
      this.isSuccess = false;
      this.errorMessage = 'Senha é obrigatória';
    }

    if (password !== confirmPassword) {
      this.isSuccess = false;
      this.errorMessage = 'As senhas não coincidem';
    }

    this.email = email;
    this.password = password;
    this.confirmPassword = confirmPassword;
  }
}

class ResponseUserDto {
    constructor({ id, email }) {
        this.id = id;
        this.email = email;
    }
}

module.exports = { RequestUserDTO, ResponseUserDto };
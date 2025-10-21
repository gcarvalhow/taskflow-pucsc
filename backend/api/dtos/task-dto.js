class RequestTaskDTO {
  constructor({ title, description, completed }) {
    if (!title || typeof title !== 'string' || title.trim() === '') {
      throw new Error('Título é obrigatório');
    }

    this.title = title;
    this.description = description || '';
    this.completed = !!completed;
  }
}

class ResponseTaskDTO {
  constructor({ id, title, description, completed, userId }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.completed = completed;
    this.userId = userId;
  }
}

module.exports = { RequestTaskDTO, ResponseTaskDTO };
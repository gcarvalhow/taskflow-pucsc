class RequestTaskDTO {
  constructor({ title, description, completed, userId }) {
    if (!title || typeof title !== 'string' || title.trim() === '') {
      throw new Error('Título é obrigatório');
    }

    if (!userId || typeof userId !== 'string' || !validator.isUUID(id)) {
      throw new Error('userId é obrigatório');
    }

    this.title = title;
    this.description = description || '';
    this.completed = !!completed;
    this.userId = userId;
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
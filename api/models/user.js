class User {
  constructor(data) {
    this.mail = data ? data.mail : "";
    this.createdAt = data ? data.createdAt : undefined;
    this.updatedAt = data ? data.updatedAt : undefined;
  }
}

module.exports = User;

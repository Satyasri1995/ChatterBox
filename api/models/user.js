const Contact = require("./contact");

class User {
  constructor(data) {
    this.id=data?(data._id||data.id):""
    this.mail = data ? data.mail : "";
    this.createdAt = data ? data.createdAt : undefined;
    this.updatedAt = data ? data.updatedAt : undefined;
    this.contacts=data?data.contacts.map(contact=>new Contact(contact)):[];
  }
}

module.exports = User;

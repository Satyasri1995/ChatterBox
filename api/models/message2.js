const User = require("./user");

class Message2 {
  constructor(data) {
    this.id=data?data._id||data.id:"";
    this.sender=data?new User(data.sender):undefined;
    this.sent=data.sent;
    this.sentDate=data.sentDate;
    this.receiver=data?new User(data.receiver):undefined;
    this.received=data.received;
    this.receivedDate=data.receivedDate;
    this.read=data.read;
    this.readDate=data.readDate;
    this.message=data.message;
  }
}
module.exports=Message2;

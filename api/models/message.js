class Message {
  constructor(data) {
    this.id=data?data._id||data.id:"";
    this.sender=data.sender;
    this.sent=data.sent;
    this.sentDate=data.sentDate;
    this.receiver=data.receiver;
    this.received=data.received;
    this.receivedDate=data.receivedDate;
    this.read=data.read;
    this.readDate=data.readDate;
    this.message=data.message;
  }
}
module.exports=Message;
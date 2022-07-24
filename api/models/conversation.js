const Message2 = require('./message2')

class Conversation {
  constructor(data){
    this.id=data._id||data.id;
    this.messages=data?data.messages.map(msg=>new Message2(msg)):[];
    this.createdAt=data?data.createdAt:null;
    this.updatedAt=data?data.updatedAt:null;
  }
}
module.exports=Conversation;

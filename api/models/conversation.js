class Conversation {
  constructor(data){
    this.id=data._id||data.id;
    this.messages=data?data.messages:[];
    this.createdAt=data?data.createdAt:null;
    this.updatedAt=data?data.updatedAt:null;
  }
}
module.exports=Conversation;

class Contact {
  constructor(data){
    this.id=data?(data._id||data.id):"";
    this.user=data?data.user:"";
    this.name=data?data.name:"";
    this.lastMessage=data?data.lastMessage:{};
    this.conversation=data?data.conversation:[];
  }
}

module.exports=Contact;

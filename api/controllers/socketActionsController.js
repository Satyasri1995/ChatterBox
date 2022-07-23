const Message = require("../models/message");
const ConverstionSchemaModel = require("../schemas/converstionSchema");
const UserShemaModel = require("../schemas/userSchema");

exports.receiveMessageFromClient=async(socket,data,io)=>{

  const conversation = await ConverstionSchemaModel.findById(data.conversationId);
  const message = new Message(data.message);
  message.sent=true;
  message.sentDate=Date.now();
  if(conversation){
    const user = await UserShemaModel.findById(message.sender.id);
    conversation.messages.push(message);
    const count=conversation.messages.reduce((count,value)=>(value.read?count+1:count),0);
    const contactIndex=user.contacts.findIndex((contact)=>contact.conversation===conversation._id);
    user.contacts[contactIndex].unread=count;
    await user.save();
  }else{
    socket.emit("message:error","message failed");
  }
  const updatedConversation = await conversation.save();
  if(updatedConversation){
    io.to(`conversation:${data.conversation}:update`,{conversation:data.conversation,message:message});
  }else{
    socket.emit("message:error","message failed");
  }
}

exports.receiveNotifyReceiveMessageFromClient=async(socket,data,io)=>{

  const conversation = await ConverstionSchemaModel.findById(data.conversation);
  const message = new Message(data.message);
  message.received=true;
  message.receivedDate=Date.now();
  if(conversation){
    conversation.messages.push(message);
  }else{
    socket.emit("message:error","message failed");
  }
  const updatedConversation = await conversation.save();
  if(updatedConversation){
    io.to(`conversation:${data.conversation}:update`,{conversation:data.conversation,message:message});
  }else{
    socket.emit("message:error","message failed");
  }
}

exports.receiveNotifyReadMessageFromClient=async(socket,data,io)=>{

  const conversation = await ConverstionSchemaModel.findById(data.conversation);
  const message = new Message(data.message);
  message.read=true;
  message.readDate=Date.now();
  if(conversation){
    conversation.messages.push(message);
  }else{
    socket.emit("message:error","message failed");
  }
  const updatedConversation = await conversation.save();
  if(updatedConversation){
    io.to(`conversation:${data.conversation}:update`,{conversation:data.conversation,message:message});
  }else{
    socket.emit("message:error","message failed");
  }
}

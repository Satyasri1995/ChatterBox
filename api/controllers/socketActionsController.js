const Message = require("../models/message");
const ConverstionSchemaModel = require("../schemas/converstionSchema");
const UserShemaModel = require("../schemas/userSchema");

exports.joinRoom = async (socket, data, io) => {
  socket.join(data);
};

exports.leaveRoom = async (socket, data, io) => {
  socket.leave(data);
};

exports.receiveMessageFromClient = async (socket, data, io) => {
  const conversation = await ConverstionSchemaModel.findById(
    data.conversationId
  );
  const message = new Message(data.message);
  const rawMessage = data.message;
  message.sent = true;
  message.sentDate = Date.now();
  let contactIndex;
  let user;
  if (conversation) {
    user = await UserShemaModel.findById(message.sender);
    conversation.messages.push(message);
    const count = conversation.messages.reduce(
      (count, value) => (!value.read ? count + 1 : count),
      0
    );
    contactIndex = user.contacts.findIndex(
      (contact) => contact.conversation == conversation.id
    );
    user.contacts[contactIndex].unread = count;
    user.contacts[contactIndex].lastMessage = message.message;
    user = await user.save();
    let otherUser = await UserShemaModel.findById(message.receiver);
    const idx = otherUser.contacts.findIndex(
      (contact) => contact.conversation == conversation.id
    );
    otherUser.contacts[idx].lastMessage = message.message;
    otherUser = await otherUser.save();
  } else {
    socket.emit("message:error", "message failed");
  }
  const updatedConversation = await conversation.save();
  if (updatedConversation) {
    rawMessage.id =
      updatedConversation.messages[updatedConversation.messages.length - 1]._id;
    rawMessage.sent = message.sent;
    rawMessage.sentDate = message.sentDate;
    io.to(`conversation:${data.conversationId}`).emit(`room:update`, {
      conversationId: data.conversationId,
      message: rawMessage,
    });
  } else {
    socket.emit("message:error", "message failed");
  }
};

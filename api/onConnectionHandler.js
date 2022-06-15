const socketController = require("./controllers/socketActionsController");

exports.onConnectionHandler = (socket) => {
  socket.emit("clientId", socket.id);
  const io = require("./socket").getIo();
  receiveMessageFromClient(socket, io);

};

const receiveMessageFromClient = async (socket,io) => {
  socket.on("message:send",(data)=>{socketController.receiveMessageFromClient(socket,data,io)});
  socket.on("message:receive",(data)=>{socketController.receiveNotifyReceiveMessageFromClient(socket,data,io)});
  socket.on("message:read",(data)=>{socketController.receiveNotifyReadMessageFromClient(socket,data,io)});
}


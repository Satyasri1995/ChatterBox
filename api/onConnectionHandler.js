const socketController = require("./controllers/socketActionsController");

exports.onConnectionHandler = (socket) => {
  socket.emit("clientId", socket.id);
  const io = require("./socket").getIo();
  receiveMessageFromClient(socket, io);

};

const receiveMessageFromClient = async (socket,io) => {
  socket.on("message:send",(data)=>{socketController.receiveMessageFromClient(socket,data,io)});
  socket.on("joinRoom",(data)=>{socketController.joinRoom(socket,data,io)});
  socket.on("leaveRoom",(data)=>{socketController.leaveRoom(socket,data,io)});
}


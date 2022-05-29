const socketController = require("./controllers/socketActionsController");

exports.onConnectionHandler = (socket) => {
  socket.emit("clientId", socket.id);
  const io = require("./socket").getIo();
  joinExamRoom(socket, io);
  leaveExamRoom(socket, io);
  messageFromClient(socket, io);
  refreshExaminer(socket,io);
};

const refreshExaminer = async (socket,io) => {
  socket.on("room:refresh",(data)=>{socketController.refreshExaminer(socket,data,io)})
}

const joinExamRoom = async (socket, io) => {
  socket.on("room:join",(data)=>{socketController.joinRoom(socket,data)});
};

const leaveExamRoom = async (socket, io) => {
  socket.on("room:leave",(data)=>{socketController.leaveRoom(socket,data,io)});
};

const messageFromClient = async (socket,io) => {
    socket.on("message:client",(data)=>{socketController.messageFromClient(data,io,socket)})
};

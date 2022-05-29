let io;

module.exports = {
  init: (server,options) => {
    io = require("socket.io")(server,options);
    return io;
  },
  getIo: ()=>{
    if(!io){
      throw new Error("Socket IO not initiallized...!");
    }
    return io;
  }
}

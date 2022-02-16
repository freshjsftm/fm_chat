const http = require('http');
const SocketServer = require('socket.io');
const app = require('./app');
const {Message} = require('./models');
const {port, SOCKET_EVENTS} = require('./config');

const server = http.createServer(app);
const io = SocketServer(server, {
  cors: {
    origin: "http://localhost:3000"
  }
});

io.on('connection', socket=>{
  socket.on(SOCKET_EVENTS.NEW_MESSAGE, async (newMessage)=>{
    try {
      console.log(SOCKET_EVENTS.NEW_MESSAGE)
      const saveMessage = await Message.create(newMessage);
      io.emit(SOCKET_EVENTS.NEW_MESSAGE,saveMessage);      
    } catch (error) {
      io.emit(SOCKET_EVENTS.NEW_MESSAGE_ERROR,error);
    }
  })
  socket.on('disconnect', reason=>{
    console.log(reason)
  })
})

server.listen(port, ()=>{
  console.log('server started:', port)
})

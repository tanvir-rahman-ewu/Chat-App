const express = require('express')
const socketio = require('socket.io')
const http = require('http')

const PORT = process.env.PORT || 5000;

const {addUser, getUser, removeUser, getUsersInRoom} = require('./User'); //importing helper function

const router = require('./router');

const app = express();
const server = http.createServer(app); //creation of nodejs server
const io = socketio(server);

io.on('connection', socket => {

    socket.on('join', ({ name, room }, callback) => {
       const {error, user} = addUser({id : socket.id, name, room});

       if(error) return callback(error);

       socket.emit('message', { user : 'admin', text : `${user.name}, welcome to the ${user.room}`})
       socket.broadcast.to(user.room).emit('message', { user : 'admin', text :`${user.name} has joined.`})
       socket.join(user.room);
    })

    

    socket.on('disconnect', () => {
        console.log('user left');
    })
})

app.use(router);

server.listen(PORT, () =>{
    console.log(`server is running at port ${PORT}`)
})



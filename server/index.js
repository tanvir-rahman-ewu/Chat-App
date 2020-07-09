const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const router = require('./router');
const cors = require('cors');

/* Defining Port at 5000*/
const PORT = process.env.PORT || 5000;

/* Server Creation and Socket.io Initialization*/
const app = express();
const server = http.createServer(app); 
const io = socketio(server);

/* Importing Helper Function */
const {addUser, getUser, removeUser, getUsersInRoom} = require('./User'); 

io.on('connection', socket => {

    socket.on('join', ({ name, room }, callback) => {

       const {error, user} = addUser({id : socket.id, name, room});

       if(error) return callback(error);

       socket.emit('message', { user : 'admin', text : `${user.name}, welcome to the ${user.room}`}) //admin generated msg

       socket.broadcast.to(user.room).emit('message', { user : 'admin', text :`${user.name} has joined.`}) //admin generated msg

       socket.join(user.room);

       io.to(user.room).emit('roomData', { room : user.room, users: getUsersInRoom(user.room)})

       callback();
    })

    socket.on('sendMessage', (message, callback) => {
        //console.log("message : " + message);
        const user = getUser(socket.id);
        
        /*Broadcasting to all the members of room whenever a user sends a message */
        io.to(user.room).emit('message', { user: user.name, text : message}); 
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)} );
       
        callback();
    })

    socket.on('disconnect', () => {
        /*Removing user when browser gets refreshed and welcome back*/
        const user = removeUser(socket.id);

        if(user){
            io.to(user.room).emit('message', { user : 'admin', text : `${user.name} has left the conversation` })
        }
    })
})

app.use(router);
app.use(cors());

/*Listening at port 5000*/
server.listen(PORT, () =>{
    console.log(`server is running at port ${PORT}`)
})



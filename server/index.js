const path=require('path');
const http=require('http');
const express=require('express');
const cors=require('cors');
const socketio=require('socket.io');
const rout=require('./router');
const app=express();

app.use(cors());
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
//server created usder the hood, but neede for socket.io
const server=http.createServer(app);
const io=socketio(server);
//on connection, listener takes one argument socket



io.on('connection',(socket)=>{
    console.log('New User connected');
    //this only emits to the current user
    socket.emit('message','Welcome to ChatApp');
    
    //this sends message to all except current user
   // socket.broadcast.emit('message','Someone has Joined');
    socket.on('chat message',(msg)=>{
        console.log('received',msg);
        io.emit('newmsg',msg);
    })
    //when client disconnets 
    socket.on('disconnect',()=>{
        io.emit('message','User has left the chat');
    });

});


app.use(rout);
const PORT=5000 ;
server.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});
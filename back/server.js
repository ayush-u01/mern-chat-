const express = require('express');
const dotenv = require('dotenv');
const { chats } = require('./data');
const app = express();

dotenv.config();

app.get('/', (req, res)=> {
    res.send("API is running");
})

app.get('/api/chat', (req, res) => {
    res.send(chats);
})

app.get('/api/chat/:id', (req, res) => {
    // console.log(req.params.id);
    const singlechat = chats.find(c=> c._id == req.params.id);
    res.send(singlechat);
    // res.send
})

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`server started on port ${PORT}`)); 

const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:4000",
    },
});

io.on("connection", (socket)=>{
    console.log("connected to socket.io");

    socket.on('setup', (userData) => {
        socket.join(userData._id);
        socket.emit('connected');
    })




})


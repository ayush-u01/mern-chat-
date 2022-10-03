const express = require('express');
const dotenv = require('dotenv');
// const { chats } = require('./data');
const connectDB = require('./config/db');
const { chats } = require('./data');
// const { route } = require('./routes/userRoutes.JS');
const userRoutes = require('./routes/userRoutes');
const { errorHandler, notfound } = require('./middleware/errorMiddleware');

const app = express();

dotenv.config();
connectDB();

app.use(express.json());

app.get('/', (req, res)=> {
    res.send("API is running");
})

app.use('/api/user', userRoutes);

app.use(notfound);
app.use(errorHandler);


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


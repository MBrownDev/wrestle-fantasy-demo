const express = require('express');
const app = express();
const http = require('http');
const mongoose = require('mongoose');
const UserModel = require('./Users')
const { Server } = require('socket.io');
const cors = require("cors");

//import list from '../client/src/JsonList'
app.use(express.json())
app.use(cors());

mongoose.connect(
    "mongodb+srv://mbrown4771:W0UMcI9aCchIXWYU@project-cluster.3slwjyi.mongodb.net/wrestlefantasy?retryWrites=true&w=majority"
    ).then(console.log('connected'));

app.get("/getUsers", async (req, res) => {
    try {
        const user = await UserModel.find({})
        res.json(user)
    } catch (err) {
        res.json(err)
    }
});

app.get("/getChampions", async (req, res) => {
    try{
        const champ = await UserModel.find({championship:{$nin:[null,""]}})
        res.json(champ)
    } catch (err) {
        res.json(err)
    } 
})
// socket io server
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ["GET", "POST"]
    }
});

let testList = []
let users = []

io.on("connection", async (socket) => {
    console.log(`user connected: ${socket.id}`)

    //joins user to room id created. 
    socket.on("join_room", (data) => {
        //const {username, room} = data;
        socket.join(data.room)
        console.log(data.room)
        //room = data;
        io.to(data.room).emit("receive_users", data);
    })

    
    socket.on("set_list", (data) => {
        const {list, room} = data;
        testList = list;
        io.to(room).emit("receive_list", list)
        console.log('hit 1')
    })

    socket.on("update_list", (data) => {
        const {id, room} = data;
        testList = testList.filter((test) => test._id !== id);
        var list = testList;
        io.in(room).emit("receive_list", list);
        console.log('hit 2',id)
    })

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data)
    })
})

app.get("/api", (req, res) => {
	res.json(testList);
});

server.listen(3001, () => {
    console.log('SERVER IS RUNNING');
});
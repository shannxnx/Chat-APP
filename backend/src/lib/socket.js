import {Server} from "socket.io";
import http from "http";
import express from "express";


const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors : {
        origin : ["http://localhost:5173"],
    },
});


export function getRecieverSocketId(userId){
    return userSocketMap[userId];
}

//for online usersss
const userSocketMap = {}; 


//this is a listen shit just like the app.listen on the index
io.on("connection", (socket) => {
    console.log("A user connected: ", socket.id);

    const userId = socket.handshake.query.userId;

    if (userId){
        userSocketMap[userId] = socket.id;
    }


    //used to send event to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("A user disconnected: ", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    })
});




export {app, io, server};
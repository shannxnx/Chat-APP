import {Server} from "socket.io";
import http from "http";
import express from "express";
import { Socket } from "dgram";
import { console } from "inspector";


const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors : {
        origin : ["http://localhost:5173"],
    },
});




//for online usersss
const userSocketMap = {}; 

export function getRecieverSocketId(userId){
    return userSocketMap[userId];
}

//this is a listen shit just like the app.listen on the index.js

io.on("connection", (socket) => {
    console.log("A user connected: ", socket.id);

    const userId = socket.handshake.query.userId;
    console.log("User id: ", userId);
    if (userId){
        userSocketMap[userId] = socket.id;
    }

    //socket.on is the reaction
    socket.on("joinConvo", (convoId) => {
        socket.join(convoId);
        console.log(`User ${socket.id} joined room : ${convoId}`);
    });

    socket.on("changeBackground", ({convoId, color}) => {
        console.log(`Changing chat background in room  ${convoId} to ${color}`);
        io.to(convoId).emit("updateBackground", color);
    });

    socket.on("changeNickNames", ({convoId, userNn, partnerNn}) => {
        console.log(`Changing NickNames in room ${convoId}`);
        io.to(convoId).emit("updateNickNames", userNn, partnerNn)
    });


    //used to send event to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("A user disconnected: ", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    })
});




export {app, io, server};
import { Server } from "socket.io";
import http from 'http'
import express from 'express'

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: [process.env.CLIENT_URL],
        methods: ['GET', 'POST'],
        credentials: true,
    }
})

export function getReceiverSocketId(userId) {
    return userSocketMap.get(userId);
}

const userSocketMap = new Map();

io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId) {
        userSocketMap.set(userId, socket.id);
        console.log('User Conntected:', socket.id);
    } else {
        console.log('Id not Provided');
    }

    io.emit('getOnlineUsers', Array.from(userSocketMap.keys()));

    socket.on('joinGroup', (groupId) => {
        if (groupId) {
            socket.join(groupId);
            console.log(`User ${socket.id} joined group ${groupId}`);
        } else {
            console.log(`Error: groupId is null`);
        } 
    });

    socket.on('disconnect', () => {
        console.log('User Disconnected:', socket.id);
        for (const [userId, socketId] of userSocketMap.entries()) {
            if (socketId === socket.id) {
                userSocketMap.delete(userId);
                io.emit('getOnlineUsers', Array.from(userSocketMap.keys()));
                break;
            }
        }
    })
})

export { io, app, server }
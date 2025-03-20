import express from 'express'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import path from 'path'

import { connectDB } from './db/connectDB.js'
import { app, server } from './utils/socket.js'

import userRouter from './routes/user.route.js'
import messageRouter from './routes/message.route.js'
import contactRouter from './routes/contact.route.js'
import groupRouter from './routes/group.route.js'

const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

app.use('/api/user', userRouter);
app.use('/api/messages', messageRouter);
app.use('/api/contacts', contactRouter);
app.use('/api/groups', groupRouter);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join( __dirname, '../frontend/dist' )))
    
    app.get('*', (req, res) => {
        res.sendFile(path.join( __dirname, '../frontend', 'dist', 'index.html' ))
    })
}

app.get('/', (req, res) => {
    res.send('API Working');
})

server.listen(PORT, () => {
    connectDB();
    console.log(`Server is Listening to PORT: ${PORT}`);
})
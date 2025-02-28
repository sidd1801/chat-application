const express = require('express');
const cors = require('cors');
const db = require('./database');
const { Server } = require('socket.io');
const http = require('http');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

// Store and broadcast messages
app.post('/send', (req, res) => {
    const { sender, receiver, message } = req.body;
    db.run("INSERT INTO messages (sender, receiver, message) VALUES (?, ?, ?)", [sender, receiver, message], function(err) {
        if (err) return res.status(500).send(err.message);
        io.emit('message', { sender, receiver, message });
        res.json({ success: true });
    });
});

// Fetch messages
app.get('/messages', (req, res) => {
    const { sender, receiver } = req.query;
    db.all("SELECT * FROM messages WHERE (sender = ? AND receiver = ?) OR (sender = ? AND receiver = ?) ORDER BY timestamp", 
        [sender, receiver, receiver, sender], (err, rows) => {
            if (err) return res.status(500).send(err.message);
            res.json(rows);
        });
});

io.on('connection', (socket) => {
    console.log('User connected');
    socket.on('disconnect', () => console.log('User disconnected'));
});

server.listen(5000, () => console.log('Server running on port 5000'));

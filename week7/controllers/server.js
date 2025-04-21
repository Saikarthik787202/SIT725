var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var path = require('path');

// Middleware
app.use(express.static(path.join(__dirname, '../views/public')));
app.use(express.json());

// Routes
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../views/public/index.html'));
});

// Socket connection
io.on('connection', function (socket) {
    console.log('a user connected');

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

    // Send random number every second
    setInterval(function () {
        socket.emit('number', parseInt(Math.random() * 10));
    }, 1000);
});

// Start server
var port = 3001;
http.listen(port, function () {
    console.log('Server started on port: ' + port);
});
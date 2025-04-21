// Initialize socket connection
var socket = io();

// Connection event handlers
socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

// Listen for random number updates
socket.on('number', function (msg) {
    console.log('Random number:', msg);
    document.getElementById('number').innerText = msg;
});
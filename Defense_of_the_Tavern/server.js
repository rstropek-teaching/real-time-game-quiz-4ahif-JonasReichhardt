"use strict";
exports.__esModule = true;
var express = require("express");
var http = require("http");
var sio = require("socket.io");
var app = express();
var server = http.createServer(app);
var io = sio(server);
var port = process.env.PORT || 3000;
var maxPlayer = 2;
var curPlayer = 0;
server.listen(port, function () {
    console.log('Server is listening on port %d', port);
});
app.use(express.static(__dirname));
app.use(express.static(__dirname + '/assets'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
io.on('connection', function (socket) {
    socket.on('newPlayer', function () {
        if (curPlayer < maxPlayer) {
            var player = randomInt(0, 100) || randomInt(0, 100);
            socket.broadcast.emit('newPlayer', player);
            curPlayer++;
            socket.on('disconnect', function () {
                io.emit('remove');
            });
        }
    });
});
function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

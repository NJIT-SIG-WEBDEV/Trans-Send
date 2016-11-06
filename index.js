"use strict";


var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

// [START app]
// Say hello!
// [START app]
app.get("/", /* @callback */ function (req, res) {
  res.status(200).sendFile(__dirname + "/index.html");
});

// [END ]

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('send-nickname', function(nickname) {
    socket.nickname = nickname;
  });

  socket.on('chat message', function(nickname, msg){
    console.log(nickname);
    console.log('message: ' + msg);
    io.emit('chat message', nickname, msg);
    socket.broadcast.emit('hi');
  });

  socket.on('echo-message' , function(message){
    console.log("GOT HERE");
    io.emit('chat message', "echo", msg);
  });
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});

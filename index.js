var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('send-nickname', function(nickname) {
    socket.nickname = nickname;
  });

  socket.on('chat message', function(author, msg){
      console.log(author);
    console.log('message: ' + msg);
    io.emit('chat message', author + ': ' + msg);
    io.emit('some event', { for: 'everyone' });
  socket.broadcast.emit('hi');
  });
});



http.listen(3000, function(){
  console.log('listening on *:3000');
});


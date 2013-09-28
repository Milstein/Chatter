
var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

server.listen(80);

app.get('/', function (req, res) {
  res.render('testJavascript.jade');
});

io.sockets.on('connection', function (socket) {
  socket.on('entered', function (submitted) {
    console.log(submitted);
  });
});

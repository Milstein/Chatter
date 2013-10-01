
var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

server.listen(80);

app.get('/', function (req, res) {
  res.render('testJavascript.jade');
});



var socks = [];
io.sockets.on('connection', function (socket) {
 	socks.push(socket);
console.log('There are currently ' + socks.length + 'sockets stored in socks and this is the array of socks: ' + socks);
if(socks.length==2){
		 console.log('this is the socket to be used');
		 socks[0].on('entered', function(words){
		 	socks[0].emit('sent', {what: words});
		 });
     socks[1].on('entered', function(words){
      socks[1].emit('sent', {what:words});
     });
   }
});


var express = require('express')
var app = express();
var path = require('path');



//app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.render('testJavascript.jade');
});

var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
server.listen(80);

var socks = [];


io.sockets.on('connection', function (socket) {
 	socks.push(socket);
    console.log('There are currently ' + socks.length + 'sockets stored in socks and this is the array of socks: ' + socks);
    socket.on('disconnect', function(){
        socks.splice(socks.indexOf(socket), 1);
    });
    if(socks.length>=2){
        console.log('this is the socket to be used');
        socks[0].on('entered', function(words){
            socks[1].emit('sent', words);
        });
        socks[1].on('entered', function(words){
            socks[0].emit('sent',words);
        });
    }
});

    

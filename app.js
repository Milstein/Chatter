
var express = require('express')
var app = express();
var path = require('path');



//app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.cookieParser('aslkjdf 98u2oij rvcl;ahwe rp98h whe rlkvh r92p8 yrv9p8wy4trvlo34iwuytilvwureoytwvtrhlvweurthov89trhvlw34hutl;o23hy4pt9v8yqw/oi3;4ht;vlwoiu34hypt v9w387 y4tvlw3iu4 hyt;vly 3w48t9vpw8y3 tpv9w834y t;vw3o4 ytw;o348ty v;wo348yt ;vo34yt v;w3u4y t;vy w98y t;v98wy 3498ty wv;3948y twv938yt ;v9w834y tv;ow8y ;klhj ;wier tv3o84 wou vo34y tv'));
app.use(express.cookieSession());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

var howMany = 0;
app.get('/', function (req, res) {
    res.render('chat.jade');
});

var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
server.listen(80);


io.sockets.on('connection', function (socket) {
    var username = '';
    howMany++;
    socket.on('entered', function(words){
        words.username = username;
        console.log('USERNAME SET');
        io.sockets.emit('sent', words);    
    });
    socket.on('setname', function(name){
        username = name;
    });
});

    

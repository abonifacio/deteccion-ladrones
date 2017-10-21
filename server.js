const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const conf = require('./conf');
const udpserver = require('./udp/udpserver');
const execFile = require('child_process').execFile;
const sharp = require('sharp');

app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

app.get('/', function(req, res){
  res.sendFile(__dirname+'/public/index.html');
});

function onDectionMsg(data){
  io.sockets.volatile.emit('detection','detectado');
}

function onStreamFrame(data){
	sharp(data.toBuffer()).jpeg({quality:70}).toBuffer().then(jpeg => {
  		io.sockets.volatile.emit('frame',jpeg);
	});
}

io.on('connection',function(socket){
  socket.emit('init',conf.detection.coeficiente);

  socket.on('coefChange',function(coef){
    console.log('se cambio el coeficiente',coef);
    conf.detection.coeficiente = coef;
  });
});

http.listen(conf.webserver.port, function(){
  console.log('server http en ',conf.webserver.port);
});

var p_w = execFile('node',['webcam.js'],{cwd:'./webcam'},onExit);
var p_d = execFile('node',['detection.js'],{cwd:'./detection'},onExit);

p_w.stdout.pipe(p_d.stdin)

p_d.stdout.on('data',onDectionMsg);
p_w.stdout.on('data',onStreamFrame);

function onExit(error){
  console.log(error);
}
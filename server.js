const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const conf = require('./conf');
const udpserver = require('./udp/udpserver');
const execFile = require('child_process').execFile;

app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

app.get('/', function(req, res){
  res.sendFile(__dirname+'/public/index.html');
});

function onDectionMsg(data,rinfo){
  io.sockets.volatile.emit('detection',data);
}

function onStreamFrame(data,rinfo){
  io.sockets.volatile.emit('frame',data);
}


udpserver(onDectionMsg).bind(conf.detection.port);
udpserver(onStreamFrame).bind(conf.streaming.port);

http.listen(conf.webserver.port, function(){
  console.log('server http en ',conf.webserver.port);
});

execFile('node',['webcam.js'],{cwd:'./webcam'},onExit);
execFile('node',['detection.js'],{cwd:'./detection'},onExit);

function onExit(error){
  console.log(error);
}
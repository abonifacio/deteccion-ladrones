const express = require('express');
const app = express();
const Sequelize = require('sequelize');
require('sequelize-values')(Sequelize);
var models  = require('./models');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const conf = require('./conf');
const udpserver = require('./udp/udpserver');
//const execFile = require('child_process').execFile;
const spawn = require('child_process').spawn;
const sharp = require('sharp');
var fs = require('fs');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

app.get('/', function(req, res){
  res.sendFile(__dirname+'/public/index.html');
});
app.get('/historico', function(req, res){
  fs.readdir('./public/photos', function(err, items){
    res.render('historico.jade',{
      img: items.reverse()
    })
  })
});

function onDectionMsg(data,rinfo){
  io.sockets.volatile.emit('detection',data.toString());
}
 
function onStreamFrame(data,rinfo){
	sharp(data).jpeg({quality:70}).toBuffer().then(jpeg => {
  		io.sockets.volatile.emit('frame',jpeg);
	});
}

io.on('connection',function(socket){
  models.Conf.findOne({order: [['updatedAt', 'DESC']]}).then(config => { 
    console.log(config.get('coeficiente')); 
    socket.emit('init',config.get('coeficiente'));
  })
  socket.on('coefChange',function(coef){
    models.Conf.create({coeficiente: coef }).then (
      conf => {
           console.log('Se cambio el coeficiente' + coef);
      }
  )
  });
});


udpserver(conf.detection.port,onDectionMsg);
udpserver(conf.streaming.port,onStreamFrame);

http.listen(conf.webserver.port, function(){
  console.log('server http en ',conf.webserver.port);
});

var p_w = spawn('node',['webcam.js'],{cwd:'./webcam'},onExit);
var p_d = spawn('node',['detection.js'],{cwd:'./detection'},onExit);

//p_w.stdout.on('data',console.log);
//p_d.stdout.on('data',console.log);

function onExit(error){
  console.log(error);
}

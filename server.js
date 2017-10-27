const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const conf = require('./conf');
const mongoose = require('mongoose');
const Image = require('./storage/image.model');
const sharp = require('sharp');
const toDetection = require('./udp/udpclient')(conf.ports.detection_coef_in);
const fromDetection = require('./udp/udpserver')(conf.ports.server_detection_in);
const fromWebcam = require('./udp/udpserver')(conf.ports.server_frame_in);

mongoose.connect(conf.database.host);

var COEF = conf.detection.coeficiente;

function Server() {

  	var that = this;

	/**
	 * Inicio Configuracion de rutas y archvios estaticos
	 */
	app.use(express.static(__dirname + '/public'));
	app.use('/bower_components', express.static(__dirname + '/bower_components'));

	app.get('/', function (req, res) {
		res.sendFile(__dirname + '/public/index.html');
	});
	app.get('/historico', function (req, res) {
		Image.find({},function(err,fotos){
			if(err) throw err;
			res.send(fotos);
		});
	});
	/**
	 * Fin Configuracion de rutas y archvios estaticos
	 */

	io.on('connection', function (socket) {
		socket.emit('init',COEF);
		
		socket.on('coefChange', function (coef) {
			COEF = coef;
			io.sockets.volatile.emit('init',coef);
			const tmp = String(coef);
			toDetection.send(tmp,Buffer.byteLength(tmp, 'utf8'));
			console.log('se cambio el coeficiente', coef);
		});
	});
	
	this.start = function(){
		http.listen(conf.ports.server, function () {
			console.log('server http en ', conf.ports.server);
		});
	}
	
	this.sendDetectionMsg = function (msg) {
		io.sockets.volatile.emit('detection', msg);
	}
	
	this.sendImage = function (img) {
		sharp(img.toBuffer()).jpeg({ quality: 70 }).toBuffer().then(jpeg => {
			io.sockets.volatile.emit('frame', jpeg);
		});
	}


}

fromDetection.listen(function(msg){
	server.sendDetectionMsg(msg);
});

fromWebcam.listen(function(frame){
	server.sendImage(frame);
});

const server = new Server();

server.start();



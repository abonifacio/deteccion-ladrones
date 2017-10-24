const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const conf = require('./conf');
const sharp = require('sharp');


function Server() {

	var onCoefChange = function(){}
	var onSocketConnection = function(){}
  var that = this

	/**
	 * Inicio Configuracion de rutas y archvios estaticos
	 */
	app.use(express.static(__dirname + '/public'));
	app.use('/bower_components', express.static(__dirname + '/bower_components'));

	app.get('/', function (req, res) {
		res.sendFile(__dirname + '/public/index.html');
	});
	/**
	 * Fin Configuracion de rutas y archvios estaticos
	 */

	io.on('connection', function (socket) {
		onSocketConnection(socket)
		socket.on('coefChange', function (coef) {
			onCoefChange(coef)
			console.log('se cambio el coeficiente', coef);
			that.sendCoef(coef)
		});
	});
	
	this.onCoefChange = function(callback){
		onCoefChange = callback
	}
	
	this.onSocketConnection = function(callback){
		onSocketConnection = callback
	}
	
	this.start = function(){
		http.listen(conf.webserver.port, function () {
			console.log('server http en ', conf.webserver.port);
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
	
	this.sendCoef = function(arg1,arg2){
		const socket = arg2 && arg1; 
		const coef = arg2 || arg1;
		if(socket){
			socket.emit('init', coef);
		}else{
			io.sockets.volatile.emit('newCoef',coef);
		}
	}
	


}


module.exports = new Server()
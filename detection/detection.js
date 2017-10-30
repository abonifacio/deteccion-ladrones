const conf = require('../conf');
const detection = require('../udp/udpclient')(conf.detection.port);
const Sequelize = require('sequelize');
var Last = undefined;
var models  = require('../models');
const spawn = require('child_process').spawn;
//var gpio = require('rpi-gpio');
//gpio.setup(4,gpio.DIR_OUT,buzzer);


function onData(data){
	models.Conf.findAll({limit:1,order: [['updatedAt', 'DESC']]}).then(function(config) { 
		setTimeout(compare.bind(null,data,config[0].coeficiente),0);
	})
}

// matriz de (conf.webcam.height x conf.webcam.width x 3[RGB]) bytes 
function compare(img,coeficiente){
	const matrix_img = img.getData();
	const N = matrix_img.byteLength;
	var sum = 0;
	var i;
	if(Last){
		for(i=0;i<N;i++){
			sum += matrix_img.readUInt8(i) - Last.readUInt8(i);
		}
		const avg = sum/N;
		if(avg>coeficiente){
			fecha= new Date();
			filename= fecha.toString() + '.png';
			img.save('../public/photos/'+filename);
			console.log('Imagen guardada');
			tellServer(img,coeficiente);
			var p_b = spawn('python',['buzzer.py'],{cwd: '..'});
//			buzzer();
		}
	}
	Last = Buffer.from(matrix_img);
}
//function buzzer(){
//	setTimeout(function(){
//		gpio.write(4,true, compare);
//	}, 500);
//}

function tellServer(img,coeficiente){
	const msg = 'movimiento detectado coeficiente de '+coeficiente;
	detection.send(msg,msg.length);
}


module.exports = onData;

const conf = require('../conf');
const detection = require('../udp/udpclient')(conf.detection.port);
const Sequelize = require('sequelize');
var Last = undefined;
var models  = require('../models');
const spawn = require('child_process').spawn;

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
		//Compara byte a byte la imagen actual con la anterior
		for(i=0;i<N;i++){
			sum += matrix_img.readUInt8(i) - Last.readUInt8(i);
		}
		//Si el cambio promedio es mayor al coeficiente de sensibilidad, se detectó movimiento.
		const avg = sum/N;
		if(avg>coeficiente){
			//Se guarda la foto con fecha y hora
			fecha= new Date();
			filename= fecha.toString() + '.png';
			img.save('../public/photos/'+filename);
			console.log('Imagen guardada');
			tellServer(img,coeficiente);
			//Se crea un proceso que ejecuta un script de python para hacer sonar el buzzer.
			var p_b = spawn('python',['buzzer.py'],{cwd: '..'});
		}
	}
	Last = Buffer.from(matrix_img);
}
//Se le avisa al servidor que se detecto movimiento, para que muestre una alerta.
function tellServer(img,coeficiente){
	const msg = 'movimiento detectado coeficiente de '+coeficiente;
	detection.send(msg,msg.length);
}


module.exports = onData;

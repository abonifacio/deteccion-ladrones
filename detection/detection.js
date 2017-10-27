const conf = require('../conf');
const fromWebcam = require('../udp/udpserver')(conf.ports.detection_frame_in);
const fromServer = require('../udp/udpserver')(conf.ports.detection_coef_in);
const toServer = require('../udp/udpclient')(conf.ports.server_detection_in);
const toStorage = require('../udp/udpclient')(conf.ports.storage_in);

function Detection(){
	var Last = undefined;
	var COEF = conf.detection.coeficiente;
	
	// matriz de (conf.webcam.height x conf.webcam.width x 3[RGB]) bytes 
	this.detect = function(img){
		const matrix_img = img;
		const N = matrix_img.byteLength;
		var sum = 0;
		var i;
		if(Last){
			for(i=0;i<N;i++){
				sum += matrix_img.readUInt8(i) - Last.readUInt8(i);
			}
			const avg = sum/N;
			if(avg>COEF){
				toServer.send('Detectado');
				toStorage.send(img);
			}
		}
		Last = Buffer.from(matrix_img);
	}
	
	this.setCoef = function (coef){
		COEF = coef
	}
	
	this.getCoef = function (coef){
		return COEF
	}
	
}

const detection = new Detection();

fromWebcam.listen(function(img){
	detection.detect(img);
});

fromServer.listen(function(coef){
	detection.setCoef(parseFloat(coef));
});

const conf = require('../conf');


function Detection(){
	var Last = undefined;
	var COEF = conf.detection.coeficiente
	var onDetection = function (){}
	
	// matriz de (conf.webcam.height x conf.webcam.width x 3[RGB]) bytes 
	this.detect = function(img){
		const matrix_img = img.getData();
		const N = matrix_img.byteLength;
		var sum = 0;
		var i;
		if(Last){
			for(i=0;i<N;i++){
				sum += matrix_img.readUInt8(i) - Last.readUInt8(i);
			}
			const avg = sum/N;
			if(avg>COEF){
				onDetection(img)
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

	this.onDetection = function(callback){
		onDetection = callback
	}
}



module.exports = new Detection();
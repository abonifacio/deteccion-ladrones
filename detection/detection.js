const conf = require('../conf');
const detection = require('../udp/udpclient')(conf.detection.port);

var Last = undefined;

var COEF = conf.detection.coeficiente

process.stdin.on('data',compare)

// matriz de (conf.webcam.height x conf.webcam.width x 3[RGB]) bytes 
function compare(img){
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
			process.stdout.write(img)
		}
	}
	Last = Buffer.from(matrix_img);
}

function changeCoef(coef){
	COEF = coef
}

module.exports = {
	changeCoef : changeCoef
};
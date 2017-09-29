const conf = require('../conf');
const detection = require('../udp/udpclient')(conf.detection.port);

var Last = undefined;



function onData(data){
	setTimeout(compare.bind(null,data),0);
}

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
		if(avg>conf.detection.coeficiente){
			tellServer(img);
		}
	}
	Last = Buffer.from(matrix_img);
}

function tellServer(img){
	const msg = 'movimiento detectado coeficiente de '+conf.detection.coeficiente;
	detection.send(msg,msg.length);
}


module.exports = onData;
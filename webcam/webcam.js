const cv = require('opencv');
const conf = require('../conf');
const client = require('../udp/udpclient')(conf.webcam.port);

const DELAY = 1 / conf.webcam.fps;

const camara = new cv.VideoCapture(0); 
camara.setWidth(630);
camara.setHeight(465);

function readCamara(){
	camara.read(function(err,img){
		if(err) throw err;
		const data = img.toBuffer();

		client.send(data,function(){
			setTimeout(readCamara,DELAY);
		});

	});
}

readCamara();
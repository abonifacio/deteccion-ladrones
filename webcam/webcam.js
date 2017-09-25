const cv = require('opencv');
const conf = require('../conf');
const detection = require('../udp/udpclient')(conf.webcam.port);
const streaming = require('../udp/udpclient')(conf.streaming.port);

const DELAY = 1000 / conf.webcam.fps;
// const DELAY = 300;

const camara = new cv.VideoCapture(0); 
camara.setWidth(630);
camara.setHeight(465);


function readCamara(){
	camara.read(function(err,img){
		if(err) throw err;
		const data = img.toBuffer();
		detection.send(data);
		streaming.send(data,function(){
			setTimeout(readCamara,DELAY);
		});

	});
}

readCamara();
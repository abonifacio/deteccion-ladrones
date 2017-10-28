const cv = require('opencv');
const conf = require('../conf');
const toServer = require('../udp/udpclient')(conf.ports.server_frame_in);
const toDetection = require('../udp/udpclient')(conf.ports.detection_frame_in);


const DELAY = 1000 / conf.webcam.fps;
const WIDTH  = conf.webcam.width;
const HEIGHT = conf.webcam.height;


function Camara(){
	const webcam = new cv.VideoCapture(0); 
	webcam.setWidth(WIDTH);
	webcam.setHeight(HEIGHT);

	var interval = undefined
	
	this.start = function(){
		interval = setInterval(readCamara,DELAY)
	}
	
	this.stop = function(){
		if(interval){
			cancelInterval(interval)
		}
	}

	function readCamara(){
		webcam.read((err,img)=>{
			if(err) throw err;
			toDetection.send(img.getData());
			toServer.send(img.toBuffer());
		});
	}

}

process.on('SIGTERM',()=>{
	camara.stop();
})

const camara = new Camara();

camara.start();
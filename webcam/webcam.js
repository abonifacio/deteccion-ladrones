const cv = require('opencv');
const conf = require('../conf');

const DELAY = 1000 / conf.webcam.fps;
const WIDTH  = conf.webcam.width;
const HEIGHT = conf.webcam.height;

const webcam = new cv.VideoCapture(0); 
webcam.setWidth(WIDTH);
webcam.setHeight(HEIGHT);

/**
 * @callback Camara~onData
 * @param {Image} img
 */

/**
 * 
 * @param {Camara~onData} onData - Callback que maneja un frame 
 */
function Camara(){
	var interval = undefined

	var onData = function(){};
	
	this.start = function(){
		interval = setInterval(readCamara,DELAY)
	}
	
	this.stop = function(){
		if(interval){
			cancelInterval(interval)
		}
	}

	this.onFrame = function(callback){
		onData = callback
	}

	function readCamara(){
		webcam.read((err,img)=>{
			if(err) throw err;
			onData(img);
		});
	}

}


module.exports = new Camara()
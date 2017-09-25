const conf = require('../conf');

const server = require('../udp/udpserver');
const detection = require('../udp/udpclient')(conf.detection.port);


function onData(data,rinfo){
	var mov = false;
	if(mov){
		const msg = 'movimiento';
		detection.send(msg,msg.length);
	}
}

server(onData).bind(conf.webcam.port);





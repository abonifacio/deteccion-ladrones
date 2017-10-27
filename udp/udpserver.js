const dgram = require('dgram');

function createServer(PORT,onData){
	const server = dgram.createSocket('udp6');
	server.on('error', (err) => {
	  server.close();
	});
	
	server.on('listening', () => {
		const address = server.address();
	  console.log('UDP server corriendo',address);
	});
	
	
	return {
		listen : function(onData){
			server.on('message',onData);
			server.bind(PORT);
		}
	}

}

module.exports = createServer;
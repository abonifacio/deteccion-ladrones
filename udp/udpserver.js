const dgram = require('dgram');

function createServer(onData){
	const server = dgram.createSocket('udp4');
	server.on('error', (err) => {
	  server.close();
	});
	
	server.on('message',onData);

	server.on('listening', () => {
	  const address = server.address();
	  console.log('UDP server corriendo',address);
	});

	return server;
}

module.exports = createServer;
const msn = require('messenger');

function createServer(PORT){
	const server = msn.createListener(PORT);

	return {
		listen : function(onData){
			server.on('data',function(message,data){
				onData(data);
			});

		}
	}

}

module.exports = createServer;
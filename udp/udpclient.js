const dgram = require('dgram');
const HOST = require('../conf').common.host;

// data -> ArrayBuffer
// callback -> function(bytes){}

function createClient(PORT){
	const client = dgram.createSocket('udp4');

	function sendAny(data,length,callback){
		client.send(data,0,length,PORT,HOST,function(err,bytes){
			if(err) throw err;
			if(callback) callback(bytes);
		});
	}
	
	return {
		send : function(data,lengthOrcallback,callback){
			if(lengthOrcallback && typeof lengthOrcallback == 'function'){
				sendAny(data,data.byteLength,callback);
			}else{
				sendAny(data,lengthOrcallback,callback);
			}
		}
	};
}
module.exports = createClient;
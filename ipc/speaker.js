const msn = require('messenger');

function createClient(PORT){
	const client = msn.createSpeaker(PORT);


	function sendAny(data,callback){

		client.request('data',data,function(bytes){
			if(callback) callback(bytes);
		});
	}
	
	return {
		send : function(data,callback){
			sendAny(data,callback);
		}
	};
}
module.exports = createClient;
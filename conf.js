const conf = {
	ports:{
		server:8090,
		detection_frame_in:8080,
		server_frame_in:8081,
		server_detection_in:8082,
		storage_in:8083,
		detection_coef_in:8084
	},
	database:{
		host:'mongodb://localhost/deteccionladrones' 
	},
	webcam:{
		width:100,
		height:100,
		channels:3,
		fps:25
	},
	detection: {
		coeficiente:1.2
	}
}

module.exports = conf;
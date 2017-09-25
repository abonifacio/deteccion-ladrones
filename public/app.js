$(document).ready(function() { 
	$.material.init();

	var socket 	= io();
	var image 	= new Image();
	var canvas 	= document.getElementById("video-canvas");
	var ctx 	= canvas.getContext("2d");
	ctx.rect(0,0,640,480);
	ctx.stroke();
	
	socket.on('frame',function(data){
		drawImage(ctx,data);
	});

	function drawImage(ctx, buffer) {
		var uint8Arr = new Uint8Array(buffer);
		var str = String.fromCharCode.apply(null, uint8Arr);
		var base64String = btoa(str);
		image.onload = function() {
			ctx.drawImage(this, 0,0, canvas.width, canvas.height);
		};
		image.src = 'data:image/png;base64,' + base64String;
	}
});

$(document).ready(function() { 
	$.material.init();


	var c=document.getElementById("video-canvas");
	var ctx=c.getContext("2d");
	ctx.rect(0,0,640,480);
	ctx.stroke();
});

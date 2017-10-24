(function(){

	'use strict';

	angular.module('deteccionLadronesApp',[
		'ui.router',
		'ngAnimate'
	])
	.run(function(){
		$.material.init();
	})
})();

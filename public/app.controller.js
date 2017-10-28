(function(){
    
    'use strict';
    
    angular.module('deteccionLadronesApp')
    .controller('AppController',AppController)
    
    AppController.$inject = ['$scope','SocketService'];
    
    function AppController($scope,SocketService){
        var ctx = this;


        SocketService.on('init',function(coef){
            $scope.$broadcast('setCoef',coef);
        });
        
        SocketService.on('detection',function(msg){
            $scope.$broadcast('detection',msg);
        });
        
        SocketService.on('frame',function(frame){
            $scope.$broadcast('frame',frame);
        });

        $scope.$on('sendCoef',function(event,coef){
            SocketService.emit('coefChange',coef);
        });
        
    }

})();

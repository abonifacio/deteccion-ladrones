(function(){
    
    'use strict';
    
    angular.module('deteccionLadronesApp')
    .controller('HistoricoController',HistoricoController)
    
    HistoricoController.$inject = ['SocketService'];
    
    function HistoricoController(SocketService){
        var vm = this;
        
    }

})();









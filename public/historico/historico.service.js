(function(){
    
    'use strict';
    
    angular.module('deteccionLadronesApp')
    .factory('HistoricoService',HistoricoService)
    
    HistoricoService.$inject = ['$http','SocketService'];
    
    function HistoricoService($http,SocketService){

        return {
            get:get,
            remove:remove
        }
        function get(){
            return $http.get('/historico');
        }
        function remove(){
            return $http.delete('/historico');
        }
        
    }

})();









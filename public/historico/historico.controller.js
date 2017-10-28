(function(){
    
    'use strict';
    
    angular.module('deteccionLadronesApp')
    .controller('HistoricoController',HistoricoController)
    
    HistoricoController.$inject = ['HistoricoService'];
    
    function HistoricoController(HistoricoService){
        var vm = this;

        vm.fotos = [];

        vm.delete = function(){
            HistoricoService.remove().then(function(response){
                parseFotos(response.data);
            })
        }
        
        vm.refresh = function(){
            HistoricoService.get().then(function(response){
                parseFotos(response.data);
            });
        }
        
        function parseFotos(fotos){
            vm.fotos = [];
            angular.forEach(fotos,function(img){
                if(img.image && img.image.data){
                    var uint8Arr = new Uint8Array(img.image.data.data);
                    var str = String.fromCharCode.apply(null, uint8Arr);
                    var foto = {
                        time : img.time,
                        data: 'data:'+img.image.contentType+';base64,' + btoa(str)
                    }
                    vm.fotos.push(foto);
                }
            });
        }

        vm.refresh();
        
    }

})();









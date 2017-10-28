(function(){
    'use strict';

    angular.module('deteccionLadronesApp')
    .config(AppStates);

    AppStates.$inject = ['$stateProvider'];

    function AppStates($stateProvider){
        $stateProvider.state('app',{
            template:'<div ui-view></div>',
            controller:'AppController',
            controllerAs:'ctx',
            abstract:true
        })

        $stateProvider.state('home',{
            parent:'app',
            url:'/',
            templateUrl:'home/home.html',
            controller:'HomeController',
            controllerAs:'vm'
        })
        $stateProvider.state('historico',{
            parent:'app',
            url:'/historico',
            templateUrl:'historico/historico.html',
            controller:'HistoricoController',
            controllerAs:'vm'
        })
        ;

    }
})();
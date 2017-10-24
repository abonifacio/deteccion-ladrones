(function(){
    'use strict';

    angular.module('deteccionLadronesApp')
    .config(AppStates);

    AppStates.$inject = ['$stateProvider'];

    function AppStates($stateProvider){

        $stateProvider.state('home',{
            url:'/',
            templateUrl:'home/home.html',
            controller:'HomeController',
            controllerAs:'vm'
        })
        $stateProvider.state('historico',{
            url:'/historico',
            templateUrl:'historico/historico.html'
        })
        ;

    }
})();
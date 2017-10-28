(function(){
    
    'use strict';
    
    angular.module('deteccionLadronesApp')
    .controller('HomeController',HomeController)
    
    HomeController.$inject = ['$scope','$timeout'];
    
    function HomeController($scope,$timeout){
        var vm = this;
        
        var video = new Video();
        vm.alerts = new Alerts($timeout);
        vm.sensibilidad = new Sensibilidad();

        $scope.$on('setCoef',function(event,coef){
            vm.sensibilidad.init(coef);
        });
        vm.sensibilidad.onCoefChange(function(coef){
            $scope.$emit('sendCoef',coef);
        });

        $scope.$on('detection',function(event,msg){
            vm.alerts.add(msg);
        });

        $scope.$on('frame',function(event,data){
            video.drawFrame(data);
        });

        
    }

    function Sensibilidad(){
        var actual = 0;
        var coef = 0;
        var MAX = 2.0;
        var that = this;
        var coefChange = function(){};
    
        // socket.on('init',init);
    
        this.init = function(coef){
            actual = (1-coef/MAX)*100;
        }

        this.inc = function(){
            if(actual<90){
                actual += 10;
                coefChange(getCoef());
            }
        };
        this.dec = function(){
            if(actual>10){
                actual -= 10;
                coefChange(getCoef());
            }
        };

        this.get = function(){
            return actual;
        }
    
        function getCoef(){
            return (1-actual/100)*MAX;
        }
   
        this.onCoefChange = function(cb){
            coefChange = cb;
        }
    }
    function Alerts($timeout){
        var alerts = []
        var that = this;
        var alertTimeout = undefined;
    
        this.add = function(msg){
            if(alerts.length>0){
                $timeout.cancel(alertTimeout);
                alertTimeout = $timeout(removeAlert,2000);
            }else{
                alerts.push({msg:msg,title:'¡Atención!'});
                alertTimeout = $timeout(removeAlert,2000);
            }
        }

        function removeAlert(){
            alerts.pop();
        }

        this.get = function(){
            return alerts;
        }

        this.remove = function(index){
            alerts.splice(index,1);
        }
    
    }
    
    function Video(){
        var image 	= new Image();
        var canvas 	= document.getElementById("video-canvas");
        var ctx 	= canvas.getContext("2d");
    
        resizeCanvas();
        $(window).on("resize", function(){                      
            resizeCanvas();
        });
    
        function resizeCanvas(){
            var w = $('#canvas-wrapper').width();
            canvas.width = w;
            canvas.height = w/1.33;
            ctx.rect(0,0,canvas.width,canvas.height);
            ctx.stroke();
        }
    
        this.drawFrame = function(buffer) {
            var uint8Arr = new Uint8Array(buffer);
            var str = String.fromCharCode.apply(null, uint8Arr);
            var base64String = btoa(str);
            image.onload = function() {
                ctx.drawImage(this, 0,0, canvas.width, canvas.height);
            };
            image.src = 'data:image/png;base64,' + base64String;
        }
        

    
    }

})();









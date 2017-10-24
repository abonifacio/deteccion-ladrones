(function(){
    
    'use strict';
    
    angular.module('deteccionLadronesApp')
    .controller('HomeController',HomeController)
    
    HomeController.$inject = ['SocketService'];
    
    function HomeController(SocketService){
        var vm = this;
        
        var video = new Video(SocketService);
        vm.alerts = new Alerts(SocketService);
        vm.sensibilidad = new Sensibilidad(SocketService);
        
    }

    function Sensibilidad(socket){
        var actual = 0;
        var coef = 0;
        var MAX = 2.0;
        var that = this;
    
        socket.on('init',init);
    
        function init(coef){
            actual = (1-coef/MAX)*100;
        }

        this.inc = function(){
            if(actual<90){
                actual += 10;
                sendCoef();
            }
        };
        this.dec = function(){
            if(actual>10){
                actual -= 10;
                sendCoef();
            }
        };

        this.get = function(){
            return actual;
        }
    
        function getCoef(){
            return (1-actual/100)*MAX;
        }
    
        function sendCoef(){
            socket.emit('coefChange',getCoef());
        }
    }
    function Alerts(socket){
        var alerts = []
        var that = this;
    
        socket.on('detection',function(msg){
            that.add(msg);
        });
    
        this.add = function(msg){
            if(alerts.size>2) return;
            var alert = {msg:msg,title:'¡Atención!'};
            alerts.push(alert);
            setTimeout(function(){
                var i = alerts.indexOf(alert);
                alerts.splice(i,1);
            },5000);
        }

        this.get = function(){
            return alerts;
        }

        this.remove = function(index){
            alerts.splice(index,1);
        }
    
    }
    
    function Video(socket){
        var image 	= new Image();
        var canvas 	= document.getElementById("video-canvas");
        var ctx 	= canvas.getContext("2d");
    
        resizeCanvas();
        $(window).on("resize", function(){                      
            resizeCanvas();
        });
    
        socket.on('frame',function(data){
            drawImage(ctx,data);
        });
    
        function resizeCanvas(){
            var w = $('#canvas-wrapper').width();
            canvas.width = w;
            canvas.height = w/1.33;
            ctx.rect(0,0,canvas.width,canvas.height);
            ctx.stroke();
        }
    
        function drawImage(ctx, buffer) {
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









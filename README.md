# TDPII
Detección de ladrones con RaspberryPi y webcam

## Instalación

``` sh
$ sudo chmod 755 ./install.sh
$ sudo ./install.sh
``` 


#### Correr servidor con streaming

``` sh
$ node server.js
``` 
En otra terminal correr localtunnel
``` sh
$ lt --subdomain deteccion --port 8090
``` 

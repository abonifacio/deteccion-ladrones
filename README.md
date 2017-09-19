# TDPII
Detección de ladrones con RaspberryPi y webcam

## Instalación

``` sh
$ sudo chmod 755 ./install_simplecv.sh
$ sudo ./install_simplecv.sh
``` 
## Instalar django

```pip install django
``` 
Ir a la carpeta 'servidorcam' y correr

```./manage.py migrate
``` 

En 'settings.py' editar STATICFILES_DIR con el directorio donde tienen el archivo de la camara.
En 'webcam.py' editar la direccion de la base de datos para que se conecte.
#### Correr webcam con detección de movimiento

``` sh
$ cd webcam
$ python webcam.py
``` 

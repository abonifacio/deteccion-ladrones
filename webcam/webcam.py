from SimpleCV import *
from webcam_conf import conf
import sqlite3
import time

cam = Camera()
last = cam.getImage()


sleep_time = 1.0/conf['fps']
print 'Configuracion: [fps=',conf['fps'],'] [mov_coef=',conf['mov_coef'],']' 
conn = sqlite3.connect('/home/brian/deteccion-ladrones/servidorcam/chorro')
while True:
	img = cam.getImage()
	#calcula entre una imagen a la otra y le calcula el promedio
	diff = img - last
	matrix = diff.getNumpy()
	avg = matrix.mean()
	#si hay mucha diferencia entre la img y last hubo movimiento 
	nombre=time.ctime()+".png"
	if avg>conf['mov_coef']:
		img.drawText(text='Movimiento Detectado', color=(255, 0, 0), fontsize=24)
		print 'Diferencia promedio: ',avg
		img.save(nombre)
		#Agrega el nombre del archivo a la base de datos para que la vista la pueda encontrar
		c=conn.cursor()
		c.execute("INSERT INTO server_foto (DIR) VALUES (?)",(nombre,))
		conn.commit()
	last = img
	# print mean
	img.show()
	time.sleep(sleep_time)
conn.close() #Nunca deberia llegar a ejecutar eso
from SimpleCV import Camera
from webcam_conf import conf
import time

cam = Camera()

last = cam.getImage()


sleep_time = 1.0/conf['fps']
print 'Configuracion: [fps=',conf['fps'],'] [mov_coef=',conf['mov_coef'],']' 

while True:
	img = cam.getImage()
	#calcula entre una imagen a la otra y le calcula el promedio
	diff = img - last
	matrix = diff.getNumpy()
	avg = matrix.mean()
	#si hay mucha diferencia entre la img y last hubo movimiento 
	if avg>conf['mov_coef']:
		img.drawText(text='Movimiento Detectado', color=(255, 0, 0), fontsize=24)
		print 'Diferencia promedio: ',avg
	last = img
	# print mean
	img.show()
	time.sleep(sleep_time)
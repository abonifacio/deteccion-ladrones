const conf = require('./conf');

const DETECTION = require('./detection/detection')
const WEBCAM = require('./webcam/webcam')
const SERVER = require('./server')

WEBCAM.onFrame((img)=>{
    SERVER.sendImage(data)
    DETECTION.detect(data)
})

DETECTION.onDetection((img)=>{
    SERVER.sendDetectionMsg('Movimiento Detectado')
})

SERVER.onCoefChange((coef)=>{
    DETECTION.setCoef(coef)
    SERVER.sendCoef(coef)
})

SERVER.onSocketConnection((socket)=>{
    SERVER.sendCoef(socket,DETECTION.getCoef())
})

SERVER.start()
WEBCAM.start()
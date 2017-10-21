const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const conf = require('./conf');
const sharp = require('sharp');

const DETECTION = require('./detection/detection')
const WEBCAM = require('./webcam/webcam')
const SERVER = require('./server')

WEBCAM.onFrame((img)=>{
    SERVER.sendImage(data)
    DETECTION.detect(data)
})

DETECTION.onDetection((img)=>{
    SERVER.sendDetectionMsg('detectadao')
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
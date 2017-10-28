const conf = require('./conf');
const cv = require('opencv');
const sharp = require('sharp');
const mongoose = require('mongoose');
const Image = require('./storage/image.model');
// const getPixels = require("get-pixels");

mongoose.connect(conf.database.host);


// Image.find({},console.log);


const webcam = new cv.VideoCapture(0); 
webcam.setWidth(conf.webcam.width);
webcam.setHeight(conf.webcam.height);

interval = setInterval(readCamara,40);

function readCamara(){
    webcam.read((err,img)=>{
        if(err) throw err;
        const mt = img.getData();
        sharp(mt
            ,{
                raw:{
                    width:conf.webcam.width,
                    height: conf.webcam.height,
                    channels:conf.webcam.channels
                }
            }
        ).jpeg({quality:70}).toBuffer().then((buff)=>{
            const image = new Image({
                image: {data: buff, contentType: 'image/jpg'},
                time: new Date()
            });
            image.save();
            console.log(buff);
        });
    });
}

process.on('SIGINT',()=>{
    clearInterval(interval);
})
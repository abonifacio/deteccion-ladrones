const conf = require('./conf');
const cv = require('opencv');
const sharp = require('sharp');
const mongoose = require('mongoose');
const Image = require('./storage/image.model');
const msn = require("messenger");

// mongoose.connect(conf.database.host);


// Image.find({},console.log);

const s = msn.createListener(8085);
const c = msn.createSpeaker(8085);

const webcam = new cv.VideoCapture(0); 
webcam.setWidth(conf.webcam.width);
webcam.setHeight(conf.webcam.height);

interval = setInterval(readCamara,40);

function readCamara(){
    webcam.read((err,img)=>{
        if(err) throw err;
        const tmp = {
            buffer : img.toBuffer()
        }
        img.convertGrayscale();
        tmp.matrix = img.getData();
        c.request('data',tmp);
        // const mt = img.getData();
        // sharp(mt
        //     ,{
        //         raw:{
        //             width:conf.webcam.width,
        //             height: conf.webcam.height,
        //             channels:conf.webcam.channels
        //         }
        //     }
        // ).jpeg({quality:70}).toBuffer().then((buff)=>{
        //     const image = new Image({
        //         image: {data: buff, contentType: 'image/jpg'},
        //         time: new Date()
        //     });
        //     image.save();
        //     console.log(buff);
        // });
    });
}

s.on('data',function(message,data){
    console.log(data.matrix,data.buffer);
// process.on('SIGINT',()=>{
//     clearInterval(interval);
})
const mongoose = require('mongoose');
const sharp = require('sharp');
const conf = require('../conf');
const Image = require('./image.model');
fromDetection = require('../ipc/listener')(conf.ports.storage_in);

mongoose.connect(conf.database.host);

fromDetection.listen(function(img){
    sharp(Buffer.from(img.data)).jpeg({quality:70}).toBuffer().then((buff)=>{
        const image = new Image({
            image: {data: buff, contentType: 'image/jpg'},
            time: new Date()
        });
        image.save();
    });
});
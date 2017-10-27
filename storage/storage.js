const mongoose = require('mongoose');
const conf = require('../conf');
const Image = require('./image.model');
fromDetection = require('../udp/udpserver')(conf.ports.storage_in);


mongoose.connect(conf.database.host); 

fromDetection.listen(function(img){
    // const image = new Image({
        
    // });
    // image.save();
    console.log(img.toBuffer);
});

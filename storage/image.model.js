const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    image: {data: Buffer, contentType: String},
    time: Date
 });

 const Image = mongoose.model('Image',ImageSchema);

 module.exports = Image;
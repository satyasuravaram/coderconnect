const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var ImageSchema = new Schema({
    userId: {
        type: String,
        default: "",
        required: true
    },
    imageData: {
        type: String,
        required: true
    }
});

var Image = mongoose.model('Image', ImageSchema);

module.exports = Image;
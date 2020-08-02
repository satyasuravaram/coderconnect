var express = require('express');
var Image = require('../models/image');
var ImageRouter = express.Router();


//filters files by file type to make sure it is an image
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        // rejects storing a file
        cb(null, false);
    }
}

ImageRouter.route("/uploadbase")
    .post((req, res, next) => {
        const newImage = new Image({
            userId: req.body.userId,
            imageData: req.body.imageData
        });

        newImage.save()
            .then((result) => {
                res.status(200).json({
                    success: true,
                    document: result
                });
            })
            .catch((err) => next(err));
    });

module.exports = ImageRouter;
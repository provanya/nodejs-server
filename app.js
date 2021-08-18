const sharp = require("sharp");
sharp('./public/images/upload_images/test.jpg')
    .resize(200, 200)
    .toFile("out_1.jpg")

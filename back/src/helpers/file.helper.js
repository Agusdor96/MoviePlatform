const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const uploadFiles = (buffer, filename) => {
    const uploadPath = 'uploads/' + filename;
    return new Promise((resolve, reject) => {
        fs.writeFile(uploadPath, buffer, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(uploadPath);
            }
        });
    });
};

const processImage = async (file) => {
    const posterBuffer = await sharp(file.buffer)
        .webp({ quality: 80 }) 
        .toBuffer();

    const uniqueSuffix = Date.now()
    const filename = `${file.fieldname}.${uniqueSuffix}.webp`;
    const location = await uploadFiles(posterBuffer, filename);
    return location; 
};


module.exports = {
    uploadFiles, processImage
}
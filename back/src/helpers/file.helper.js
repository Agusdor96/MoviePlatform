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
                resolve(uploadPath); // Devuelve la ruta completa del archivo subido
            }
        });
    });
};

const processImage = async (file) => {
    const posterBuffer = await sharp(file.buffer)
        .webp({ quality: 80 }) // Ajusta la calidad según tus necesidades
        .toBuffer();

    const uniqueSuffix = Date.now()
    const filename = `${file.fieldname}.${uniqueSuffix}.webp`;
    const location = await uploadFiles(posterBuffer, filename);
    return location; // Devuelve la ruta completa del archivo subido
};


module.exports = {
    uploadFiles, processImage
}
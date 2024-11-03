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

const deleteFile = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
                // El archivo no existe, podemos resolver sin eliminar
                resolve('Archivo no existe, no se eliminó.');
            } else {
                fs.unlink(filePath, (err) => {
                    if (err) {
                        reject(new Error('Error al eliminar el archivo: ' + err.message));
                    } else {
                        resolve('Archivo eliminado correctamente');
                    }
                });
            }
        });
    });
}

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
    uploadFiles, processImage, deleteFile
}
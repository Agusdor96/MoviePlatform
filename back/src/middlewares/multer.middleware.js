const multer = require('multer');
const { MulterError } = multer
const fileValidator = require('../utils/fileValidator');

const multerMidd = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5242880 }, 
    fileFilter: fileValidator
});

const multerErrorHandler = (err, req, res, next) => {
    if (err instanceof MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).send({ message: 'El tamaño del archivo es demasiado grande. El límite es 5MB.' })
      }
    } else if (err) {
      return res.status(400).send({ message: err.message })
    }
    next()
  }

module.exports = {multerMidd, multerErrorHandler};
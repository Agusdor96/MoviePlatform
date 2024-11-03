const fileValidator = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|webp/
    const extname = fileTypes.test(file.mimetype.toLowerCase())
  
    if (!extname) {
      return cb(new Error('Tipo de archivo no permitido'))
    }
    return cb(null, true)
  }
  
  module.exports = fileValidator
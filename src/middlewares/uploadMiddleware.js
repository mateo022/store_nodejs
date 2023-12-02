const multer = require('multer');

// Configurar la carpeta de destino y el nombre del archivo
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/imgs');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

// Crear el middleware de carga de archivos
const upload = multer({ storage: storage });

module.exports = upload;
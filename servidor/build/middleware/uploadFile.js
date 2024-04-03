"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const app_1 = require("../app"); // Importa el objeto de Socket.io
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        //cb(null, path.join(__dirname, '../assets/img/perfiles/profesores/')); // Ruta donde se guardarán los archivos subidos en la carpeta especificada 
        cb(null, path_1.default.join(__dirname, '../../brincoteca-app.orquiholic.com/app/assets'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path_1.default.extname(file.originalname)); // Nombre de archivo único
    }
});
const upload = (0, multer_1.default)({ storage: storage }).single('myfile'); // Nombre del campo de archivo en el formulario
const uploadFile = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            app_1.io.emit("ruta-detectada-server", { mensaje: 'Error: ' + err });
            // Manejar el error aquí, por ejemplo, enviar una respuesta de error al cliente
            return res.status(500).send('Error al subir el archivo.');
        }
        // Verifica si req.file está definido antes de usarlo
        if (!req.file) {
            app_1.io.emit("ruta-detectada-server", { mensaje: 'Error: Archivo no recibido.' });
            return res.status(400).send('Error: Archivo no recibido.');
        }
        // El archivo se ha subido correctamente
        app_1.io.emit("ruta-detectada-server", { mensaje: 'Archivo subido correctamente a la ruta: ' + req.file.path });
        res.status(200).send('Archivo subido correctamente.');
    });
};
exports.uploadFile = uploadFile;

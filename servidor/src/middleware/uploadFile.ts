import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import { io } from "../app"; // Importa el objeto de Socket.io
import { handleHttp } from "../utils/error.handle"

const storage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
    //cb(null, path.join(__dirname, '../assets/img/perfiles/profesores/')); // Ruta donde se guardarán los archivos subidos en la carpeta especificada 
    cb(null, path.join(__dirname, '../../brincoteca-app.orquiholic.com/app/assets'));
  },
  filename: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Nombre de archivo único
  }
});

const upload = multer({ storage: storage }).single('myfile'); // Nombre del campo de archivo en el formulario

export const uploadFile = (req: Request, res: Response) => {
  upload(req, res, (err: any) => {
    if (err) {
      io.emit("ruta-detectada-server", { mensaje: 'Error: ' + err });
      // Manejar el error aquí, por ejemplo, enviar una respuesta de error al cliente
      return res.status(500).send('Error al subir el archivo.');
    }

    // Verifica si req.file está definido antes de usarlo
    if (!req.file) {
      io.emit("ruta-detectada-server", { mensaje: 'Error: Archivo no recibido.' });
      return res.status(400).send('Error: Archivo no recibido.');
    }

    // El archivo se ha subido correctamente
    io.emit("ruta-detectada-server", { mensaje: 'Archivo subido correctamente a la ruta: ' + req.file.path });
    res.status(200).send('Archivo subido correctamente.');
  });
};
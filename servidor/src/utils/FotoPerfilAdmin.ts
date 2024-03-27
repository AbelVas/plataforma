import multer from 'multer';
import { Request, Response, NextFunction } from 'express';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, '../../../plataforma/src/assets'); // Directorio donde se guardarán los archivos subidos
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  });

  const upload = multer({ storage: storage });

  export function handleFileUpload(req: Request, res: Response, next: NextFunction) {
    upload.single('file')(req, res, (err: any) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: 'Error al subir el archivo', message: err.message });
      } else if (err) {
        return res.status(500).json({ error: 'Error interno del servidor', message: err.message });
      }
  
      next();
    });
  }
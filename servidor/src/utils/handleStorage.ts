import multer, { diskStorage } from "multer";
import conexion from "../config/database";
import * as path from 'path';

var rutapadre:any;
var rutahijo = `../../../brincoteca-app.orquiholic.com/src/assets/img/perfiles/profesores/`;
var rutalive = `assets/img/perfiles/profesores/`;
var rutaimagen:any;

const storage = diskStorage({
    destination:function (req, file, cb){
        //rutapadre = `${__dirname}`;
        const destinationPath = path.join(__dirname, rutahijo);
        //const rutafinal = rutapadre+rutahijo;
        
        cb(null, destinationPath);
    },
    filename: function (req, file, cb){
        const {nombre} = req.params;
        const ext= file.originalname.split(".").pop();
        const filename = `${nombre}.${ext}`;
        
        const imagenperfil = async(rutabd:string) => {
            const update = await conexion.query("UPDATE tbProfesor set imagen = ? WHERE idProfesor = ?",[rutabd,nombre]);
        }
        const ruta:any = rutalive+filename;
        imagenperfil(ruta);

        cb(null, filename)
    }

});

const uploadMiddleware = multer({storage});

export {uploadMiddleware}
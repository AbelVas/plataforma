import multer, { diskStorage } from "multer";
import conexion from "../config/database";


var rutapadre:any;
var rutahijo = `/../../../plataforma/src/assets/img/perfiles/alumnos/`;
var rutaimagen:any;

const storage = diskStorage({
    destination:function (req, file, cb){
        rutapadre = `${__dirname}`;
        const rutafinal = rutapadre+rutahijo;
        
        cb(null, rutafinal);
    },
    filename: function (req, file, cb){
        const {nombre} = req.params;
        const ext= file.originalname.split(".").pop();
        const filename = `${nombre}.${ext}`;
        
        const imagenperfil = async(rutabd:string) => {
            const update = await conexion.query("UPDATE tbAlumno set imagen = ? WHERE idAlumno = ?",[rutabd,nombre]);
        }
        const ruta:any = rutahijo+filename;
        imagenperfil(ruta);

        cb(null, filename)
    }

});

const uploadMiddleware = multer({storage});

export {uploadMiddleware}
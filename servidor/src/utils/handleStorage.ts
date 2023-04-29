import multer, { diskStorage } from "multer";
import conexion from "../config/database";
//cambio sin nada, solo para generar el cambio
var rutapadre:any;
var rutahijo = `/../../../servidor/src/assets/img/perfiles/profesores/`;
var rutaimagen:any;

const storage = diskStorage({
    destination:function (req, file, cb){
        rutapadre = `${__dirname}`;
        const rutafinal = rutapadre+rutahijo;
        
        cb(null, rutafinal);
    },
    filename: function (req, file, cb){
        const {id} = req.params;
        const ext= file.originalname.split(".").pop();
        const filename = `${id+'-'+Date.now()+'-'+file.originalname}`;
        
        const imagenperfil = async(rutabd:string) => {
            const update = await conexion.query("UPDATE tbProfesor set imagen = ? WHERE idProfesor = ?",[rutabd,id]);
        }
        const ruta:any = rutahijo+filename;
        imagenperfil(ruta);

        cb(null, filename)
    }

});

const uploadMiddleware = multer({storage});

export {uploadMiddleware}
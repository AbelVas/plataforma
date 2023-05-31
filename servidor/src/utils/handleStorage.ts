import multer, { diskStorage } from "multer";
import conexion from "../config/database";
//cambio sin nada, solo para generar el cambio

var rutaFinal='/home/flrsjejd/_hosting/brincoteca-server.orquiholic.com/content/'
const storage = diskStorage({
    destination:'/home/flrsjejd/_hosting/brincoteca-server.orquiholic.com/content/',
    filename: function (req, file, cb){
        const {id} = req.params;
        const ext= file.originalname.split(".").pop();
        const filename = `${id+'-'+Date.now()+'-'+file.originalname}`;
        cb(null,filename)

        
        const imagenperfil = async(rutabd:string) => {
            const update = await conexion.query("UPDATE tbProfesor set imagen = ? WHERE idProfesor = ?",[rutabd,id]);
        }
        imagenperfil(rutaFinal);

        cb(null, filename)
      
    }

});
const uploadMiddleware = multer({storage:storage});
export {uploadMiddleware}
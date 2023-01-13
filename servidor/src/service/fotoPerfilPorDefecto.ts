import { Request} from "express";
import conexion from "../config/database";

const obtenerImagenCategoriaService= async(id:string) =>{
    const responseGet=await conexion.query('SELECT ip.ruta FROM tbImagenPerfil ip INNER JOIN tbCategoriaImagenPerfil im WHERE im.idCategoriaImagenPerfil=?',[id]);
    return responseGet;
}

export {obtenerImagenCategoriaService}
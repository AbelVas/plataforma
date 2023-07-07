import { Request} from "express";
import conexion from "../config/database";

const obtenerImagenCategoriaService= async(id:string) =>{
    const responseGet=await conexion.query('SELECT ruta FROM tbImagenPerfil WHERE idCategoriaImagenPerfil=?',[id]);
    return responseGet;
}

export {obtenerImagenCategoriaService}
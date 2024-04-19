import { Request,Response } from "express"
import { obtenerImagenCategoriaService } from "../service/fotoPerfilPorDefecto"
import { handleHttp } from "../utils/error.handle"

const obtenerImagenCategoria=async(req:Request, res:Response)=>{
    try {
        const {id}=req.params
        const response=await obtenerImagenCategoriaService(id);
        res.send(response)
    } catch (e) {
        handleHttp(e, req, res);
    }
}

export {obtenerImagenCategoria}
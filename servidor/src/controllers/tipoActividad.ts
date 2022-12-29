import { Request,Response } from "express";
import { getTipoActividadService } from "../service/tipoActividad";
import { handleHttp } from "../utils/error.handle";

const getTipoActividad=async(req:Request,res:Response)=>{
    try {
        const resultado=await getTipoActividadService();
        res.send(resultado)
    } catch (e) {
        handleHttp(res,'Error al Obtener los Grados',e)
    }
}

export {getTipoActividad}
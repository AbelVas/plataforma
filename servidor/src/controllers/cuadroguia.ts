import { Request,Response } from "express"
import { obtenerCursosNotasService } from "../service/cuadroguia"
import { handleHttp } from "../utils/error.handle"

const getCursoBimestreConsolidado = async (req:Request, res:Response)=>{
    try{
        const {idGrado}=req.params
        const idUnidad=req.body.idUnidad
        const idCurso=req.body.idCurso
        const obtenerCursosNotas=await obtenerCursosNotasService(idGrado,idUnidad,idCurso)
        res.send(obtenerCursosNotas); 
    }catch(e){
        handleHttp(res,'Error al Obtener el consolidado',e)
    }
}
export{getCursoBimestreConsolidado}
import { Request,Response } from "express"
import {obtenerCodigoService, obtenerCodigosService, updateCodigoService, deleteCodigoService, insertCodigoService} from "../service/codigos"
import { handleHttp } from "../utils/error.handle"

const getCodigos = async (req:Request, res:Response)=>{
    try{
        const resultadoCodigos=await obtenerCodigosService();
        res.send (resultadoCodigos);
    }catch(e){
        handleHttp(res,'Error al Obtener los Codigos')
    }
}

const getCodigo = async (req:Request, res:Response) =>{
    try{

        const resultadoCodigo=await obtenerCodigoService(req.body.codigo,req.body.idTipoCodigo);
        res.send(resultadoCodigo);
    }catch(e){
        handleHttp(res,'Error al Obtener el Codigo')
    }
} 

const updateCodigo = async (req:Request, res:Response)=>{
    try{
        const{id}= req.params;
        const resultadoUpCodigo = await updateCodigoService (req.body, id)
        res.send(resultadoUpCodigo);
    }catch(e){
        handleHttp(res,'Error al actualizar el Codigo')
    }
}

const deleteCodigo = async (req:Request, res:Response)=>{
    try{
        const{id}=req.params;
        const resulDeletCodigo = await deleteCodigoService(id)
        res.send(resulDeletCodigo)
    }catch(e){
        handleHttp(res,'Error al eliminar el Codigo')
    }
}

const insertCodigo = async (req:Request, res:Response)=>{
    try{
        const resultadoInsCodigo = await insertCodigoService(req.body);
        res.send(resultadoInsCodigo)
    }catch(e){
        handleHttp(res,'Error al insertar el Codigo')
    }
}

export {getCodigo, getCodigos, updateCodigo, deleteCodigo, insertCodigo}
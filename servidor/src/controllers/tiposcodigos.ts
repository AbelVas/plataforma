import e, { Request,Response } from "express"
import {obtenertiposcodigoService, obtenertipocodigoService, updatetipocodigoService, deletetipocodigoService, inserttipocodigoService} from "../service/tiposcodigos"
import { handleHttp } from "../utils/error.handle"

const getTiposCodigos = async (req:Request, res:Response)=>{
    try{
        const resultadoTiposCodigos=await obtenertiposcodigoService();
        res.send (resultadoTiposCodigos);
    }catch(e){
        handleHttp(e, req, res);
    }
}

const getTipoCodigo = async (req:Request, res:Response)=>{
    try{
        const {id}=req.params
        const resultadoTipoCodigo=await obtenertipocodigoService(id);
        res.send(resultadoTipoCodigo);
    }catch(e){
        handleHttp(e, req, res);
    }
}

const upadteTipoCodigo = async (req:Request, res:Response)=>{
    try{
        const{id}=req.params;
        const resultadoupTipoCodigo=await updatetipocodigoService(req.body, id)
        res.send(resultadoupTipoCodigo);
    }catch(e){
        handleHttp(e, req, res);
    }
}

const deletetipocodigo = async (req:Request, res:Response)=>{
    try{
        const{id}=req.params;
        const resultadoDeletetipoCodigo=await deletetipocodigoService(id)
        res.send(resultadoDeletetipoCodigo)
    }catch(e){
        handleHttp(e, req, res);
    }
}

const insertartipoCodigo=async (req:Request, res:Response)=>{
    try{
        const resultadoInstipoCodigo = await inserttipocodigoService(req.body);
        res.send(resultadoInstipoCodigo)
    }catch(e){
        handleHttp(e, req, res);
    }
}

export {getTipoCodigo, getTiposCodigos, upadteTipoCodigo, deletetipocodigo, insertartipoCodigo}
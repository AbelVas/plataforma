import { Request, Response } from "express"
import { insertNivelService,obtenerNivelesService,obtenerNivelService,eliminarNivelService,editarNivelService,getNivelesporJornadaService } from "../service/niveles"
import { handleHttp } from "../utils/error.handle"

const getNiveles=async(req:Request,res:Response)=>{
    try{
        const responseNivel=await obtenerNivelesService();
        res.send(responseNivel);
    }catch(e){
        handleHttp(res,'Error_Request_GETS ', e)
    }
}
const getNivel=async(req:Request,res:Response)=>{
    try{
        const {id}=req.params;
        const responseNivel=await obtenerNivelService(id);
        res.send(responseNivel);
    }catch(e){
        handleHttp(res,'Error_Request_GET ', e)
    }
}
const updateNivel=async(req:Request,res:Response)=>{
    try{
        const {id}=req.params
        const responseNivel=await editarNivelService(req.body,id);
        res.send(responseNivel);
    }catch(e){
        handleHttp(res,'Error_Request_UPDATE ', e)
    }
}
const deleteNivel=async(req:Request,res:Response)=>{
    try{
        const {id}=req.params;
        const responseNivel=await eliminarNivelService(id);
        res.send(responseNivel);
    }catch(e){
        handleHttp(res,'Error_Request_DELETE ', e)
    }
}
const insertNivel=async(req:Request,res:Response)=>{
    try{
        const responseNivel=await insertNivelService(req.body);
        res.send(responseNivel);
    }catch(e){
        handleHttp(res,'Error_Request_INSERT ',e)
    }
}

const getNivelesporJornada =async(req:Request, res:Response)=>{
    try{
        const {id}=req.params;
        const responseNivelporJornada=await getNivelesporJornadaService(id);
        res.send(responseNivelporJornada);
    }catch(e){
        handleHttp(res,'Error_Request_GetNivelPorJornada ',e)
    }
}

export {getNiveles,getNivel,updateNivel,deleteNivel,insertNivel, getNivelesporJornada}
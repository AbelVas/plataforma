import { Request, Response } from "express"
import { insertNivelService,obtenerNivelesService,obtenerNivelService,eliminarNivelService,editarNivelService,getNivelesporJornadaService } from "../service/niveles"
import { handleHttp } from "../utils/error.handle"
import { io } from "../app"; // Importa el objeto de Socket.io

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
        const {idUsuario}=req.params
        const {nombre}=req.params
        const responseNivel=await editarNivelService(req.body,id);
        // Emitir un evento de Socket.io para notificar a los administradores
        io.emit("Actualizar-nivel", {mensaje:'El usuario "'+nombre+'" Actualizó un Nivel'});
        res.send(responseNivel);
    }catch(e){
        handleHttp(res,'Error_Request_UPDATE ', e)
    }
}
const deleteNivel=async(req:Request,res:Response)=>{ 
    try{
        const {id}=req.params;
        const {idUsuario}=req.params
        const {nombre}=req.params
        const responseNivel=await eliminarNivelService(id);
        // Emitir un evento de Socket.io para notificar a los administradores
        io.emit("Eliminar-nivel", {mensaje:'El usuario "'+nombre+'" eliminó un Nivel'});
        res.send(responseNivel);
    }catch(e){
        handleHttp(res,'Error_Request_DELETE ', e)
    }
}
const insertNivel=async(req:Request,res:Response)=>{
    try{
        const responseNivel=await insertNivelService(req.body);
        const {idUsuario}=req.params
        const {nombre}=req.params
        // Emitir un evento de Socket.io para notificar a los administradores
        io.emit("nuevo-nivel", {mensaje:'El usuario "'+nombre+'" eliminó un Nivel'});
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
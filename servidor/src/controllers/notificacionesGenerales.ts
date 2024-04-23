import { Request, Response } from "express"
import { handleHttp } from "../utils/error.handle"
import { io } from "../app"; // Importa el objeto de Socket.io
import {getNotificaciones,editarVistaRecibeDocente} from "../service/notificacionesGenerales"

const vistoNotificacionesDocente=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params
        const {idRol}=req.params
        const {idNotificacion}=req.params
        const responseNotificaciones=await editarVistaRecibeDocente(id,idRol,idNotificacion);
        io.emit("nueva-notificacion-usuario-recibida", {idUsuario:id,idRol:idRol});
        res.send(responseNotificaciones)
    } catch (e) {
        handleHttp(e, req, res);
    }
}
const getNotificacionesVistasDocentes=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params
        const {idRol}=req.params
        const responseNotificaciones=await getNotificaciones(id,idRol);
        res.send(responseNotificaciones);       
    } catch (e) {
        handleHttp(e, req, res);
    }
}

const insertNotificaciones=async(req:Request,res:Response)=>{
    try{

    }catch(e){
        handleHttp(e, req, res);
    }
}

export {getNotificacionesVistasDocentes,vistoNotificacionesDocente}
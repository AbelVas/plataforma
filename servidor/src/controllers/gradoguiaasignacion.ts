import { Request,Response } from "express"
import { obtenerGuiasExistente,obtenerGradosSinGuias,insertarGradoGuia,deleteGradoGuia,updateGradoGuia} from "../service/gradoguiaasignacion"; 
import { handleHttp } from "../utils/error.handle"
import { io } from "../app"; // Importa el objeto de Socket.io
import { obtenerSocketDocente } from "../service/obtenerSocketsService";
import { insertNotificacion } from "../service/notificacionesGenerales";
import { socketsTemp } from "../app"; 

const getObtenerGuiasExistentes=async(req:Request, res:Response)=>{
    try {
        const resultadoGrados=await obtenerGuiasExistente();
        res.send (resultadoGrados);
    } catch (e) {
        handleHttp(e, req, res);
    }
}
const getGradosSinGuias=async(req:Request, res:Response)=>{
    try {
        const resultadoGrados=await obtenerGradosSinGuias();
        res.send (resultadoGrados);        
    } catch (e) {
        handleHttp(e, req, res);
    }    
}
const insertGradosGuias=async(req:Request, res:Response)=>{
    try {
        
        var idUsuario=req.body.idProfesor
        var idGradoGuia=req.body.idGrado
        delete req.body.idProfesor
        delete req.body.idGrado

        const insert=await insertarGradoGuia(idUsuario,idGradoGuia)
        if(insert){
            const insertNoti=await insertNotificacion(req.body)
            io.emit("nueva-notificacion-usuario-recibida", {idUsuario:req.body.idUsuarioRecibe,idRol:req.body.idRolRecibe});
        }
        res.send(insert)
    } catch (e) {
        console.log(e)
handleHttp(e, req, res);
    }    
}
const eliminarGradoGuia=async(req:Request, res:Response)=>{
    try {
        const {id}=req.params;
        const resultadoGrados=await deleteGradoGuia(id);
        res.send (resultadoGrados);   
    } catch (e) {
handleHttp(e, req, res);
    }    
}
const actualizarGradoGuia=async(req:Request, res:Response)=>{
    try {
        console.log(req.body.idGuias)
        const insert=await updateGradoGuia(req.body,req.body.idGuias)
        res.send(insert)
    } catch (e) {
handleHttp(e, req, res);
    }    
}
export {getObtenerGuiasExistentes,getGradosSinGuias,insertGradosGuias,eliminarGradoGuia,actualizarGradoGuia}
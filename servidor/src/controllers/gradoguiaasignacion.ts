import { Request,Response } from "express"
import { obtenerGuiasExistente,obtenerGradosSinGuias,insertarGradoGuia,deleteGradoGuia,updateGradoGuia} from "../service/gradoguiaasignacion"; 
import { handleHttp } from "../utils/error.handle"
import { io } from "../app"; // Importa el objeto de Socket.io
import { socketsMap } from '../app'; // Importar el mapa de sockets

const getObtenerGuiasExistentes=async(req:Request, res:Response)=>{
    try {
        const resultadoGrados=await obtenerGuiasExistente();
        res.send (resultadoGrados);
    } catch (e) {
        handleHttp(res,'Error al Obtener los Grados')
    }
}
const getGradosSinGuias=async(req:Request, res:Response)=>{
    try {
        const resultadoGrados=await obtenerGradosSinGuias();
        res.send (resultadoGrados);        
    } catch (e) {
        handleHttp(res,'Error al Obtener los Grados')
    }    
}
const insertGradosGuias=async(req:Request, res:Response)=>{
    try {
        var idUsuario=req.body.idProfesor
        const insert=await insertarGradoGuia(req.body)
      // Emitir evento de Socket.io solo al usuario con el ID de profesor especificado
      const userSocket = socketsMap.get(idUsuario);
      if (userSocket) {
        userSocket.emit("notificacion", { mensaje: "Se te ha asignado un nuevo Grado Guía" });
      }else{
        res.status(404).send("Socket no encontrado para el usuario.");
      }
         
        res.send(insert)
    } catch (e) {
        handleHttp(res,'Error al Insertar los Grados: '+e)
    }    
}
const eliminarGradoGuia=async(req:Request, res:Response)=>{
    try {
        const {id}=req.params;
        const resultadoGrados=await deleteGradoGuia(id);
        res.send (resultadoGrados);   
    } catch (e) {
        handleHttp(res,'Error al Eliminar los Grados')
    }    
}
const actualizarGradoGuia=async(req:Request, res:Response)=>{
    try {
        console.log(req.body.idGuias)
        const insert=await updateGradoGuia(req.body,req.body.idGuias)
        res.send(insert)
    } catch (e) {
        handleHttp(res,'Error al Actualizar los Grados')
    }    
}
export {getObtenerGuiasExistentes,getGradosSinGuias,insertGradosGuias,eliminarGradoGuia,actualizarGradoGuia}
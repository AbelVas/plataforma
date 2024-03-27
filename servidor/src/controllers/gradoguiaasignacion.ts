import { Request,Response } from "express"
import { obtenerGuiasExistente,obtenerGradosSinGuias,insertarGradoGuia,deleteGradoGuia,updateGradoGuia} from "../service/gradoguiaasignacion"; 
import { handleHttp } from "../utils/error.handle"

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
        const insert=await insertarGradoGuia(req.body)
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
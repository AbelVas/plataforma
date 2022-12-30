import { Request,Response } from "express"
import { crearTareaService,getActividadesCursoService,deleteTareaService,updateActividadService,duplicarActividades } from "../service/actividades";
import { handleHttp } from "../utils/error.handle"
const insertarTarea=async (req:Request,res:Response)=>{
    try {
        const resultadoGrados=await crearTareaService(req.body);
        res.send (resultadoGrados);
    } catch (e) {
        handleHttp(res,'Error al crear la actividad: ',e)
    }
}
const getActividadesCurso=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params
        const resultado=await getActividadesCursoService(id)
        res.send(resultado)
    } catch (e) {
        handleHttp(res,'Error al Obtener las actividades del Curso',e)
    }
}
const deleteActividadCurso=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params;
        const resultado=await deleteTareaService(id);
        res.send(resultado);
    } catch (e) {
        handleHttp(res,'Error al Eliminar la actividade del Curso',e) 
    }
}
const updateActividad=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params;
        const resultado=await updateActividadService(req.body,id);
        res.send(resultado);
    } catch (e) {
        handleHttp(res,'Error al Eliminar la actividade del Curso',e) 
    }
}
const duplicarActividad=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params;
        const resultado=await duplicarActividades(req.body,id);
        res.send(resultado)
    } catch (e) {
        handleHttp(res,'Error al Duplicar la Actividad',e) 
    }
}
export {insertarTarea,getActividadesCurso,deleteActividadCurso,updateActividad,duplicarActividad}
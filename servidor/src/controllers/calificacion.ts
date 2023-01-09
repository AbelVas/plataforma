import { Request,Response } from "express"
import { getAlumnosCalificacionActividadCursUnidadService,calificarActividadService,getCalificacionesAlumnoActividadService } from "../service/calificacion";
import { handleHttp } from "../utils/error.handle"

const getAlumnosCalificacionActividadCursUnidad=async(req:Request,res:Response)=>{
    try {
        const {idCurso}=req.params;
        const idActividad=req.body.idDetalleActividad
        const Unidad=req.body.idUnidad
        const resultado=await getAlumnosCalificacionActividadCursUnidadService(idActividad,Unidad,idCurso);
        res.send(resultado)
    } catch (e) {
        handleHttp(res,'Error al Obtener las Calificaciones de la Actividad',e)
    }
}
const calificarActividad=async(req:Request,res:Response)=>{
    try {
        const {idDetalleActividad}=req.params
        const calificacion=req.body.calificacion
        const idAlumno=req.body.idAlumno
        const resultado=await calificarActividadService(idAlumno,idDetalleActividad,calificacion);
        res.send(resultado);
    } catch (e) {
        handleHttp(res,'Error al Calificar la Actividad',e)
    }
}

const getCalificacionesAlumnoActividad=async(req:Request,res:Response)=>{
    try{
        const {idAlumno} = req.params;
        const {idCurso} = req.body
        const resultadoCalificaciones=await getCalificacionesAlumnoActividadService(idCurso, idAlumno)
        res.send(resultadoCalificaciones);
    }catch(e){
        handleHttp(res,'Error al Obtener la calificacion')
    }
}

export {getAlumnosCalificacionActividadCursUnidad,calificarActividad,getCalificacionesAlumnoActividad}
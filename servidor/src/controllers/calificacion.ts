import { Request,Response } from "express"
import { getAlumnosCalificacionActividadCursUnidadService,calificarActividadService,getCalificacionesAlumnoActividadService } from "../service/calificacion";
import { handleHttp } from "../utils/error.handle"
import { insertNotificacion } from "../service/notificacionesGenerales";
import { io } from "../app"; // Importa el objeto de Socket.io

const getAlumnosCalificacionActividadCursUnidad=async(req:Request,res:Response)=>{
    try {
        const {idCurso}=req.params;
        const idActividad=req.body.idDetalleActividad
        const Unidad=req.body.idUnidad
        const resultado=await getAlumnosCalificacionActividadCursUnidadService(idActividad,Unidad,idCurso);
        res.send(resultado)
    } catch (e) {
        handleHttp(e, req, res);
    }
}
const calificarActividad=async(req:Request,res:Response)=>{
    try {
        const {idDetalleActividad}=req.params
        const calificacion=req.body.calificacion
        const idAlumno=req.body.idAlumno
        const nota=req.body.verNota
        const disponible=req.body.disponible
        delete req.body.calificacion
        delete req.body.idAlumno
        delete req.body.verNota
        delete req.body.disponible
        const resultado=await calificarActividadService(idAlumno,idDetalleActividad,calificacion);

        if(resultado){
            if(nota == "1" && disponible == "1"){
                const insertNoti=await insertNotificacion(req.body)
                io.emit("nueva-notificacion-usuario-recibida", {idUsuario:req.body.idUsuarioRecibe,idRol:req.body.idRolRecibe,mensaje:req.body.mensaje,titulo_notificacion:req.body.titulo_notificacion});
            }
        }
        res.send(resultado);
    } catch (e) {
        handleHttp(e, req, res);
    }
}

const getCalificacionesAlumnoActividad=async(req:Request,res:Response)=>{
    try{
        const {idAlumno} = req.params;
        const {idCurso} = req.body
        const resultadoCalificaciones=await getCalificacionesAlumnoActividadService(idCurso, idAlumno)
        res.send(resultadoCalificaciones);
    }catch(e){
        handleHttp(e, req, res);
    }
}

export {getAlumnosCalificacionActividadCursUnidad,calificarActividad,getCalificacionesAlumnoActividad}
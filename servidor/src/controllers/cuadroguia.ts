import { Request,Response } from "express"
import { GradoCursoSeccionService,actividadesCursoGradoService, notasalumnosFinalService,alumnosGradoService,cursosGradoCuadroGuiaService,notasalumnosCursoFinalService } from "../service/cuadroguia"
import { handleHttp } from "../utils/error.handle"

const getCursoBimestreConsolidado = async (req:Request, res:Response)=>{
    try{
        const {idGrado}=req.params
        const {idCurso}=req.params
        const obtenerCursosNotas=await GradoCursoSeccionService(idGrado,idCurso)
        res.send(obtenerCursosNotas); 
    }catch(e){
        handleHttp(res,'Error al Obtener el Grado y Sección',e)
    }
}
const actividadesCursoGrado=async(req:Request,res:Response)=>{
    try {
        const {idCurso}=req.params
        const {idUnidad}=req.params
        const obtenerActividadesCurso=await actividadesCursoGradoService(idCurso,idUnidad)
        res.send(obtenerActividadesCurso)
    } catch (e) {
        handleHttp(res,'Error al Obtener Actividades el Curso',e)
    }
}
const notasalumnosFinal=async(req:Request,res:Response)=>{
    try{
        const {idCurso}=req.params;
        const {idUnidad}=req.params;
        const {idGrado}=req.params 
        const {idAlumnos}=req.params
        const prueba=await notasalumnosFinalService(idCurso,idUnidad,idGrado);
        res.send(prueba)
    }catch(e){
        handleHttp(res,'Error',e)
    }
}
const alumnosGrado=async(req:Request,res:Response)=>{
    try{
        const {idGrado}=req.params 
        const prueba=await alumnosGradoService(idGrado);
        res.send(prueba)
    }catch(e){
        handleHttp(res,'Error',e)
    }
}
const cursosGradoCuadroGuia=async(req:Request,res:Response)=>{
    try{
        const {idGrado}=req.params 
        const prueba=await cursosGradoCuadroGuiaService(idGrado);
        res.send(prueba)
    }catch(e){
        handleHttp(res,'Error',e)
    }
}
const notasalumnosCursoFinal=async(req:Request,res:Response)=>{
    try{
        const {idGrado}=req.params 
        const {idUnidad}=req.params 
        const prueba=await notasalumnosCursoFinalService(idGrado,idUnidad);
        res.send(prueba)
    }catch(e){
        handleHttp(res,'Error',e)
    }
}

export{getCursoBimestreConsolidado,actividadesCursoGrado,notasalumnosFinal,alumnosGrado,cursosGradoCuadroGuia,notasalumnosCursoFinal}
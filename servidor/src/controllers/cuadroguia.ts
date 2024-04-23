import { Request,Response } from "express"
import { cursosGradoCuadroFinalService,GradoCursoSeccionService,actividadesCursoGradoService, notasalumnosFinalService,alumnosGradoService,cursosGradoCuadroGuiaService,notasalumnosCursoFinalService } from "../service/cuadroguia"
import { handleHttp } from "../utils/error.handle"

const getCursoBimestreConsolidado = async (req:Request, res:Response)=>{
    try{
        const {idGrado}=req.params
        const {idCurso}=req.params
        const obtenerCursosNotas=await GradoCursoSeccionService(idGrado,idCurso)
        res.send(obtenerCursosNotas); 
    }catch(e){
handleHttp(e, req, res);
    }
}
const actividadesCursoGrado=async(req:Request,res:Response)=>{
    try {
        const {idCurso}=req.params
        const {idUnidad}=req.params
        const obtenerActividadesCurso=await actividadesCursoGradoService(idCurso,idUnidad)
        res.send(obtenerActividadesCurso)
    } catch (e) {
handleHttp(e, req, res);
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
handleHttp(e, req, res);
    }
}
const alumnosGrado=async(req:Request,res:Response)=>{
    try{
        const {idGrado}=req.params 
        const prueba=await alumnosGradoService(idGrado);
        res.send(prueba)
    }catch(e){
handleHttp(e, req, res);
    }
}
const cursosGradoCuadroGuia=async(req:Request,res:Response)=>{
    try{
        const {idGrado}=req.params 
        const prueba=await cursosGradoCuadroGuiaService(idGrado);
        res.send(prueba)
    }catch(e){
handleHttp(e, req, res);
    }
}
const notasalumnosCursoFinal=async(req:Request,res:Response)=>{
    try{
        const {idGrado}=req.params 
        const {idUnidad}=req.params 
        const prueba=await notasalumnosCursoFinalService(idGrado,idUnidad);
        res.send(prueba)
    }catch(e){
handleHttp(e, req, res);
    }
}
const cursosGradoCuadroFinal=async(req:Request,res:Response)=>{
    try {
        const {idGrado}=req.params 
        const prueba=await cursosGradoCuadroFinalService(idGrado);
        res.send(prueba)
        
    } catch (e) {
handleHttp(e, req, res);
    }
}

export{cursosGradoCuadroFinal,getCursoBimestreConsolidado,actividadesCursoGrado,notasalumnosFinal,alumnosGrado,cursosGradoCuadroGuia,notasalumnosCursoFinal}
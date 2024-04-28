import { Request,Response } from "express"
import { obtenerImagenSubidCursosProfesor,obtenerCursodeProfesor,obtenerCursosPorGradoProfesorAdminService,obtenerCursosPorProfesorGradoSeccionService,obtenerCursosPorGradoProfesorService,obtenerCursosService, obtenerCursoService, updateCursosService, deleteCursosService, insertCursosService, obtenerCursosPorGradoService, obtenerCursosPorProfesorService,obtenerCursosPorAlumnoService,obtenerProfePorCurso} from "../service/cursos"
import { handleHttp } from "../utils/error.handle"
import { io } from "../app"; // Importa el objeto de Socket.io

const obtenerCursosPorProfesorGradoSeccion=async(req:Request, res:Response)=>{
    try {
        const {id}=req.params
        const response=await obtenerCursosPorProfesorGradoSeccionService(id,req.body);
        res.send(response)
    } catch (e) {
handleHttp(e, req, res);
    }
}
const getCursos = async (req:Request, res:Response)=>{
    try{
        const resultadoGrados=await obtenerCursosService();
        res.send (resultadoGrados);
    }catch(e){
handleHttp(e, req, res);
    }
}

const getCurso = async (req:Request, res:Response)=>{
    try{
        const {id} = req.params;
        const resultadoGrado=await obtenerCursoService(id)
        res.send(resultadoGrado);
    }catch(e){
handleHttp(e, req, res);
    }
}
const updateCurso = async (req:Request, res:Response)=>{
    try{
        const{id}= req.params;
        const resultadoUpGrado=await updateCursosService(req.body, id)
        res.send(resultadoUpGrado);
    }catch(e){
handleHttp(e, req, res);
    }
}
const deleteCurso = async (req:Request, res:Response)=>{
    try{
        const{id}= req.params;
        const resultadoDeletGrado=await deleteCursosService(id)
        res.send(resultadoDeletGrado)
    }catch(e){
handleHttp(e, req, res);
    }
}
const insertCurso = async (req:Request, res:Response)=>{
    try{
        const resultadoInsGrado = await insertCursosService(req.body);
        res.send(resultadoInsGrado)
    }catch(e){
handleHttp(e, req, res);
    }
}

const getCursoporGrado = async (req:Request, res:Response)=>{
    try{
        const {id} = req.params;
        const resultadoGrado=await obtenerCursosPorGradoService(id)
        res.send(resultadoGrado);
    }catch(e){
handleHttp(e, req, res);
    }
}

const getCursoporProfesor = async (req:Request, res:Response)=>{
    try{
        const {id} = req.params;
        const resultadoProfesor=await obtenerCursosPorProfesorService(id)
        res.send(resultadoProfesor);
    }catch(e){
handleHttp(e, req, res); 
    }
}
const getCursoporGradoProfesor=async (req:Request, res:Response)=>{
    try{
        const {id} = req.params;
        const resultadoProfesor=await obtenerCursosPorGradoProfesorService(id)
        res.send(resultadoProfesor);
    }catch(e){
handleHttp(e, req, res);
    }
}
const getCursosPorAlumno=async (req:Request, res:Response)=>{
    try{
        const {id} = req.params;
        const resultadoAlumno=await obtenerCursosPorAlumnoService(id)
        res.send(resultadoAlumno);
    }catch(e){
handleHttp(e, req, res);
    }
}
const getProfeCurso = async (req:Request, res:Response)=>{
    try{
        const {id} = req.params;
        const resultadoGrado=await obtenerProfePorCurso(id)
        res.send(resultadoGrado);
    }catch(e){
handleHttp(e, req, res);
    }
}
const getCursoporGradoProfesorAdmin=async (req:Request, res:Response)=>{
    try{
        const {id} = req.params;
        const resultadoProfesor=await obtenerCursosPorGradoProfesorAdminService(id)
        res.send(resultadoProfesor);
    }catch(e){
handleHttp(e, req, res); 
    }
}
const obtenerCursodeProfesorIndividual=async (req:Request, res:Response)=>{
    try{
        const {id} = req.params;
        const resultadoProfesor=await obtenerCursodeProfesor(id)
        res.send(resultadoProfesor);
    }catch(e){
        handleHttp(e, req, res);
    }
}

const obtenerImagenSubidCursosProfesorController=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params
        const {ruta_imagen}=req.body
        const {subida}=req.body
        const {idRol}=req.body
        const {idProfesor}=req.body
        const resultado=await obtenerImagenSubidCursosProfesor(id,ruta_imagen,subida)
        io.emit('actualizar-foto-curso',{usuario:idProfesor,idRol:idRol})
        res.send(resultado)
    } catch (e) {
        handleHttp(e, req, res);   
    }
}

export {obtenerImagenSubidCursosProfesorController,obtenerCursodeProfesorIndividual,getCursoporGradoProfesorAdmin,getCurso, getCursos, updateCurso,deleteCurso, insertCurso,getCursoporGrado,getCursoporProfesor,getCursoporGradoProfesor,obtenerCursosPorProfesorGradoSeccion,getCursosPorAlumno, getProfeCurso}
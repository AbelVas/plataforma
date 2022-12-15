import { Request,Response } from "express"
import { obtenerCursosPorGradoProfesorService,obtenerCursosService, obtenerCursoService, updateCursosService, deleteCursosService, insertCursosService, obtenerCursosPorGradoService, obtenerCursosPorProfesorService} from "../service/cursos"
import { handleHttp } from "../utils/error.handle"

const getCursos = async (req:Request, res:Response)=>{
    try{
        const resultadoGrados=await obtenerCursosService();
        res.send (resultadoGrados);
    }catch(e){
        handleHttp(res,'Error al Obtener los Grados')
    }
}

const getCurso = async (req:Request, res:Response)=>{
    try{
        const {id} = req.params;
        const resultadoGrado=await obtenerCursoService(id)
        res.send(resultadoGrado);
    }catch(e){
        handleHttp(res,'Error al Obtener el Grado')
    }
}
const updateCurso = async (req:Request, res:Response)=>{
    try{
        const{id}= req.params;
        const resultadoUpGrado=await updateCursosService(req.body, id)
        res.send(resultadoUpGrado);
    }catch(e){
        handleHttp(res,'Error al Actualizar el grado', e)
    }
}
const deleteCurso = async (req:Request, res:Response)=>{
    try{
        const{id}= req.params;
        const resultadoDeletGrado=await deleteCursosService(id)
        res.send(resultadoDeletGrado)
    }catch(e){
        handleHttp(res,'Error al Eliminar el grado')
    }
}
const insertCurso = async (req:Request, res:Response)=>{
    try{
        const resultadoInsGrado = await insertCursosService(req.body);
        res.send(resultadoInsGrado)
    }catch(e){
        handleHttp(res,'Error al insertar Grado')
    }
}

const getCursoporGrado = async (req:Request, res:Response)=>{
    try{
        const {id} = req.params;
        const resultadoGrado=await obtenerCursosPorGradoService(id)
        res.send(resultadoGrado);
    }catch(e){
        handleHttp(res,'Error al Obtener el grado')
    }
}

const getCursoporProfesor = async (req:Request, res:Response)=>{
    try{
        const {id} = req.params;
        const resultadoProfesor=await obtenerCursosPorProfesorService(id)
        res.send(resultadoProfesor);
    }catch(e){
        handleHttp(res,'Error al Obtener el Profesor')    
    }
}
const getCursoporGradoProfesor=async (req:Request, res:Response)=>{
    try{
        const {id} = req.params;
        const resultadoProfesor=await obtenerCursosPorGradoProfesorService(id)
        res.send(resultadoProfesor);
    }catch(e){
        handleHttp(res,'Error al Obtener curso/grado/docente')    
    }
}
export {getCurso, getCursos, updateCurso,deleteCurso, insertCurso,getCursoporGrado,getCursoporProfesor,getCursoporGradoProfesor}
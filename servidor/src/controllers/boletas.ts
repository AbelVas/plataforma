import { Request,Response } from "express"
import { handleHttp } from "../utils/error.handle"
import { alumnosGradoService,alumnoNotasBoletaService,alumnoNotasBoletaEspecialService,alumnoNotasBoletaFinalPromedio } from "../service/boletas"

const alumnosGrado=async(req:Request,res:Response)=>{
    try{
        const {idGrado}=req.params 
        const {idAlumno}=req.params 
        const prueba=await alumnosGradoService(idGrado,idAlumno);
        res.send(prueba)
    }catch(e){
        handleHttp(e, req, res);
    }
}
const alumnoNotasBoleta=async(req:Request,res:Response)=>{
    try {
        const {idGrado}=req.params 
        const {idAlumno}=req.params 
        const prueba=await alumnoNotasBoletaService(idGrado,idAlumno);
        res.send(prueba)
    } catch (e) {
        handleHttp(e, req, res);
    }
}

const alumnoNotasBoletaEspecial=async(req:Request,res:Response)=>{
    try {
        const {idGrado}=req.params 
        const {idAlumno}=req.params 
        const prueba=await alumnoNotasBoletaEspecialService(idGrado,idAlumno);
        res.send(prueba)
    } catch (e) {
        handleHttp(e, req, res);
    }
}
const alumnoNotasBoletaPromedioFinal=async(req:Request,res:Response)=>{
    try {
        const {idGrado}=req.params 
        const {idCurso}=req.params 
        const prueba=await alumnoNotasBoletaFinalPromedio(idCurso,idGrado);
        res.send(prueba)
    } catch (e) {
        handleHttp(e, req, res);
    }
}
export {alumnosGrado,alumnoNotasBoletaService,alumnoNotasBoleta,alumnoNotasBoletaEspecial,alumnoNotasBoletaPromedioFinal}
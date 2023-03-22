import { Request,Response } from "express"
import { handleHttp } from "../utils/error.handle"
import { alumnosGradoService,alumnoNotasBoletaService } from "../service/boletas"

const alumnosGrado=async(req:Request,res:Response)=>{
    try{
        const {idGrado}=req.params 
        const {idAlumno}=req.params 
        const prueba=await alumnosGradoService(idGrado,idAlumno);
        res.send(prueba)
    }catch(e){
        handleHttp(res,'Error',e)
    }
}
const alumnoNotasBoleta=async(req:Request,res:Response)=>{
    try {
        const {idGrado}=req.params 
        const {idAlumno}=req.params 
        const prueba=await alumnoNotasBoletaService(idGrado,idAlumno);
        res.send(prueba)
    } catch (e) {
        handleHttp(res,'Error',e)
    }
}

export {alumnosGrado,alumnoNotasBoletaService,alumnoNotasBoleta}
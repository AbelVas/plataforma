import { Request,Response } from "express";
import { getTutorAlumnoService } from "../service/relaciontutoralumno";
import { handleHttp } from "../utils/error.handle";
import { encrypt } from "../utils/passwordFunction";

const getTutorAlumno=async(req:Request,res:Response)=>{
    try{
        const {id}=req.params;
        const tutoralumno=await getTutorAlumnoService(id);
        res.send(tutoralumno);
    }catch(e){
        handleHttp(res,'Error al Obtener a los alumnos del tutor')
    }
}

export {getTutorAlumno}
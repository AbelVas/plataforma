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
        handleHttp(e, req, res);
    }
}

export {getTutorAlumno}
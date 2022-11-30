import { Request,Response } from "express";
import {insertTutoresService,obtenerTutoresService,obtenerTutorService,updateTutorService,deleteTutoresService,validarTutoresExisteSi,getTutorconAlumnoService} from "../service/tutores";
import { handleHttp } from "../utils/error.handle";
import { encrypt } from "../utils/passwordFunction";

const getTutores=async(req:Request,res:Response)=>{
    try{
        const resultadoTutores=await obtenerTutoresService();
        res.send(resultadoTutores);
    }catch(e){
        handleHttp(res,'Error al Obtener a los Tutores')
    }
}
const getTutor= async(req:Request,res:Response)=>{
    try{
       const {id}=req.params;
       const resultadoTutores=await obtenerTutorService(id);
       res.send(resultadoTutores);
    }catch(e){
        handleHttp(res,'Error al Obtener al Tutor')
    }
}
const updateTutor= async(req:Request,res:Response)=>{
    try{
       const passEncrypt=await encrypt(req.body.pass);
       req.body.pass=passEncrypt
       const {id}=req.params;
       const resultadoTutores=await updateTutorService(req.body,id);
       res.send(resultadoTutores);
    }catch(e){
        handleHttp(res,'Error al Actualizar al Tutor')
    }
}
const deleteTutor= async(req:Request,res:Response)=>{
    try{
       const {id}=req.params;
       const resultadoTutores=await deleteTutoresService(id);
       res.send(resultadoTutores);
    }catch(e){
        handleHttp(res,'Error al Eliminar al Tutor')
    }
}
const insertarTutor= async(req:Request,res:Response)=>{
    try{
        const validar=await validarTutoresExisteSi(req.body.usuario,req.body.telefono1);
        if(validar!=''){
            res.send("Error, el Tutor ya existe")
        }else{
            const passEncrypt=await encrypt(req.body.pass);
            req.body.pass=passEncrypt
            const resultadoAlumno=await insertTutoresService(req.body);
            res.send(resultadoAlumno);
        }
    }catch(e){
        handleHttp(res,'Error al Insertar al Tutor',e)
    }
}

const getTutorconAlumno=async(req:Request,res:Response)=>{
    try{
        const {id}=req.params;
        const resultTutorConAlimn=await getTutorconAlumnoService(id);
        res.send(resultTutorConAlimn);
    }catch(e){
        handleHttp(res,'Error al Obtener al Tutor')
    }
}

export {getTutores,getTutor,updateTutor,deleteTutor,insertarTutor,getTutorconAlumno}
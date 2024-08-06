import { Request,Response } from "express";
import {insertTutoresService,obtenerTutoresService,obtenerTutorService,updateTutorService,deleteTutoresService,validarTutoresExisteSi,getTutorconAlumnoService,verifyPassword,getAlumnoporTutorService,obtenerTutorNotasService} from "../service/tutores";
import { handleHttp } from "../utils/error.handle";
import { encrypt } from "../utils/passwordFunction";

const getTutores=async(req:Request,res:Response)=>{
    try{
        const resultadoTutores=await obtenerTutoresService();
        res.send(resultadoTutores);
    }catch(e){
        handleHttp(e, req, res);
    }
}
const getTutor= async(req:Request,res:Response)=>{
    try{
       const {id}=req.params;
       const resultadoTutores=await obtenerTutorService(id);
       res.send(resultadoTutores);
    }catch(e){
        handleHttp(e, req, res);
    }
}

const GetNotasTutor = async(req:Request, res:Response)=>{
    try{
        const {id}=req.params;
        const resultadoTutores=await obtenerTutorNotasService(id);
        res.send(resultadoTutores);
    }catch(e){
        handleHttp(e,req,res);
    }
}

const updateTutor= async(req:Request,res:Response)=>{
    try {
        const {id}=req.params;
        const {pass}=req.body
        if(pass==null){
            const resultado=await updateTutorService(req.body,id);
            res.send(resultado);
        }else{
            const passEncrypt=await encrypt(pass);
            req.body.pass=passEncrypt;
            const resultado=await updateTutorService(req.body,id);
            res.send(resultado);
        }
    } catch (e) {
        handleHttp(e, req, res);
    }
}
const deleteTutor= async(req:Request,res:Response)=>{
    try{
       const {id}=req.params;
       const resultadoTutores=await deleteTutoresService(id);
       res.send(resultadoTutores);
    }catch(e){
        handleHttp(e, req, res);
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
        handleHttp(e, req, res);
    }
}

const compararPass=async(req:Request,res:Response)=>{
    try{
        const {id}=req.params;
        const {pass}=req.body;
        const resultadoDelete=await verifyPassword(id,pass);
        res.send(resultadoDelete);
     }catch(e){
        handleHttp(e, req, res);
     }
}

const getTutorconAlumno=async(req:Request,res:Response)=>{
    try{
        const {id}=req.params;
        const resultTutorConAlimn=await getTutorconAlumnoService(id);
        res.send(resultTutorConAlimn);
    }catch(e){
        handleHttp(e, req, res);
    }
}

const getAlumnoporTutor=async(req:Request,res:Response)=>{
    try{
        const {id}=req.params;
        const resultAlumnosporTutor=await getAlumnoporTutorService(id);
        res.send(resultAlumnosporTutor);
    }catch(e){
        handleHttp(e, req, res);
    }
}

export {getTutores,getTutor,updateTutor,deleteTutor,insertarTutor,getTutorconAlumno,compararPass,getAlumnoporTutor,GetNotasTutor}
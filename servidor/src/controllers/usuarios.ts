import { Request,Response } from "express";
import {insertAlumnosService,obtenerAlumnosService,obtenerAlumnosGradoService,obtenerAlumnoService,updateAlumnosService,deleteAlumnoService,validarAlumnosExisteSi} from "../service/usuarios";
import { handleHttp } from "../utils/error.handle";
import { encrypt } from "../utils/passwordFunction";

const getAlumnos=async(req:Request,res:Response)=>{
    try{
        const resultadoAlumno=await obtenerAlumnosService();
        res.send(resultadoAlumno);
    }catch(e){
        handleHttp(res,'Error al Obtener a los Alumnos')
    }
}
const getAlumno= async(req:Request,res:Response)=>{
    try{
       const {id}=req.params;
       const resultadoAlumno=await obtenerAlumnoService(id);
       res.send(resultadoAlumno);
    }catch(e){
        handleHttp(res,'Error al Obtener al Alumno')
    }
}
const getAlumnosGrado= async(req:Request,res:Response)=>{
    try{
       const {id}=req.params;
       const resultadoAlumnosGrado=await obtenerAlumnosGradoService(id);
       res.send(resultadoAlumnosGrado);
    }catch(e){
        handleHttp(res,'Error al Obtener a los alumnos del grado')
    }
}

const updateAlumno= async(req:Request,res:Response)=>{
    try{
       const passEncrypt=await encrypt(req.body.pass);
       req.body.pass=passEncrypt
       const {id}=req.params;
       const resultadoAlumno=await updateAlumnosService(req.body,id);
       res.send(resultadoAlumno);
    }catch(e){
        handleHttp(res,'Error al Actualizar al Alumno')
    }
}
const deleteAlumno= async(req:Request,res:Response)=>{
    try{
       const {id}=req.params;
       const resultadoAlumno=await deleteAlumnoService(id);
       res.send(resultadoAlumno);
    }catch(e){
        handleHttp(res,'Error al Eliminar al Alumno')
    }
}
const insertarAlumno= async(req:Request,res:Response)=>{
    try{
        const validar=await validarAlumnosExisteSi(req.body.usuario);
        if(validar!=''){
            res.send("Error, Alumno ya existe")
        }else{
            const passEncrypt=await encrypt(req.body.pass);
            req.body.pass=passEncrypt
            const resultadoAlumno=await insertAlumnosService(req.body);
            res.send(resultadoAlumno);
        }
    }catch(e){
        handleHttp(res,'Error al Insertar al Alumno',e)
    }
}

export {getAlumnos,getAlumno,getAlumnosGrado,updateAlumno,deleteAlumno,insertarAlumno}
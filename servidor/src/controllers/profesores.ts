import { Request,Response } from "express";
import { obtenerProfesoresService,validarAdminExisteSi,obtenerProfesorService,insertProfesorService,updateProfesorService,deleteProfesorService } from "../service/profesores";
import { handleHttp } from "../utils/error.handle";
import { encrypt } from "../utils/passwordFunction";

const getProfesores=async(req:Request,res:Response)=>{
    try{
        const resultadoProfesor=await obtenerProfesoresService();
        res.send(resultadoProfesor);
    }catch(e){
        handleHttp(res,'Error al Obtener a los Profesores')
    }
}
const getProfesor= async(req:Request,res:Response)=>{
    try{
       const {id}=req.params;
       const resultadoProfesor=await obtenerProfesorService(id);
       res.send(resultadoProfesor);
    }catch(e){
        handleHttp(res,'Error al Obtener al Profesor')
    }
}
const updateProfesor= async(req:Request,res:Response)=>{
    try{
       const passEncrypt=await encrypt(req.body.pass);
       req.body.pass=passEncrypt
       const {id}=req.params;
       const resultadoProfesor=await updateProfesorService(req.body,id);
       res.send(resultadoProfesor);
    }catch(e){
        handleHttp(res,'Error al Actualizar al Profesor')
    }
}
const deleteProfesor= async(req:Request,res:Response)=>{
    try{
       const {id}=req.params;
       const resultadoProfesor=await deleteProfesorService(id);
       res.send(resultadoProfesor);
    }catch(e){
        handleHttp(res,'Error al Eliminar al Profesor')
    }
}
const insertarProfesor= async(req:Request,res:Response)=>{
    try{
        const validar=await validarAdminExisteSi(req.body.usuario,req.body.CUI,req.body.telefono);
        if(validar!=''){
            res.send("Error, Usuario ya existe")
        }else{
            const passEncrypt=await encrypt(req.body.pass);
            req.body.pass=passEncrypt
            const resultadoProfesor=await insertProfesorService(req.body);
            res.send(resultadoProfesor);
        }
    }catch(e){
        handleHttp(res,'Error al Insertar al Profesor',e)
    }
}

export {getProfesores,getProfesor,updateProfesor,deleteProfesor,insertarProfesor}
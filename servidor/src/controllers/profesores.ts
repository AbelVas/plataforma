import { Request,Response } from "express";
import { obtenerProfesoresService,validarAdminExisteSi,obtenerProfesorService,insertProfesorService,updateProfesorService,deleteProfesorService,verifyPassword } from "../service/profesores";
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
    try {
        const {id}=req.params;
        const {pass}=req.body
        if(pass==null){
            const resultado=await updateProfesorService(req.body,id);
            res.send(resultado);
        }else{
            const passEncrypt=await encrypt(pass);
            req.body.pass=passEncrypt;
            const resultado=await updateProfesorService(req.body,id);
            res.send(resultado);
        }
    } catch (e) {
        handleHttp(res,'Error al Editar Profesor',e)
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
const compararPass=async(req:Request,res:Response)=>{
    try{
        const {id}=req.params;
        const {pass}=req.body;
        const resultadoDelete=await verifyPassword(id,pass);
        res.send(resultadoDelete);
     }catch(e){
         handleHttp(res,'Error al Actualizar la contraseña',e)
     }
}

export {getProfesores,getProfesor,updateProfesor,deleteProfesor,insertarProfesor,compararPass}
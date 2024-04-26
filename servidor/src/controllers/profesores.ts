import { Request,Response } from "express";
import { fotoPerfilProfesorService,getFotoPerfilProfesorService,obtenerProfesoresService,validarAdminExisteSi,obtenerProfesorService,insertProfesorService,updateProfesorService,deleteProfesorService,verifyPassword,getGradoGuiaProfesorService } from "../service/profesores";
import { handleHttp } from "../utils/error.handle";
import { encrypt } from "../utils/passwordFunction";
import { io } from "../app"; // Importa el objeto de Socket.io

const getProfesores=async(req:Request,res:Response)=>{
    try{
        const resultadoProfesor=await obtenerProfesoresService();
        res.send(resultadoProfesor);
    }catch(e){
        handleHttp(e, req, res);
    }
}
const getProfesor= async(req:Request,res:Response)=>{
    try{
       const {id}=req.params;
       const resultadoProfesor=await obtenerProfesorService(id);
       res.send(resultadoProfesor);
    }catch(e){
        handleHttp(e, req, res);
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
        handleHttp(e, req, res);
    }
}
const deleteProfesor= async(req:Request,res:Response)=>{
    try{
       const {id}=req.params;
       const resultadoProfesor=await deleteProfesorService(id);
       res.send(resultadoProfesor);
    }catch(e){
        handleHttp(e, req, res);
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

const getGradoGuiaProfesor=async(req:Request,res:Response)=>{
    try{
        const {id}=req.params;
        const resultadoProfesor=await getGradoGuiaProfesorService(id);
        res.send(resultadoProfesor);
     }catch(e){
        handleHttp(e, req, res);
     }
}

const fotoPerfilProfeController=async(req:Request,res:Response)=>{
    try {
        const {ruta_imagen}=req.body;
        const {idProfesor}=req.body;
        const {peso_archivo}=req.body
        const {subida}=req.body
        const fotoPerfilProfesor=await fotoPerfilProfesorService(idProfesor,ruta_imagen,peso_archivo,subida)
        io.emit('actualizar-foto-ferfil-profesor',{usuario:idProfesor,idRol:"2"})
        res.send(fotoPerfilProfesor)
    } catch (e) {
        handleHttp(e, req, res);
    }
}

const getFotoPerfilActivaProfesor=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params
        const consulta=await getFotoPerfilProfesorService(id)
        res.send(consulta)
    } catch (e) {
        handleHttp(e, req, res);
    }
}

export {fotoPerfilProfeController,getFotoPerfilActivaProfesor,getProfesores,getProfesor,updateProfesor,deleteProfesor,insertarProfesor,compararPass,getGradoGuiaProfesor}
import {  Request, Response } from "express";
import { getFotoPerfilAdminService,fotoPerfilAdminService,verifyPassword,insertarAdminService,getAdminService,getAdminsService,updateAdminService,validarAdminExisteSi,eliminarAdminService } from "../service/administradores";
import { handleHttp } from "../utils/error.handle"
import { encrypt } from "../utils/passwordFunction";
import { io } from "../app"; // Importa el objeto de Socket.io

const putAdmin=async(req:Request,res:Response)=>{
    try{
        const validar=await validarAdminExisteSi(req.body.usuario,req.body.CUI);
        if(validar!=''){
            res.send("Error, Usuario ya existe")
        }else{
            const passEncrypt=await encrypt(req.body.pass);
            req.body.pass=passEncrypt
            const resultadoAdminInsert=await insertarAdminService(req.body);
            res.send(resultadoAdminInsert);
        }
     }catch(e){
        handleHttp(e, req, res);
     }
}
const getAdmin=async(req:Request,res:Response)=>{
    try{
        const {id}=req.params;
        const resultado=await getAdminService(id);
        res.send(resultado);
    }catch(e){
        handleHttp(e, req, res);
    }
}
const getAdmins=async(req:Request,res:Response)=>{
    try {
        const resultado=await getAdminsService();
        res.send(resultado);
    } catch (e) {
        handleHttp(e, req, res);
    }
}
const updateAdmin=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params;
        const {pass}=req.body
        if(pass==null){
            const resultado=await updateAdminService(req.body,id);
            res.send(resultado);
        }else{
            const passEncrypt=await encrypt(pass);
            req.body.pass=passEncrypt;
            const resultado=await updateAdminService(req.body,id);
            res.send(resultado);
        }
    } catch (e) {
        handleHttp(e, req, res);
    }
}
const deleteAdmin=async(req:Request,res:Response)=>{
    try{
        const {id}=req.params;
        const resultadoDelete=await eliminarAdminService(id);
        res.send(resultadoDelete);
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
const fotoPerfilAdminController=async(req:Request,res:Response)=>{
    try {
        const {ruta_imagen}=req.body;
        const {idProfesor}=req.body;
        const {peso_archivo}=req.body
        const {subida}=req.body
        const {idRol}=req.body
        const fotoPerfilAdmin=await fotoPerfilAdminService(idProfesor,ruta_imagen,peso_archivo,subida)
        if(idRol==1){
            io.emit('actualizar-foto-perfil-admin',{usuario:idProfesor,idRol:idRol})
        }else if(idRol==2){
            io.emit('actualizar-foto-ferfil-docente',{usuario:idProfesor,idRol:idRol})
        }
        res.send(fotoPerfilAdmin)
    } catch (e) {
        handleHttp(e, req, res);
    }
}
const getFotoPerfilActivaAdmin=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params
        const consulta=await getFotoPerfilAdminService(id)
        res.send(consulta)
    } catch (e) {
        handleHttp(e, req, res);
    }
}

export {getFotoPerfilActivaAdmin,fotoPerfilAdminController,putAdmin,deleteAdmin,getAdmin,getAdmins,updateAdmin,compararPass}
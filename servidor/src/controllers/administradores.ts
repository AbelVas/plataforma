import { request, Request, Response } from "express";
import {insertarAdminService,getAdminService,getAdminsService,updateAdminService,validarAdminExisteSi,eliminarAdminService } from "../service/administradores";
import { handleHttp } from "../utils/error.handle"
import { encrypt } from "../utils/passwordFunction";

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
         handleHttp(res,'Error ingresar Administrador',e)
     }
}
const getAdmin=async(req:Request,res:Response)=>{
    try{
        const {id}=req.params;
        const resultado=await getAdminService(id);
        res.send(resultado);
    }catch(e){
        handleHttp(res,'Error al Obtener Administrador',e)
    }
}
const getAdmins=async(req:Request,res:Response)=>{
    try {
        const resultado=await getAdminsService();
        res.send(resultado);
    } catch (e) {
        handleHttp(res,'Error al Obtener Administrador',e)
    }
}
const updateAdmin=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params;
        const resultado=await updateAdminService(req.body,id);
        res.send(resultado);
    } catch (error) {
        
    }
}
const deleteAdmin=async(req:Request,res:Response)=>{
    try{
        const {id}=req.params;
        const resultadoDelete=await eliminarAdminService(id);
        res.send(resultadoDelete);
     }catch(e){
         handleHttp(res,'Error eliminar Administrador',e)
     }
}

export {putAdmin,deleteAdmin,getAdmin,getAdmins,updateAdmin}
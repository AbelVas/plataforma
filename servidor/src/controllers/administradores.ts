import { request, Request, Response } from "express";
import {verifyPassword,insertarAdminService,getAdminService,getAdminsService,updateAdminService,validarAdminExisteSi,eliminarAdminService } from "../service/administradores";
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


export {putAdmin,deleteAdmin,getAdmin,getAdmins,updateAdmin,compararPass}
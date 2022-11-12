import { Request, Response } from "express";
import { insertarAdmin,eliminarAdmin, validarAdminExisteSi } from "../service/registroAdmin.admin";
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
            const resultadoAdminInsert=await insertarAdmin(req.body);
            res.send(resultadoAdminInsert);
        }
     }catch(e){
         handleHttp(res,'Error ingresar Administrador',e)
     }
}

const deleteAdmin=async(req:Request,res:Response)=>{
    try{
        const {id}=req.params;
        const resultadoDelete=await eliminarAdmin(id);
        res.send(resultadoDelete);
     }catch(e){
         handleHttp(res,'Error eliminar Administrador',e)
     }
}

export {putAdmin,deleteAdmin}
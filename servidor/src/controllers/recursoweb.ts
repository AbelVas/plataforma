import { Request,response,Response } from "express";
import {GetRecursosWebService,GetRecursoWebService,updateRecursoWebService,deleteRecursoWebService,insertRecursoWebService} from "../service/recursoweb";
import { handleHttp } from "../utils/error.handle";


const getRecursosWeb=async(req:Request,res:Response)=>{

    try {
        const resultadoRecursoWeb=await GetRecursosWebService();
        res.send(resultadoRecursoWeb);
    } catch (e) {
        handleHttp(res,'Error al Obtener los Recursos Web',e)
    }


}

const getRecursoWeb=async(req:Request,res:Response)=>{

    try {
        const {id}=req.params;
        const resultadoRecursoWeb=await GetRecursoWebService(id);
        res.send(resultadoRecursoWeb)
    } catch (e) {
        handleHttp(res,'Error al Obtener el Recurso Web',e)
    }


}

const updateRecursoWeb=async(req:Request,res:Response)=>{

    try {
        const {id}=req.params;
        const resultadoRecursoWeb=await updateRecursoWebService(req.body,id);
        res.send(resultadoRecursoWeb);
    } catch (e) {
        handleHttp(res,'Error al Actualizar el Recurso Web' ,e)
    }


}

const deleteRecursoWeb=async(req:Request,res:Response)=>{

    try {
        const {id}=req.params;
        const resultadoRecursoWeb=await deleteRecursoWebService(id);
        res.send(resultadoRecursoWeb);
    } catch (e) {
        handleHttp(res,'Error al Eliminar el Recurso Web',e)
    }


}

const insertRecursoWeb=async(req:Request,res:Response)=>{

    try {
        const resultadoRecursoWeb=await insertRecursoWebService(req.body);
        res.send(resultadoRecursoWeb);
    } catch (e) {
        handleHttp(res,'Error al Crear el Recurso Web',e)
    }


}

export {getRecursosWeb,getRecursoWeb,updateRecursoWeb,deleteRecursoWeb,insertRecursoWeb}
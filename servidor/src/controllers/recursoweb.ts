import { Request,response,Response } from "express";
import {GetRecursosWebService,GetRecursoWebService,updateRecursoWebService,deleteRecursoWebService,insertRecursoWebService,GetRecursoWebServiceGrado,
    insertRecursoArchivoService,GetRecursoArchivoServiceGrado,updateRecursoArchivoService,deleteRecursoArchivoService} from "../service/recursoweb";
import { handleHttp } from "../utils/error.handle";


const getRecursosWeb=async(req:Request,res:Response)=>{

    try {
        const resultadoRecursoWeb=await GetRecursosWebService();
        res.send(resultadoRecursoWeb);
    } catch (e) {
        handleHttp(e, req, res);
    }


}

const getRecursoWeb=async(req:Request,res:Response)=>{

    try {
        const {id}=req.params;
        const resultadoRecursoWeb=await GetRecursoWebService(id);
        res.send(resultadoRecursoWeb)
    } catch (e) {
        handleHttp(e, req, res);
    }


}

const updateRecursoWeb=async(req:Request,res:Response)=>{

    try {
        const {id}=req.params;
        const resultadoRecursoWeb=await updateRecursoWebService(req.body,id);
        res.send(resultadoRecursoWeb);
    } catch (e) {
        handleHttp(e, req, res);
    }


}

const deleteRecursoWeb=async(req:Request,res:Response)=>{

    try {
        const {id}=req.params;
        const resultadoRecursoWeb=await deleteRecursoWebService(id);
        res.send(resultadoRecursoWeb);
    } catch (e) {
        handleHttp(e, req, res);
    }


}

const insertRecursoWeb=async(req:Request,res:Response)=>{

    try {
        const resultadoRecursoWeb=await insertRecursoWebService(req.body);
        res.send(resultadoRecursoWeb);
    } catch (e) {
        handleHttp(e, req, res);
    }


}

const getRecursoWebGrado=async(req:Request,res:Response)=>{

    try {
        const {id}=req.params;
        const resultadoRecursoWeb=await GetRecursoWebServiceGrado(id);
        res.send(resultadoRecursoWeb)
    } catch (e) {
        handleHttp(e, req, res);
    }


}

//Recursos de archivos

const updateRecursoArchivo=async(req:Request,res:Response)=>{

    try {
        const {id}=req.params;
        const resultadoRecursoWeb=await updateRecursoArchivoService(req.body,id);
        res.send(resultadoRecursoWeb);
    } catch (e) {
        handleHttp(e, req, res);
    }


}

const deleteRecursoArchivo=async(req:Request,res:Response)=>{

    try {
        const {id}=req.params;
        const resultadoRecursoWeb=await deleteRecursoArchivoService(id);
        res.send(resultadoRecursoWeb);
    } catch (e) {
        handleHttp(e, req, res);
    }


}

const insertRecursoArchivo=async(req:Request,res:Response)=>{

    try {
        const resultadoRecursoWeb=await insertRecursoArchivoService(req.body);
        res.send(resultadoRecursoWeb);
    } catch (e) {
        handleHttp(e, req, res);
    }


}

const getRecursoArchivoGrado=async(req:Request,res:Response)=>{

    try {
        const {id}=req.params;
        const resultadoRecursoWeb=await GetRecursoArchivoServiceGrado(id);
        res.send(resultadoRecursoWeb)
    } catch (e) {
        handleHttp(e, req, res);
    }


}

export {getRecursosWeb,getRecursoWeb,updateRecursoWeb,deleteRecursoWeb,insertRecursoWeb,getRecursoWebGrado,
    deleteRecursoArchivo,updateRecursoArchivo,insertRecursoArchivo,getRecursoArchivoGrado}
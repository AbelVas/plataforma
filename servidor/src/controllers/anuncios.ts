import { Request,response,Response } from "express";
import { GetAnunciosService,GetAnuncioService,updateAnuncioService,deleteAnuncioService,insertAnuncioService,GetAnuncioServiceGrado } from "../service/anuncios";
import { handleHttp } from "../utils/error.handle";


const getAnuncios=async(req:Request,res:Response)=>{

    try {
        const resultadoAnuncio=await GetAnunciosService();
        res.send(resultadoAnuncio);
    } catch (e) {
        handleHttp(e, req, res);
    }


}

const getAnuncio=async(req:Request,res:Response)=>{

    try {
        const {id}=req.params;
        const resultadoAnuncio=await GetAnuncioService(id);
        res.send(resultadoAnuncio)
    } catch (e) {
        handleHttp(e, req, res);
    }


}

const updateAnuncio=async(req:Request,res:Response)=>{

    try {
        const {id}=req.params;
        const resultadoAnuncio=await updateAnuncioService(req.body,id);
        res.send(resultadoAnuncio);
    } catch (e) {
        handleHttp(e, req, res);
    }


}

const deleteAnuncio=async(req:Request,res:Response)=>{

    try {
        const {id}=req.params;
        const resultadoAnuncio=await deleteAnuncioService(id);
        res.send(resultadoAnuncio);
    } catch (e) {
        handleHttp(e, req, res);
    }


}

const insertAnuncio=async(req:Request,res:Response)=>{

    try {
        const resultadoAnuncio=await insertAnuncioService(req.body);
        res.send(resultadoAnuncio);
    } catch (e) {
        handleHttp(e, req, res);
    }


}

const getAnuncioGrado=async(req:Request,res:Response)=>{

    try {
        const {id}=req.params;
        const resultadoAnuncio=await GetAnuncioServiceGrado(id);
        res.send(resultadoAnuncio)
    } catch (e) {
        handleHttp(e, req, res);
    }


}

export {getAnuncios,getAnuncio,updateAnuncio,deleteAnuncio,insertAnuncio,getAnuncioGrado}
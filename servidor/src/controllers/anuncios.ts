import { Request,response,Response } from "express";
import { GetAnunciosService,GetAnuncioService,updateAnuncioService,deleteAnuncioService,insertAnuncioService,GetAnuncioServiceGrado } from "../service/anuncios";
import { handleHttp } from "../utils/error.handle";


const getAnuncios=async(req:Request,res:Response)=>{

    try {
        const resultadoAnuncio=await GetAnunciosService();
        res.send(resultadoAnuncio);
    } catch (e) {
        handleHttp(res,'Error al Obtener los Anuncios',e)
    }


}

const getAnuncio=async(req:Request,res:Response)=>{

    try {
        const {id}=req.params;
        const resultadoAnuncio=await GetAnuncioService(id);
        res.send(resultadoAnuncio)
    } catch (e) {
        handleHttp(res,'Error al Obtener el Anuncio',e)
    }


}

const updateAnuncio=async(req:Request,res:Response)=>{

    try {
        const {id}=req.params;
        const resultadoAnuncio=await updateAnuncioService(req.body,id);
        res.send(resultadoAnuncio);
    } catch (e) {
        handleHttp(res,'Error al Actualizar el Anuncio' ,e)
    }


}

const deleteAnuncio=async(req:Request,res:Response)=>{

    try {
        const {id}=req.params;
        const resultadoAnuncio=await deleteAnuncioService(id);
        res.send(resultadoAnuncio);
    } catch (e) {
        handleHttp(res,'Error al Eliminar el Anuncio',e)
    }


}

const insertAnuncio=async(req:Request,res:Response)=>{

    try {
        const resultadoAnuncio=await insertAnuncioService(req.body);
        res.send(resultadoAnuncio);
    } catch (e) {
        handleHttp(res,'Error al Crear el Anuncio',e)
    }


}

const getAnuncioGrado=async(req:Request,res:Response)=>{

    try {
        const {id}=req.params;
        const resultadoAnuncio=await GetAnuncioServiceGrado(id);
        res.send(resultadoAnuncio)
    } catch (e) {
        handleHttp(res,'Error al Obtener el Anuncio',e)
    }


}

export {getAnuncios,getAnuncio,updateAnuncio,deleteAnuncio,insertAnuncio,getAnuncioGrado}
import { Request,response,Response } from "express";
import {deleteSeccionService,updateSeccionService,insertarSeccionService,getSeccionesService,getSeccionService} from "../service/secciones";
import { handleHttp } from "../utils/error.handle";

const getSecciones=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params
        const resultadoGrados=await getSeccionesService();
        res.send(resultadoGrados);
    } catch (e) {
        handleHttp(res,'Error al Obtener la Sección')
    }
}
const getSeccion=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params
        const resultadoGrados=await getSeccionService(id);
        res.send(resultadoGrados);
    } catch (e) {
        handleHttp(res,'Error al Obtener la Sección')
    }
}
const updateSeccion=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params
        const resultadoGrados=await updateSeccionService(id,req.body);
        res.send(resultadoGrados);
    } catch (e) {
        handleHttp(res,'Error al Actualizar la Sección')
    }
}
const deleteSeccion=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params
        const resultadoGrados=await deleteSeccionService(id);
        res.send(resultadoGrados);
    } catch (e) {
        handleHttp(res,'Error al Eliminar Sección')
    }
}
const insertSeccion=async(req:Request,res:Response)=>{
    try {
        const resultadoGrados=await insertarSeccionService(req.body);
        res.send(resultadoGrados);
    } catch (e) {
        handleHttp(res,'Error al Crear la Sección')
    }
}

export {getSecciones,getSeccion,updateSeccion,deleteSeccion,insertSeccion}
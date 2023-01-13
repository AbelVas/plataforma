import { Request,response,Response } from "express";
import {getTemaService, getTemasService, getTemaActivoService, insertarTemaService, updateTemaService, deleteTemaService} from "../service/temas";
import { handleHttp } from "../utils/error.handle";

const getTemas=async(req:Request,res:Response)=>{
    try {
        const resultadoTemas=await getTemasService();
        res.send(resultadoTemas);
    } catch (e) {
        handleHttp(res,'Error al Obtener los Temas')
    }
}
const getTema=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params
        const resultadoTemas=await getTemaService(id);
        res.send(resultadoTemas);
    } catch (e) {
        handleHttp(res,'Error al Obtener el Tema')
    }
}
const getTemaActivo=async(req:Request,res:Response)=>{
    try {
        const {activo}=req.params
        const resultadoTemas=await getTemaActivoService(activo);
        res.send(resultadoTemas);
    } catch (e) {
        handleHttp(res,'Error al Obtener el Tema Activo')
    }
}
const updateTema=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params
        const resultadoTemas=await updateTemaService(id,req.body);
        res.send(resultadoTemas);
    } catch (e) {
        handleHttp(res,'Error al Actualizar el Tema')
    }
}
const deleteTema=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params
        const resultadoTemas=await deleteTemaService(id);
        res.send(resultadoTemas);
    } catch (e) {
        handleHttp(res,'Error al Eliminar el Tema')
    }
}
const insertTema=async(req:Request,res:Response)=>{
    try {
        const resultadoTemas=await insertarTemaService(req.body);
        res.send(resultadoTemas);
    } catch (e) {
        handleHttp(res,'Error al Crear el Tema')
    }
}

export {getTemas, getTema, getTemaActivo, updateTema, deleteTema, insertTema}
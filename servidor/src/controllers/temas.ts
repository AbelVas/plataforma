import { Request,response,Response } from "express";
import {getTemaService, getTemasService, getTemaActivoService, insertarTemaService, updateTemaService, deleteTemaService} from "../service/temas";
import { handleHttp } from "../utils/error.handle";

const getTemas=async(req:Request,res:Response)=>{
    try {
        const resultadoTemas=await getTemasService();
        res.send(resultadoTemas);
    } catch (e) {
        handleHttp(e, req, res);
    }
}
const getTema=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params
        const resultadoTemas=await getTemaService(id);
        res.send(resultadoTemas);
    } catch (e) {
        handleHttp(e, req, res);
    }
}
const getTemaActivo=async(req:Request,res:Response)=>{
    try {
        const {activo}=req.params
        const resultadoTemas=await getTemaActivoService(activo);
        res.send(resultadoTemas);
    } catch (e) {
        handleHttp(e, req, res);
    }
}
const updateTema=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params
        const resultadoTemas=await updateTemaService(id,req.body);
        res.send(resultadoTemas);
    } catch (e) {
        handleHttp(e, req, res);
    }
}
const deleteTema=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params
        const resultadoTemas=await deleteTemaService(id);
        res.send(resultadoTemas);
    } catch (e) {
        handleHttp(e, req, res);
    }
}
const insertTema=async(req:Request,res:Response)=>{
    try {
        const resultadoTemas=await insertarTemaService(req.body);
        res.send(resultadoTemas);
    } catch (e) {
        handleHttp(e, req, res);
    }
}

export {getTemas, getTema, getTemaActivo, updateTema, deleteTema, insertTema}
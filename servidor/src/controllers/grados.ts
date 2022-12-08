import { Request,response,Response } from "express";
import {GetGradosService,GetGradoService,updateGradoService,deleteGradoService,insertGradoService, getGradoNivelService,getGradoxJornada} from "../service/grados";
import { handleHttp } from "../utils/error.handle";
// Mi primer Appi Queza


const getGrados=async(req:Request,res:Response)=>{
    try {
        const resultadoGrados=await GetGradosService();
        res.send(resultadoGrados);
    } catch (e) {
        handleHttp(res,'Error al Obtener los Grados')
    }
}
const getGrado=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params;
        const resultadoGrado=await GetGradoService(id);
        res.send(resultadoGrado)
    } catch (e) {
        handleHttp(res,'Error al Obtener el Grado')
    }
}
const updateGrado=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params;
        const resultadoGrado=await updateGradoService(req.body,id);
        res.send(resultadoGrado);
    } catch (e) {
        handleHttp(res,'Error al Actualizar el Curso' )
    }
}
const deleteGrado=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params;
        const resultadoGrado=await deleteGradoService(id);
        res.send(resultadoGrado);
    } catch (e) {
        handleHttp(res,'Error al Eliminar el Curso')
    }
}
const insertarGrado=async(req:Request,res:Response)=>{
    try {
        const resultadoGrado=await insertGradoService(req.body);
        res.send(resultadoGrado);
    } catch (e) {
        handleHttp(res,'Error al Crear el Grado',e)
    }
}
const getGradosNivel=async(req:Request, res:Response)=>{
    try{
        const {id}=req.params;
        const resultadoGradoNivel=await getGradoNivelService(id);
        res.send(resultadoGradoNivel)
    }catch(e){
        handleHttp(res,'Error al buscar el Grado por nivel',e)
    }
}
const getGradoJornada=async(req:Request, res:Response)=>{
    try{
        const {id}=req.params;
        const resultadoGradoProfesor=await getGradoxJornada(id);
        res.send(resultadoGradoProfesor)
    }catch(e){
        handleHttp(res,'Error al buscar al Grado por Profesor',e)
    }
}

export{getGrados,getGrado,updateGrado,deleteGrado,insertarGrado,getGradosNivel,getGradoJornada}
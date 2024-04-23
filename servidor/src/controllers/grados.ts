import { Request,response,Response } from "express";
import {GetGradosService,GetGradoService,updateGradoService,deleteGradoService,insertGradoService, getGradoNivelService,getGradoxJornada,getGradoProfesorService,GetGradoSeccionService} from "../service/grados";
import { handleHttp } from "../utils/error.handle";
// Mi primer Appi Queza


const getGrados=async(req:Request,res:Response)=>{
    try {
        const resultadoGrados=await GetGradosService();
        res.send(resultadoGrados);
    } catch (e) {
        handleHttp(e, req, res);
    }
}
const getGrado=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params;
        const resultadoGrado=await GetGradoService(id);
        res.send(resultadoGrado)
    } catch (e) {
        handleHttp(e, req, res);
    }
}
const updateGrado=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params;
        const resultadoGrado=await updateGradoService(req.body,id);
        res.send(resultadoGrado);
    } catch (e) {
        handleHttp(e, req, res);
    }
}
const deleteGrado=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params;
        const resultadoGrado=await deleteGradoService(id);
        res.send(resultadoGrado);
    } catch (e) {
        handleHttp(e, req, res);
    }
}
const insertarGrado=async(req:Request,res:Response)=>{
    try {
        const resultadoGrado=await insertGradoService(req.body);
        res.send(resultadoGrado);
    } catch (e) {
        handleHttp(e, req, res);
    }
}
const getGradosNivel=async(req:Request, res:Response)=>{
    try{
        const {id}=req.params;
        const resultadoGradoNivel=await getGradoNivelService(id);
        res.send(resultadoGradoNivel)
    }catch(e){
        handleHttp(e, req, res);
    }
}
const getGradoProfesor=async(req:Request, res:Response)=>{
    try{
        const {id}=req.params;
        const resultadoGradoProfesor=await getGradoProfesorService(id);
        res.send(resultadoGradoProfesor)
    }catch(e){
        handleHttp(e, req, res);
    }
}
const getGradoJornada=async(req:Request, res:Response)=>{
    try{
        const {id}=req.params;
        const resultadoGradoProfesor=await getGradoxJornada(id);
        res.send(resultadoGradoProfesor)
    }catch(e){
        handleHttp(e, req, res);
    }
}
const GetGradoSeccion=async(req:Request, res:Response)=>{
    try{
        const {id}=req.params;
        const resultadoGradoProfesor=await GetGradoSeccionService(id);
        res.send(resultadoGradoProfesor)
    }catch(e){
        handleHttp(e, req, res);
    }
}

export{getGrados,getGrado,updateGrado,deleteGrado,insertarGrado,getGradosNivel,getGradoJornada,getGradoProfesor,GetGradoSeccion}
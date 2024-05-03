import { Request,Response } from "express"
import {ObtenerForo,ObtenerForosCurso,EditarForo,EliminarForo,CrearForo} from "../service/foros"
import { handleHttp } from "../utils/error.handle"

const CreateForo=async (req:Request,res:Response)=>{
    try{
        const response=await CrearForo(req.body);
        res.send (response);
    } catch (e) {
        handleHttp(e, req, res);
    }
}

const GetForo=async (req:Request,res:Response)=>{
    try{
        const {id}=req.params
        const response=await ObtenerForo(id);
        res.send (response);
    } catch (e) {
        handleHttp(e, req, res);
    }
}

const GetForosCurso=async (req:Request,res:Response)=>{
    try{
        const {id}=req.params
        const response=await ObtenerForosCurso(id);
        res.send (response);
    } catch (e) {
        handleHttp(e, req, res);
    }
}

const UpdateForo=async (req:Request,res:Response)=>{
    try{
        const {id}=req.params
        const response=await EditarForo(req.body,id);
        res.send (response);
    } catch (e) {
        handleHttp(e, req, res);
    }
}

const DelForo=async (req:Request,res:Response)=>{
    try{
        const {id}=req.params
        const response=await EliminarForo(id);
        res.send (response);
    } catch (e) {
        handleHttp(e, req, res);
    }
}

export{GetForo,GetForosCurso,UpdateForo,DelForo,CreateForo}
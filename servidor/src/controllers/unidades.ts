import { Request,Response } from "express"
import { insertUnidadService,obtenerUnidadesService,obtenerUnidadService, updateUnidadService,deleteUnidadService,getUnidadesActivasService } from "../service/unidades"
import { handleHttp } from "../utils/error.handle"


const getUnidades= async(req:Request,res:Response)=>{
    try{
       const resultadoUnidades=await obtenerUnidadesService();
       res.send(resultadoUnidades);
    }catch(e){
handleHttp(e, req, res);
    }
}
const getUnidad= async(req:Request,res:Response)=>{
    try{
        const {id}=req.params;
        const resultadoUnidad=await obtenerUnidadService(id);
        res.json(resultadoUnidad);
     
    }catch(e){
handleHttp(e, req, res);
    }
}
const postUnidad=async (req:Request,res:Response)=>{
    try{
        const responseUnidad=await insertUnidadService(req.body);
        res.send(responseUnidad);
    }catch(e){
handleHttp(e, req, res);
    }
}
const updateUnidades=async(req:Request,res:Response)=>{
    try{
        const {id}=req.params;
        const responseUpdate=await updateUnidadService(req.body,id);
        res.send(responseUpdate);
    }catch(e){
handleHttp(e, req, res);
    }
}
const deleteUnidad= async(req:Request,res:Response)=>{
    try{
        const {id}=req.params;
        const responseDelete=await deleteUnidadService(id);
        res.send(responseDelete); 
    }catch(e){
handleHttp(e, req, res);
    }
}
const getUnidadActiva= async(req:Request,res:Response)=>{
    try{
       const resultadoUnidades=await getUnidadesActivasService();
       res.send(resultadoUnidades);
    }catch(e){
handleHttp(e, req, res);
    }
}
export {getUnidades,getUnidad,postUnidad,updateUnidades,deleteUnidad,getUnidadActiva}
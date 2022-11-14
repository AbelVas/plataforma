import { Request,Response } from "express"
import { insertUnidadService,obtenerUnidadesService,obtenerUnidadService, updateUnidadService,deleteUnidadService } from "../service/unidades"
import { handleHttp } from "../utils/error.handle"


const getUnidades= async(req:Request,res:Response)=>{
    try{
       const resultadoUnidades=await obtenerUnidadesService();
       res.send(resultadoUnidades);
    }catch(e){
        handleHttp(res,'Error Al obtener la Unidad')
    }
}
const getUnidad= async(req:Request,res:Response)=>{
    try{
        const {id}=req.params;
        const resultadoUnidad=await obtenerUnidadService(id);
        res.json(resultadoUnidad);
     
    }catch(e){
        handleHttp(res,'Error Al obtener la Unidad')
    }
}
const postUnidad=async (req:Request,res:Response)=>{
    try{
        const responseUnidad=await insertUnidadService(req.body);
        res.send(responseUnidad);
    }catch(e){
        handleHttp(res,'Error al Insertar la Unidad',e)
    }
}
const updateUnidades=async(req:Request,res:Response)=>{
    try{
        const {id}=req.params;
        const responseUpdate=await updateUnidadService(req.body,id);
        res.send(responseUpdate);
    }catch(e){
        handleHttp(res,'Error Al Actualizar la Unidad')
    }
}
const deleteUnidad= async(req:Request,res:Response)=>{
    try{
        const {id}=req.params;
        const responseDelete=await deleteUnidadService(id);
        res.send(responseDelete); 
    }catch(e){
        handleHttp(res,'Error al Eliminar la Unidad: ',e)
    }
}
export {getUnidades,getUnidad,postUnidad,updateUnidades,deleteUnidad}
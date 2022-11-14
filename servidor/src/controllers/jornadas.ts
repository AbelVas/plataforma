import { Request,Response } from "express"
import { obtenerJornadasService,obtenerJornadaService,insertJornadaService,updateJornadaService,deleteJornadaService } from "../service/jornadas"
import { handleHttp } from "../utils/error.handle"

const getJornadas= async(req:Request,res:Response)=>{
    try{
       const resultadoJornada=await obtenerJornadasService();
       res.send(resultadoJornada);
    }catch(e){
        handleHttp(res,'Error al Obtener las Jornadas')
    }
}
const getJornada= async(req:Request,res:Response)=>{
    try{
       const {id}=req.params;
       const resultadoJornada=await obtenerJornadaService(id);
       res.send(resultadoJornada);
    }catch(e){
        handleHttp(res,'Error al Obtener la Jornada')
    }
}
const updateJornada= async(req:Request,res:Response)=>{
    try{
       const {id}=req.params;
       const resultadoJornada=await updateJornadaService(req.body,id);
       res.send(resultadoJornada);
    }catch(e){
        handleHttp(res,'Error al Actualizar la Jornada')
    }
}
const deleteJornada= async(req:Request,res:Response)=>{
    try{
       const {id}=req.params;
       const resultadoJornada=await deleteJornadaService(id);
       res.send(resultadoJornada);
    }catch(e){
        handleHttp(res,'Error al Eliminar la Jornada')
    }
}
const insertarJornada= async(req:Request,res:Response)=>{
    try{
       const resultadoJornada=await insertJornadaService(req.body);
       res.send(resultadoJornada);
    }catch(e){
        handleHttp(res,'Error al Eliminar la Jornada')
    }
}

export {getJornadas,getJornada,updateJornada,deleteJornada,insertarJornada}
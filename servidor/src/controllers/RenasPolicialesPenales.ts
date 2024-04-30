import { Request,Response, query } from "express";
import { eliminarArchivo,obtenerRenasService,obtenerAntecedentesPenalesService,obtenerAntecedentesPoliciacosService,insertarAPenalesService,insertarAPoliciacosService,insertarRenasService} from '../service/RenasPolicialesPenales'
import { handleHttp } from "../utils/error.handle";

const obtenerRenasController=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params
        const nombre='renas'
        const resultadoGrados=await obtenerRenasService(id,nombre);
        res.send(resultadoGrados);
    } catch (e) {
        handleHttp(e, req, res);
    }
}
const obtenerAntecedentesPenalesController=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params
        const nombre='penales'
        const resultadoGrados=await obtenerAntecedentesPenalesService(id,nombre);
        res.send(resultadoGrados);
    } catch (e) {
        handleHttp(e, req, res);
    }
}
const obtenerAntecedentesPoliciacosController=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params
        const nombre='policiacos'
        const resultadoGrados=await obtenerAntecedentesPoliciacosService(id,nombre);
        res.send(resultadoGrados);
    } catch (e) {
        handleHttp(e, req, res);
    }
}
const insertarAPenalesController=async(req:Request,res:Response)=>{
    try {
      const {id}=req.params
      const {peso_archivo}=req.body
      const {ruta_archivo}=req.body
      const resultado=await insertarAPenalesService(id,'penales',peso_archivo,ruta_archivo)
      res.send(resultado)  
    } catch (e) {
       handleHttp(e, req, res); 
    }
}
const insertarAPoliciacosController=async(req:Request,res:Response)=>{
    try {
      const {id}=req.params
      const {peso_archivo}=req.body
      const {ruta_archivo}=req.body
      const resultado=await insertarAPoliciacosService(id,'policiacos',peso_archivo,ruta_archivo)
      res.send(resultado)  
    } catch (e) {
        handleHttp(e, req, res);
    }
}
const insertarRenasController=async(req:Request,res:Response)=>{
    try {
      const {id}=req.params
      const {peso_archivo}=req.body
      const {ruta_archivo}=req.body
      const resultado=await insertarRenasService(id,'renas',peso_archivo,ruta_archivo)
      res.send(resultado)  
    } catch (e) {
        handleHttp(e, req, res);
    }
}
const EliminarArchivoVontroller=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params
        const {tipoArchivo}=req.params
        const query=await eliminarArchivo(id,tipoArchivo)
        res.send(query)
    } catch (e) {
        handleHttp(e, req, res);
    }
}

export {EliminarArchivoVontroller,insertarAPenalesController,insertarAPoliciacosController, insertarRenasController,obtenerRenasController,obtenerAntecedentesPenalesController,obtenerAntecedentesPoliciacosController}
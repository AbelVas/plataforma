import { Request,Response } from "express"
import {GetArchivosService} from "../service/storage"
import { handleHttp } from "../utils/error.handle"

const getArchivos = async (req:Request, res:Response)=>{
    try{

    }catch(e){
        handleHttp(res,'Error al Obtener los Archivos')
    }
}

const getArchivo = async (req:Request, res:Response) =>{
    try{

    }catch(e){
        handleHttp(res,'Error al Obtener el Archivo')
    }
} 

const updateArchivo = async (req:Request, res:Response)=>{
    try{

    }catch(e){
        handleHttp(res,'Error al actualizar el Archivo')
    }
}

const deleteArchivo = async (req:Request, res:Response)=>{
    try{

    }catch(e){
        handleHttp(res,'Error al eliminar el Archivo')
    }
}

const insertArchivo = async (req:Request, res:Response)=>{
    try{

    }catch(e){
        handleHttp(res,'Error al insertar el Archivo')
    }
}

export {getArchivos}
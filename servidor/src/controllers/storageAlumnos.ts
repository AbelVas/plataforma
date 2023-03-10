import { Request,Response } from "express"
import {GetArchivosAlumnosService} from "../service/storageAlumnos"
import { handleHttp } from "../utils/error.handle"

const getArchivosAlumnos = async (req:Request, res:Response)=>{
    try{

    }catch(e){
        handleHttp(res,'Error al Obtener los Archivos')
    }
}

const getArchivoAlumno = async (req:Request, res:Response) =>{
    try{

    }catch(e){
        handleHttp(res,'Error al Obtener el Archivo')
    }
} 

const updateArchivoAlumno = async (req:Request, res:Response)=>{
    try{

    }catch(e){
        handleHttp(res,'Error al actualizar el Archivo')
    }
}

const deleteArchivoAlumno = async (req:Request, res:Response)=>{
    try{

    }catch(e){
        handleHttp(res,'Error al eliminar el Archivo')
    }
}

const insertArchivoAlumno = async (req:Request, res:Response)=>{
    try{

    }catch(e){
        handleHttp(res,'Error al insertar el Archivo')
    }
}

export {getArchivosAlumnos,getArchivoAlumno,updateArchivoAlumno,deleteArchivoAlumno,insertArchivoAlumno}
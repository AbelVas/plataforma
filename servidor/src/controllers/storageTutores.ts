import { Request,Response } from "express"
import {GetArchivosTutorService} from "../service/storageTutores"
import { handleHttp } from "../utils/error.handle"

const getArchivosTutores = async (req:Request, res:Response)=>{
    try{

    }catch(e){
        handleHttp(res,'Error al Obtener los Archivos')
    }
}

const getArchivoTutor = async (req:Request, res:Response) =>{
    try{

    }catch(e){
        handleHttp(res,'Error al Obtener el Archivo')
    }
} 

const updateArchivoTutores = async (req:Request, res:Response)=>{
    try{

    }catch(e){
        handleHttp(res,'Error al actualizar el Archivo')
    }
}

const deleteArchivoTutores = async (req:Request, res:Response)=>{
    try{

    }catch(e){
        handleHttp(res,'Error al eliminar el Archivo')
    }
}

const insertArchivoTutores = async (req:Request, res:Response)=>{
    try{

    }catch(e){
        handleHttp(res,'Error al insertar el Archivo')
    }
}

export {getArchivosTutores,getArchivoTutor,updateArchivoTutores,deleteArchivoTutores,insertArchivoTutores}
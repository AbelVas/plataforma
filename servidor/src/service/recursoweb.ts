import { Request, Response } from "express";
import conexion from "../config/database";

//insertar, editar, obtener al cuadrado y eliminar tbrecurso web
// id: "idtbRecursoVideo"

const GetRecursosWebService=async()=>{

    const responseGet=await conexion.query('SELECT * FROM tbRecursoWeb');
    return responseGet;

}

const GetRecursoWebService=async(id:string)=>{

    const responseGet=await conexion.query('SELECT * FROM tbRecursoWeb WHERE idtbRecursoVideo=?',[id]);
    return responseGet;

}

const updateRecursoWebService=async(data:Request,id:string)=>{
   
    const responseUpdate=await conexion.query('UPDATE tbRecursoWeb SET ? WHERE idtbRecursoVideo=?',[data,id]);
    return responseUpdate;

}

const deleteRecursoWebService=async(id:string)=>{
    
    const responseDelete=await conexion.query('DELETE FROM tbRecursoWeb WHERE idtbRecursoVideo=?',[id]);
    return responseDelete;

}

const insertRecursoWebService=async(data:Request)=>{
    
    const responseInsert=await conexion.query('INSERT INTO tbRecursoWeb set ?',[data]);
    return responseInsert;

}

const GetRecursoWebServiceGrado=async(id:string)=>{

    const responseGet=await conexion.query('SELECT * FROM tbRecursoWeb WHERE idCurso=?',[id]);
    return responseGet;

}

//Recursos de archivos

const insertRecursoArchivoService=async(data:Request)=>{
    
    const responseInsert=await conexion.query('INSERT INTO tbRecursoArchivo set ?',[data]);
    return responseInsert;

}

const GetRecursoArchivoServiceGrado=async(id:string)=>{

    const responseGet=await conexion.query('SELECT * FROM tbRecursoArchivo WHERE idCurso=?',[id]);
    return responseGet;

}

const updateRecursoArchivoService=async(data:Request,id:string)=>{
   
    const responseUpdate=await conexion.query('UPDATE tbRecursoArchivo SET ? WHERE idtbRecursoVideo=?',[data,id]);
    return responseUpdate;

}

const deleteRecursoArchivoService=async(id:string)=>{
    
    const responseDelete=await conexion.query('DELETE FROM tbRecursoArchivo WHERE idtbRecursoVideo=?',[id]);
    return responseDelete;

}

export{GetRecursosWebService,GetRecursoWebService,updateRecursoWebService,deleteRecursoWebService,insertRecursoWebService,GetRecursoWebServiceGrado,
    insertRecursoArchivoService,GetRecursoArchivoServiceGrado,updateRecursoArchivoService,deleteRecursoArchivoService}
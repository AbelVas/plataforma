import { Request, Response } from "express";
import conexion from "../config/database";

const GetAnunciosService=async()=>{

    const responseGet=await conexion.query('SELECT * FROM tbAnuncio');
    return responseGet;

}

const GetAnuncioService=async(id:string)=>{

    const responseGet=await conexion.query('SELECT * FROM tbAnuncio WHERE idAnuncio=?',[id]);
    return responseGet;

}

const updateAnuncioService=async(data:Request,id:string)=>{
   
    const responseUpdate=await conexion.query('UPDATE tbAnuncio SET ? WHERE idAnuncio=?',[data,id]);
    return responseUpdate;

}

const deleteAnuncioService=async(id:string)=>{
    
    const responseDelete=await conexion.query('DELETE FROM tbAnuncio WHERE idAnuncio=?',[id]);
    return responseDelete;

}

const insertAnuncioService=async(data:Request)=>{
    
    const responseInsert=await conexion.query('INSERT INTO tbAnuncio set ?',[data]);
    return responseInsert;

}

const GetAnuncioServiceGrado=async(id:string)=>{

    const responseGet=await conexion.query('SELECT * FROM tbAnuncio WHERE idCurso=?',[id]);
    return responseGet;

}

export{GetAnunciosService,GetAnuncioService,updateAnuncioService,deleteAnuncioService,insertAnuncioService,GetAnuncioServiceGrado}
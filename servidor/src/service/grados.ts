import { Request, Response } from "express";
import conexion from "../config/database";
// Mi primer Appi Queza

const GetGradosService=async()=>{

    const responseGet=await conexion.query('SELECT * FROM tbGrado');
    return responseGet;

}

const GetGradoService=async(id:string)=>{

    const responseGet=await conexion.query('SELECT * FROM tbGrado WHERE idGrado=?',[id]);
    return responseGet;

}

const updateGradoService=async(data:Request,id:string)=>{
   
    const responseUpdate=await conexion.query('UPDATE tbGrado SET ? WHERE idGrado=?',[data,id]);
    return responseUpdate;

}

const deleteGradoService=async(id:string)=>{
    
    const responseDelete=await conexion.query('DELETE FROM tbGrado WHERE idGrado=?',[id]);
    return responseDelete;

}

const insertGradoService=async(data:Request)=>{
    
    const responseInsert=await conexion.query('INSERT INTO tbGrado set ?',[data]);
    return responseInsert;

}

const getGradoNivelService=async(idNivel:string)=>{
    const responseGetNivel=await conexion.query('SELECT * FROM tbGrado WHERE idNivel=?',[idNivel]);
    return responseGetNivel;
}

export{GetGradosService,GetGradoService,updateGradoService,deleteGradoService,insertGradoService, getGradoNivelService}
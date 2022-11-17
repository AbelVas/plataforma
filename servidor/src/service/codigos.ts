import { Request, response, Response } from "express";
import conexion from "../config/database";

const obtenerCodigosService=async()=>{
    const responseGet = await conexion.query('SELECT * FROM tbCodigo');
    return responseGet;
}

const obtenerCodigoService=async(id:string)=>{
    const responseGet = await conexion.query('SELECT * FROM tbCodigo WHERE idCodigo=?', [id]);
    return responseGet;
}

const updateCodigoService= async(data:Request, id:string)=>{
    const responseUpdate = await conexion.query('UPDATE tbCodigo SET ? WHERE idCodigo=?', [data,id]);
    return responseUpdate;
}

const deleteCodigoService = async(id:string)=>{
    const responseDelete = await conexion.query('DELETE FROM tbCodigo WHERE idCodigo=?',[id]);
    return responseDelete;
}

const insertCodigoService = async (data:Request)=>{
    const responseInsert=await conexion.query('INSERT INTO tbCodigo set ?', [data]);
    return responseInsert;
}

export {obtenerCodigoService, obtenerCodigosService, updateCodigoService, deleteCodigoService, insertCodigoService}
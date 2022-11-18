import { Request, response, Response } from "express";
import conexion from "../config/database";

const obtenertiposcodigoService=async()=>{
    const responseGet = await conexion.query('SELECT * FROM tbTipoCodigo');
    return responseGet;
}

const obtenertipocodigoService=async(id:string)=>{
    const responseGet=await conexion.query('SELECT * FROM tbTipoCodigo WHERE idTipoCodigo=?', [id]);
    return responseGet;
}

const updatetipocodigoService=async(data:Request,id:string)=>{
    const responseUpdate=await conexion.query('UPDATE tbTipoCodigo SET ? WHERE idTipoCodigo=?',[data,id])
    return responseUpdate;
}

const deletetipocodigoService=async(id:string)=>{
    const responseDelete=await conexion.query('DELETE FROM tbTipoCodigo WHERE idTipoCodigo=?', [id]);
    return responseDelete;
}

const inserttipocodigoService=async(data:Request)=>{
    const responseInsert=await conexion.query('INSERT INTO tbTipoCodigo SET ?', [data]);
    responseInsert;
}

export {obtenertiposcodigoService, obtenertipocodigoService, updatetipocodigoService, deletetipocodigoService, inserttipocodigoService}
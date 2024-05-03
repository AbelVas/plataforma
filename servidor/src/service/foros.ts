import { Request, response, Response } from "express";
import conexion from "../config/database";

const CrearForo=async(data:any)=>{
    const response = await conexion.query('INSERT INTO tbForo set ?',[data])
}


const ObtenerForo=async(idForo:any)=>{
    const responseGet = await conexion.query('SELECT * FROM tbForo WHERE idForo=?',[idForo])
    return responseGet;
}

const ObtenerForosCurso=async(idCurso:any)=>{
    const responseGet = await conexion.query('SELECT * FROM tbForo f INNER JOIN tbUnidad u ON u.idUnidad = f.idUnidad WHERE f.idCurso=? and u.estado = 1',[idCurso])
    return responseGet;
}

const EditarForo=async(data:any,idForo:any)=>{
    const response=await conexion.query('UPDATE tbForo SET ? WHERE idForo=?',[data,idForo])
    return response;
}

const EliminarForo=async(idForo:any)=>{
    const response = await conexion.query('DELETE FROM tbForo WHERE idForo=?',[idForo])
    return response;
}


export{ObtenerForo,ObtenerForosCurso,EditarForo,EliminarForo,CrearForo}
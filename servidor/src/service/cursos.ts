import { Request, response, Response } from "express";
import conexion from "../config/database";

const obtenerCursosService= async() =>{
    const responseGet=await conexion.query('SELECT * FROM tbCurso');
    return responseGet;
}

const obtenerCursoService= async(id:string)=>{
    const responseGet= await conexion.query('SELECT * FROM tbCurso WHERE idCurso=?',[id]);
    return responseGet;
}

const updateCursosService = async(data:Request, id:string)=>{
    const responseUpdate= await conexion.query('UPDATE tbCurso SET ? WHERE idCurso=?',[data,id]);
    return responseUpdate;
}

const deleteCursosService = async(id:string)=>{
    const responseDelete=await conexion.query('DELETE FROM tbCurso WHERE idCurso=?',[id]);
    return responseDelete;
}

const insertCursosService=async(data:Request)=>{
    const responseInsert=await conexion.query('INSERT INTO tbCurso set ?',[data]);
    return responseInsert;
}

export {obtenerCursosService, obtenerCursoService, updateCursosService, deleteCursosService, insertCursosService}
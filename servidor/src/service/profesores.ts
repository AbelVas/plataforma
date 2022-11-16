import { Request, Response } from "express";
import conexion from "../config/database";

const obtenerProfesoresService=async()=>{
    const responseGet=await conexion.query('SELECT * FROM tbProfesor WHERE idRol=2');
    return responseGet;
}
const obtenerProfesorService=async(id:string)=>{
    const responseGet=await conexion.query('SELECT * FROM tbProfesor WHERE idRol=2 and idProfesor=?',[id]);
    return responseGet;
}
const updateProfesorService=async(data:Request,id:string)=>{
    const responseUpdate=await conexion.query('UPDATE tbProfesor SET ? WHERE idRol=2 and idProfesor=?',[data,id]);
    return responseUpdate;
}
const deleteProfesorService=async(id:string)=>{
    const responseDelete=await conexion.query('DELETE FROM tbProfesor WHERE idRol=2 and idProfesor=?',[id]);
    return responseDelete;
}
const insertProfesorService=async(data:Request)=>{
    const responseInsert=await conexion.query('INSERT INTO tbProfesor set ?',[data]);
    return responseInsert;
}

export{obtenerProfesoresService,obtenerProfesorService,updateProfesorService,deleteProfesorService,insertProfesorService}
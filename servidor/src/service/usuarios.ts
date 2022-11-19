import { Request, Response } from "express";
import conexion from "../config/database";

//CRUD
const insertAlumnosService=async(data:Request)=>{
    const responseInsert=await conexion.query('INSERT INTO tbAlumno set ?',[data]);
    return responseInsert;
}
const obtenerAlumnosService=async()=>{
    const responseGet=await conexion.query('SELECT * FROM tbAlumno WHERE idRol=4');
    return responseGet;
}
const obtenerAlumnosGradoService=async(id:string)=>{
    const responseGet=await conexion.query('SELECT * FROM tbAlumno WHERE idRol=4 and idGrado=?',[id]);
    return responseGet;
}
const obtenerAlumnoService=async(id:string)=>{
    const responseGet=await conexion.query('SELECT * FROM tbAlumno WHERE idRol=4 and idAlumno=?',[id]);
    return responseGet;
}
const updateAlumnosService=async(data:Request,id:string)=>{
    const responseUpdate=await conexion.query('UPDATE tbAlumno SET ? WHERE idRol=4 and idAlumno=?',[data,id]);
    return responseUpdate;
}
const deleteAlumnoService=async(id:string)=>{
    const responseDelete=await conexion.query('DELETE FROM tbAlumno WHERE idRol=4 and idAlumno=?',[id]);
    return responseDelete;
}

const validarAlumnosExisteSi=async(usuario:string)=>{
    const data=await conexion.query('SELECT idAlumno FROM tbAlumno WHERE usuario=?',[usuario]);
    return data;
}
export{insertAlumnosService,obtenerAlumnosService,obtenerAlumnosGradoService,obtenerAlumnoService,updateAlumnosService,deleteAlumnoService,validarAlumnosExisteSi}
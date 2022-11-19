import { Request, Response } from "express";
import conexion from "../config/database";

//CRUD
const insertTutoresService=async(data:Request)=>{
    const responseInsert=await conexion.query('INSERT INTO tbTutor set ?',[data]);
    return responseInsert;
}
const obtenerTutoresService=async()=>{
    const responseGet=await conexion.query('SELECT `idTutor`, `nombre_tutor`, `apellido_tutor`, `telefono1`, `telefono2`, `direccion`, `usuario`, `fecha_nacimiento`, `estado` FROM tbTutor');
    return responseGet;
}
const obtenerTutorService=async(id:string)=>{
    const responseGet=await conexion.query('SELECT `idTutor`, `nombre_tutor`, `apellido_tutor`, `telefono1`, `telefono2`, `direccion`, `usuario`, `fecha_nacimiento`, `estado` FROM tbTutor WHERE idTutor=?',[id]);
    return responseGet;
}
const updateTutorService=async(data:Request,id:string)=>{
    const responseUpdate=await conexion.query('UPDATE tbTutor SET ? WHERE idTutor=?',[data,id]);
    return responseUpdate;
}
const deleteTutoresService=async(id:string)=>{
    const responseDelete=await conexion.query('DELETE FROM tbTutor WHERE idTutor=?',[id]);
    return responseDelete;
}

const validarTutoresExisteSi=async(usuario:string,telefono1:string)=>{
    const data=await conexion.query('SELECT idTutor FROM tbTutor WHERE usuario=? and telefono1=?',[usuario,telefono1]);
    return data;
}
export{insertTutoresService,obtenerTutoresService,obtenerTutorService,updateTutorService,deleteTutoresService,validarTutoresExisteSi}
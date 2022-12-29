import { Request, Response } from "express";
import conexion from "../config/database";

const insertUnidadService=async (dato:Request)=>{
    const responseInsert=await conexion.query('INSERT INTO tbUnidad set ?',[dato]);
    return responseInsert;
}
const obtenerUnidadesService=async()=>{
    const responseGet=await conexion.query('SELECT `idUnidad`, `unidad`, `fecha_inicio`, `fecha_final`, `estado` FROM tbUnidad');
    return responseGet;
}
const obtenerUnidadService=async(id:string)=>{
    const responseGet=await conexion.query('SELECT `idUnidad`, `unidad`, `fecha_inicio`, `fecha_final`, `estado` FROM tbUnidad WHERE idUnidad=?',[id]);
    return responseGet;
}
const updateUnidadService=async(dato:Request,id:string)=>{
    const responseUpdate=await conexion.query('UPDATE tbUnidad SET ? WHERE idUnidad=?',[dato,id]);
    return responseUpdate;
}
const deleteUnidadService=async(id:string)=>{
    const responseDelete=await conexion.query('DELETE FROM tbUnidad WHERE idUnidad=?',[id]);
    return responseDelete;
}
const getUnidadesActivasService=async()=>{
    const responseGet=await conexion.query('SELECT `idUnidad`, `unidad` FROM tbUnidad WHERE estado=1');
    return responseGet;
}
export {insertUnidadService,obtenerUnidadesService,obtenerUnidadService,updateUnidadService,deleteUnidadService,getUnidadesActivasService};
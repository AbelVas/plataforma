import { Request, Response } from "express";
import conexion from "../config/database";

const obtenerJornadasService=async()=>{
    const responseGet=await conexion.query('SELECT idJornada, jornada, creada, activo FROM tbJornada');
    return responseGet;
}
const obtenerJornadaService=async(id:string)=>{
    const responseGet=await conexion.query('SELECT idJornada, jornada, creada, activo FROM tbJornada WHERE idJornada=?',[id]);
    return responseGet;
}
const updateJornadaService=async(data:Request,id:string)=>{
    const responseUpdate=await conexion.query('UPDATE tbJornada SET ? WHERE idJornada=?',[data,id]);
    return responseUpdate;
}
const deleteJornadaService=async(id:string)=>{
    const responseDelete=await conexion.query('DELETE FROM tbJornada WHERE idJornada=?',[id]);
    return responseDelete;
}
const insertJornadaService=async (data:Request)=>{
    const responseInsert=await conexion.query('INSERT INTO tbJornada set ?',[data]);
    return responseInsert;
}

export {obtenerJornadasService,obtenerJornadaService,updateJornadaService,deleteJornadaService,insertJornadaService}
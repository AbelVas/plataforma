import { Request, Response } from "express";
import conexion from "../config/database";

const getSeccionService=async(id:string)=>{
    const  response=await conexion.query("SELECT idSeccion, seccion FROM tbSeccion WHERE idSeccion=?",[id]);
    return response;
}
const getSeccionesService=async()=>{
    const  response=await conexion.query("SELECT idSeccion, seccion FROM tbSeccion");
    return response;
}
const insertarSeccionService=async(data:Request)=>{
    const  response=await conexion.query("INSERT INTO tbSeccion SET ?",[data]);
    return response;
}
const updateSeccionService=async(id:string,data:Request)=>{
    const  response=await conexion.query("UPDATE tbSeccion SET ? WHERE idSeccion=?",[data,id]);
    return response;
}
const deleteSeccionService=async(id:string)=>{
    const  response=await conexion.query("DELETE FROM tbSeccion WHERE idSeccion=?",[id]);
    return response;
}
export {deleteSeccionService,updateSeccionService,insertarSeccionService,getSeccionesService,getSeccionService}
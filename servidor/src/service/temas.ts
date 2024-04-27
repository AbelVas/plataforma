import { Request, Response } from "express";
import conexion from "../config/database";

const getTemaService=async(id:string)=>{
    const  response=await conexion.query("SELECT idTema, nombre_tema, navbar1, navbar2, fondo1, fondo2, texto1, texto2, estado FROM tbTema WHERE idTema=?",[id]);
    return response;
}

const getTemaActivoService=async(activo:string)=>{
    const  response=await conexion.query("SELECT idTema, nombre_tema, navbar1, navbar2, fondo1, fondo2, texto1, texto2, estado FROM tbTema WHERE estado=?",[activo]);
    return response;
}
const getTemasService=async()=>{
    const  response=await conexion.query("SELECT * FROM tbTema");
    return response;
}
const insertarTemaService=async(data:Request)=>{
    const  response=await conexion.query("INSERT INTO tbTema SET ?",[data]);
    return response;
}
const updateTemaService=async(id:string,data:Request)=>{
    const  response=await conexion.query("UPDATE tbTema SET ? WHERE idTema=?",[data,id]);
    return response;
}
const deleteTemaService=async(id:string)=>{
    const  response=await conexion.query("DELETE FROM tbTema WHERE idTema=?",[id]);
    return response;
}

export {getTemaService, getTemasService, getTemaActivoService, insertarTemaService, updateTemaService, deleteTemaService}
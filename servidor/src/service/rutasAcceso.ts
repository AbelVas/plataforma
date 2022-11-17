import { Request, Response } from "express";
import conexion from "../config/database";

const getRutasService=async(idRol:string)=>{
    const response=await conexion.query("SELECT nombre,path,component,descripcion FROM tbRutaMenu WHERE idRol=? and activo=1",[idRol]);
    return response;
}


export {getRutasService}
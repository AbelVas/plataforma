import { Request, Response } from "express";
import conexion from "../config/database";

const sidebarServiceAdminOptions=async()=>{
    const response=await conexion.query('SELECT nombre_modulo, ruta, icono, activo FROM tbMenuOptions WHERE idModulo=1 and activo=1')
    return response;
}

export{sidebarServiceAdminOptions}
import { Request, Response } from "express";
import conexion from "../config/database";
import { encrypt } from "../utils/passwordFunction";

const insertarAdmin=async(req:Request)=>{
        const insert=await conexion.query('INSERT INTO tbProfesor set ?',[req]);
        return insert;
}
const insertarAlumno=async(req:Request)=>{
    const insert=await conexion.query('INSERT INTO tbAlumno set ?',[req]);
    return insert;
}

const insertarProfesor=async(req:Request)=>{
    const insert=await conexion.query('INSERT INTO tbProfesor set ?',[req]);
    return insert;
}





const validarAdminExisteSi=async(usuario:string,CUI:string)=>{
    const data=await conexion.query('SELECT idProfesor FROM tbProfesor WHERE usuario=? and CUI=?',[usuario,CUI]);
    return data;
}
/*Mover eliminar a otro controlador*/
const eliminarAdmin=async(id:string)=>{
    if(id=="1") return "NO SE PUEDE ELIMINAR AL ADMINISTRADOR PRINCIPAL"
    const eliminar=await conexion.query('DELETE FROM tbProfesor WHERE idProfesor=?',[id])
    return eliminar;
}

export {insertarAdmin,eliminarAdmin,validarAdminExisteSi,insertarAlumno, insertarProfesor};
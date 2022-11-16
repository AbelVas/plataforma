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
const validarAdminExisteSi=async(usuario:string,CUI:string,telefono:string)=>{
    const data=await conexion.query('SELECT idProfesor FROM tbProfesor WHERE usuario=? and CUI=? and telefono=?',[usuario,CUI,telefono]);
    return data;
}
export{obtenerProfesoresService,obtenerProfesorService,updateProfesorService,deleteProfesorService,insertProfesorService,validarAdminExisteSi}
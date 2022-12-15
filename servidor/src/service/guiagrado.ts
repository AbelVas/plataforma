import { Request, Response } from "express";
import conexion from "../config/database";

// insertar, editar y eliminar tbGuiaGrado
const updateGraGuiaService=async(data:Request,id:string)=>{
    const responseUpdate=await conexion.query('UPDATE tbGuiaGrado SET ? WHERE idGuias=?',[data,id]);
    return responseUpdate;

}
const deleteGraGuiaService=async(id:string)=>{
    const responseDelete=await conexion.query('DELETE FROM tbGuiaGrado WHERE idGuias=?',[id]);
    return responseDelete;
}
const insertGraGuiaService=async(data:Request)=>{
    const responseInsert=await conexion.query('INSERT INTO tbGuiaGrado set ?',[data]);
    return responseInsert;
}
//Por mientras tengo el get
const getGraGuiaService=async()=>{
    const responseGet=await conexion.query('SELECT * FROM tbGuiaGrado');
    return responseGet;
}
const getGuiaPorGuia=async(id:string)=>{
    const responseGet=await conexion.query('SELECT gg.idProfesor,g.nombre_grado FROM tbGuiaGrado gg INNER JOIN tbGrado g ON gg.idGrado=g.idGrado WHERE gg.idProfesor=?',[id])
    return responseGet;

}

export{updateGraGuiaService,deleteGraGuiaService,insertGraGuiaService,getGraGuiaService,getGuiaPorGuia}
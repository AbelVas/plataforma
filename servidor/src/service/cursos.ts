import { Request, response, Response } from "express";
import conexion from "../config/database";

const obtenerCursosService= async() =>{
    const responseGet=await conexion.query('SELECT `idCurso`, `nombre_curso`, `abreviatura`, `creado`, `consolidado_bimestre`, `consolidado_anual`, `boletas` FROM tbCurso');
    return responseGet;
}

const obtenerCursoService= async(id:string)=>{
    const responseGet= await conexion.query('SELECT `idCurso`, `nombre_curso`, `abreviatura`, `creado`, `consolidado_bimestre`, `consolidado_anual`, `boletas` FROM tbCurso WHERE idCurso=?',[id]);
    return responseGet;
}

const updateCursosService = async(data:Request, id:string)=>{
    const responseUpdate= await conexion.query('UPDATE tbCurso SET ? WHERE idCurso=?',[data,id]);
    return responseUpdate;
}

const deleteCursosService = async(id:string)=>{
    const responseDelete=await conexion.query('DELETE FROM tbCurso WHERE idCurso=?',[id]);
    return responseDelete;
}

const insertCursosService=async(data:Request)=>{
    const responseInsert=await conexion.query('INSERT INTO tbCurso set ?',[data]);
    return responseInsert;
}

const obtenerCursosPorGradoService = async(idGrado:string)=>{
    const responseGet=await conexion.query('SELECT `idCurso`, `nombre_curso`, `abreviatura`, `creado`, `consolidado_bimestre`, `consolidado_anual`, `boletas` FROM tbCurso WHERE idGrado=?',idGrado);
    return responseGet;
}

const obtenerCursosPorProfesorService = async (idProfesor:string)=>{
    const responseGet=await conexion.query('SELECT `idCurso`, `nombre_curso`, `abreviatura`, `creado`, `consolidado_bimestre`, `consolidado_anual`, `boletas` FROM tbCurso WHERE idProfesor=?',idProfesor);
    return responseGet;
}

export {obtenerCursosService, obtenerCursoService, updateCursosService, deleteCursosService, insertCursosService,obtenerCursosPorGradoService,obtenerCursosPorProfesorService}
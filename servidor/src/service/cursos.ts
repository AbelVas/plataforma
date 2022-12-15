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
const obtenerCursosPorGradoProfesorService = async(idGrado:string)=>{
    const responseGet=await conexion.query('SELECT c.idCurso,c.nombre_curso,CONCAT(p.nombre_profesor," ",p.apellido_profesor) as profesor,p.idProfesor,c.consolidado_bimestre,c.consolidado_anual,c.boletas FROM (tbCurso c INNER JOIN tbGrado g ON c.idGrado=g.idGrado)INNER JOIN tbProfesor p ON p.idProfesor=c.idProfesor where g.idGrado=?',[idGrado]);
    return responseGet;
}

export {obtenerCursosService, obtenerCursoService, updateCursosService, deleteCursosService, insertCursosService,obtenerCursosPorGradoService,obtenerCursosPorProfesorService,obtenerCursosPorGradoProfesorService}
import { Request, response, Response } from "express";
import conexion from "../config/database";

const obtenerCursosService= async() =>{
    const responseGet=await conexion.query('SELECT `idCurso`, `nombre_curso`, `abreviatura`, `creado`, `consolidado_bimestre`, `consolidado_anual`, `boletas`  FROM tbCurso');
    return responseGet;
}

const obtenerCursoService= async(id:string)=>{
    const responseGet= await conexion.query('SELECT c.idCurso, g.nombre_grado, c.nombre_curso, c.abreviatura, c.creado, c.consolidado_bimestre, c.consolidado_anual, c.boletas, c.idGrado, s.seccion, p.nombre_profesor, p.apellido_profesor, p.idProfesor FROM tbCurso c INNER JOIN tbGrado g ON c.idGrado=g.idGrado INNER JOIN tbSeccion s ON g.idSeccion=s.idSeccion INNER JOIN tbProfesor p ON c.idProfesor=p.idProfesor WHERE idCurso=?',[id]);
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
    const responseGet=await conexion.query('SELECT c.idCurso, g.nombre_grado, n.nivel, n.idJornada, s.seccion, j.jornada, c.nombre_curso, c.idProfesor, c.abreviatura, c.creado, c.consolidado_bimestre, c.consolidado_anual, c.boletas, c.idGrado FROM tbCurso c INNER JOIN tbGrado g ON c.idGrado=g.idGrado INNER JOIN tbNivel n ON g.idNivel=n.idNivel INNER JOIN tbSeccion s ON g.idSeccion=s.idSeccion INNER JOIN tbJornada j ON n.idJornada=j.idJornada WHERE idProfesor=?',idProfesor);
    return responseGet;
}
const obtenerCursosPorGradoProfesorService = async(idGrado:string)=>{
    const responseGet=await conexion.query('SELECT c.idCurso,c.nombre_curso,CONCAT(p.nombre_profesor," ",p.apellido_profesor) as profesor,p.idProfesor,c.consolidado_bimestre,c.consolidado_anual,c.boletas FROM (tbCurso c INNER JOIN tbGrado g ON c.idGrado=g.idGrado)INNER JOIN tbProfesor p ON p.idProfesor=c.idProfesor where g.idGrado=?',[idGrado]);
    return responseGet;
}
const obtenerCursosPorProfesorGradoSeccionService=async(idProfesor:string,idCurso:any)=>{
    const response=await conexion.query('SELECT c.idCurso,c.nombre_curso,c.abreviatura,c.creado,c.consolidado_bimestre,c.consolidado_anual,c.boletas,CONCAT(g.nombre_grado,", Sección: ",s.seccion) AS grado FROM (tbCurso c INNER JOIN tbGrado g ON g.idGrado=c.idGrado)INNER JOIN tbSeccion s ON s.idSeccion=g.idSeccion WHERE idProfesor=? and c.idCurso!=?',[idProfesor,idCurso.idCurso]);
    return response
}

const obtenerCursosPorAlumnoService=async(idAlumno:string)=>{
    const response=await conexion.query('SELECT c.idCurso,g.idGrado,p.idProfesor,c.nombre_curso,al.idAlumno,CONCAT(g.nombre_grado,", ",s.seccion) AS grado, CONCAT(p.nombre_profesor," ",p.apellido_profesor) as profesor FROM (((tbGrado g INNER JOIN tbCurso c ON c.idGrado=g.idGrado)INNER JOIN tbAlumno al ON al.idGrado=g.idGrado)INNER JOIN tbSeccion s ON s.idSeccion=g.idSeccion)INNER JOIN tbProfesor p ON p.idProfesor=c.idProfesor WHERE al.idAlumno=?',[idAlumno]);
    return response
}

const obtenerProfePorCurso=async(idCurso:string)=>{
    const response=await conexion.query('SELECT CONCAT(tp.nombre_profesor," ",tp.apellido_profesor) as NombreProfesor FROM tbCurso tc INNER JOIN tbProfesor tp ON tc.idProfesor=tp.idProfesor where tc.idCurso=? ',[idCurso]);
    return response
}

export {obtenerCursosService, obtenerCursoService, updateCursosService, deleteCursosService, insertCursosService,obtenerCursosPorGradoService,obtenerCursosPorProfesorService,obtenerCursosPorGradoProfesorService,obtenerCursosPorProfesorGradoSeccionService,obtenerCursosPorAlumnoService,obtenerProfePorCurso}
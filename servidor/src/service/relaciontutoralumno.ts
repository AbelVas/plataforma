import { Request, Response } from "express";
import conexion from "../config/database";
import { encrypt,verified } from "../utils/passwordFunction";

const getTutorAlumnoService=async(idTutor:string)=>{
    const responseGetTutorAlumno= await conexion.query('SELECT r.idAlumno, r.idTutor, a.nombres_alumno, a.apellidos_alumno, a.sexo, a.usuario, g.idGrado, g.nombre_grado, s.idSeccion, s.seccion, c.codigo FROM tbReacionAlumnoTutor r INNER JOIN tbAlumno a ON r.idAlumno=a.idAlumno INNER JOIN tbGrado g ON a.idGrado=g.idGrado INNER JOIN tbSeccion s ON g.idSeccion=s.idSeccion INNER JOIN tbCodigo c ON a.idCodigo=c.idCodigo WHERE r.idTutor=?',[idTutor])
    return responseGetTutorAlumno;
}

export {getTutorAlumnoService}
import { Request, Response } from "express";
import conexion from "../config/database";
import { encrypt,verified } from "../utils/passwordFunction";

//CRUD
const insertAlumnosService=async(data:Request)=>{
    const responseInsert=await conexion.query('INSERT INTO tbAlumno set ?',[data]);
    return responseInsert;
}
const obtenerAlumnosService=async()=>{
    const responseGet=await conexion.query('SELECT * FROM tbAlumno WHERE idRol=4');
    return responseGet;
}
const obtenerAlumnosGradoService=async(id:string)=>{
    const responseGet=await conexion.query('SELECT idCodigo,CONCAT(apellidos_alumno,", ",nombres_alumno) AS alumno,usuario,activo FROM tbAlumno WHERE idRol=4 and idGrado=?',[id]);
    return responseGet;
}
const obtenerAlumnoService=async(id:string)=>{
    const responseGet=await conexion.query('SELECT a.idAlumno, a.nombres_alumno, a.apellidos_alumno, a.sexo, a.usuario, g.idGrado, g.nombre_grado, s.idSeccion, s.seccion FROM tbAlumno a INNER JOIN tbGrado g ON a.idGrado=g.idGrado INNER JOIN tbSeccion s ON g.idSeccion=s.idSeccion WHERE idAlumno=?',[id]);
    return responseGet;
}
const updateAlumnosService=async(data:Request,id:string)=>{
    const responseUpdate=await conexion.query('UPDATE tbAlumno SET ? WHERE idRol=4 and idAlumno=?',[data,id]);
    return responseUpdate;
}
const deleteAlumnoService=async(id:string)=>{
    const responseDelete=await conexion.query('DELETE FROM tbAlumno WHERE idRol=4 and idAlumno=?',[id]);
    return responseDelete;
}

const validarAlumnosExisteSi=async(usuario:string)=>{
    const data=await conexion.query('SELECT idAlumno FROM tbAlumno WHERE usuario=?',[usuario]);
    return data;
}

const verifyPassword=async(id:string,pass:string)=>{
    const compararPass=await conexion.query('SELECT idAlumno,pass FROM tbAlumno WHERE idAlumno=?',[id]);
    if(compararPass=='') return "Error, Contraseña Incorrecta";
    const dataUsuario:any=Object.values(compararPass[0]);
    const passwordHash=dataUsuario[1];
    const isCorrect=await verified(pass,passwordHash);
    if(!isCorrect) return "Error, las contraseñas no coinciden ";
    return '1';
}

export{insertAlumnosService,obtenerAlumnosService,obtenerAlumnosGradoService,obtenerAlumnoService,updateAlumnosService,deleteAlumnoService,validarAlumnosExisteSi,verifyPassword}
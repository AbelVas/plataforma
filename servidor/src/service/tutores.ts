import { Request, Response } from "express";
import conexion from "../config/database";
import { encrypt,verified } from "../utils/passwordFunction";

//CRUD
const insertTutoresService=async(data:Request)=>{
    const responseInsert=await conexion.query('INSERT INTO tbTutor set ?',[data]);
    return responseInsert;
}
const obtenerTutoresService=async()=>{
    const responseGet=await conexion.query('SELECT `idTutor`, `nombre_tutor`, `apellido_tutor`, `telefono1`, `telefono2`, `direccion`, `usuario`, `fecha_nacimiento`, `estado` FROM tbTutor');
    return responseGet;
}
const obtenerTutorService=async(id:string)=>{
    const responseGet=await conexion.query('SELECT `idTutor`, `nombre_tutor`, `apellido_tutor`, `telefono1`, `telefono2`, `telefono_casa`, `direccion`, `usuario`, `fecha_nacimiento`, `estado`, `correo1`, `correo2` FROM tbTutor WHERE idTutor=?',[id]);
    return responseGet;
}
const updateTutorService=async(data:Request,id:string)=>{
    const responseUpdate=await conexion.query('UPDATE tbTutor SET ? WHERE idTutor=?',[data,id]);
    return responseUpdate;
}
const deleteTutoresService=async(id:string)=>{
    const responseDelete=await conexion.query('DELETE FROM tbTutor WHERE idTutor=?',[id]);
    return responseDelete;
}

const validarTutoresExisteSi=async(usuario:string,telefono1:string)=>{
    const data=await conexion.query('SELECT idTutor FROM tbTutor WHERE usuario=? and telefono1=?',[usuario,telefono1]);
    return data;
}

const verifyPassword=async(id:string,pass:string)=>{
    const compararPass=await conexion.query('SELECT idTutor,pass FROM tbTutor WHERE idTutor=?',[id]);
    if(compararPass=='') return "Error, Contraseña Incorrecta";
    const dataUsuario:any=Object.values(compararPass[0]);
    const passwordHash=dataUsuario[1];
    const isCorrect=await verified(pass,passwordHash);
    if(!isCorrect) return "Error, las contraseñas no coinciden ";
    return '1';
}

const getTutorconAlumnoService=async(idAlum:string)=>{
    const responseGetTutorconAlumno= await conexion.query('SELECT `idTutor`, `nombre_tutor`, `apellido_tutor`, `telefono1`, `telefono2`, `direccion`, `usuario`, `fecha_nacimiento`, `estado` FROM tbTutor WHERE idAlumno=? ',[idAlum])
    return responseGetTutorconAlumno;
}

const getAlumnoporTutorService=async(idTutor:string)=>{
    const responseGetAlumnoporTutor= await conexion.query('SELECT a.idAlumno, a.nombres_alumno, a.apellidos_alumno, a.sexo, a.usuario, g.idGrado, g.nombre_grado, s.idSeccion, s.seccion, c.codigo FROM tbAlumno a INNER JOIN tbGrado g ON a.idGrado=g.idGrado INNER JOIN tbSeccion s ON g.idSeccion=s.idSeccion INNER JOIN tbCodigo c ON a.idCodigo=c.idCodigo WHERE idTutor=?',[idTutor])
    return responseGetAlumnoporTutor
}

export{insertTutoresService,obtenerTutoresService,obtenerTutorService,updateTutorService,deleteTutoresService,validarTutoresExisteSi,getTutorconAlumnoService,verifyPassword,getAlumnoporTutorService}
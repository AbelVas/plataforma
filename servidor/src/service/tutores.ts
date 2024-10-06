import { Request, Response } from "express";
import conexion from "../config/database";
import { encrypt,verified } from "../utils/passwordFunction";

//CRUD
const deleteTutorAlumnoService=async(idTutor:string,idAlumno:string)=>{
    const eliminarData=await conexion.query('DELETE FROM tbReacionAlumnoTutor WHERE idTutor=? and idAlumno=?',[idTutor,idAlumno])
    return eliminarData
}
const insertTutorAlumnoService=async(data:Request)=>{
    const insertData=await conexion.query('INSERT INTO tbReacionAlumnoTutor set ?',[data])
    return insertData
}
const tutoresAlumnoService=async(idTutor:string)=>{
    const responseGet=await conexion.query('SELECT al.idAlumno,CONCAT(al.apellidos_alumno," ",al.nombres_alumno) as alumno,CONCAT(g.nombre_grado,", Sección: ",s.seccion) as grado,tu.idTutor,co.codigo FROM tbReacionAlumnoTutor reta INNER JOIN tbAlumno al ON al.idAlumno=reta.idAlumno INNER JOIN tbTutor tu ON tu.idTutor=reta.idTutor INNER JOIN tbGrado g ON g.idGrado=al.idGrado INNER JOIN tbSeccion s ON s.idSeccion=g.idSeccion INNER JOIN tbCodigo co ON co.idCodigo=al.idCodigo WHERE tu.idTutor=?',[idTutor])
    return responseGet
}
//asignación de tutores
const insertTutoresService=async(data:Request)=>{
    const responseInsert=await conexion.query('INSERT INTO tbTutor set ?',[data]);
    return responseInsert;
}
const obtenerTutoresService=async()=>{
    const responseGet=await conexion.query('SELECT  idTutor,nombre_tutor,apellido_tutor,telefono1,telefono2,telefono_casa,direccion,direccion_trabajo,usuario,pass,correo1,correo2,nombre_opcional,dpi,estado,ver_notas FROM tbTutor');
    return responseGet;
}
const obtenerTutorService=async(id:string)=>{
    const responseGet=await conexion.query('SELECT  idTutor,nombre_tutor,apellido_tutor,telefono1,telefono2,telefono_casa,direccion,direccion_trabajo,usuario,pass,correo1,correo2,nombre_opcional,dpi,estado FROM tbTutor WHERE idTutor=?',[id]);
    return responseGet;
}

const obtenerTutorNotasService=async(id:string)=>{
    const responseGet=await conexion.query('SELECT ver_notas FROM tbTutor WHERE idTutor=?',[id]);
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
    const responseGetTutorconAlumno= await conexion.query('SELECT `idTutor`, `nombre_tutor`, `apellido_tutor`, `telefono1`, `telefono2`, `direccion`, `usuario`,  `estado` FROM tbTutor WHERE idAlumno=? ',[idAlum])
    return responseGetTutorconAlumno;
}

const getAlumnoporTutorService=async(idTutor:string)=>{
    const responseGetAlumnoporTutor= await conexion.query('SELECT a.idAlumno, a.nombres_alumno, a.apellidos_alumno, a.sexo, a.usuario, g.idGrado, g.nombre_grado, s.idSeccion, s.seccion, c.codigo FROM tbAlumno a INNER JOIN tbGrado g ON a.idGrado=g.idGrado INNER JOIN tbSeccion s ON g.idSeccion=s.idSeccion INNER JOIN tbCodigo c ON a.idCodigo=c.idCodigo WHERE idTutor=?',[idTutor])
    return responseGetAlumnoporTutor
}

export{deleteTutorAlumnoService,insertTutorAlumnoService,tutoresAlumnoService,insertTutoresService,obtenerTutoresService,obtenerTutorService,updateTutorService,deleteTutoresService,validarTutoresExisteSi,getTutorconAlumnoService,verifyPassword,getAlumnoporTutorService,obtenerTutorNotasService}
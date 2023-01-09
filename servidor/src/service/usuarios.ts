import { Request, Response } from "express";
import conexion from "../config/database";
import { encrypt,verified } from "../utils/passwordFunction";

//CRUD
const insertAlumnosService=async(data:any)=>{
    const existe=await conexion.query('SELECT idAlumno FROM tbAlumno WHERE usuario=?',[data.usuario])
    if(existe==''){
        const responseInsert=await conexion.query('INSERT INTO tbAlumno set ?',[data]);
        const usarCodigo=await conexion.query('UPDATE tbCodigo SET activo="0" WHERE idCodigo=?',[data.idCodigo]);
        return responseInsert;
    }else{
        return false
    }
}
const obtenerAlumnosService=async()=>{
    const responseGet=await conexion.query('SELECT al.idAlumno,al.nombres_alumno,al.apellidos_alumno,al.sexo,al.usuario,al.activo,g.nombre_grado,s.seccion FROM (tbAlumno al INNER JOIN tbGrado g on g.idGrado=al.idGrado)INNER JOIN tbSeccion s on s.idSeccion=g.idSeccion WHERE idRol=4');
    return responseGet;
}
const obtenerAlumnosGradoService=async(id:string)=>{
    const responseGet=await conexion.query('SELECT idCodigo,CONCAT(apellidos_alumno,", ",nombres_alumno) AS alumno,usuario,activo FROM tbAlumno WHERE idRol=4 and idGrado=?',[id]);
    return responseGet;
}
const obtenerAlumnoService=async(id:string)=>{
    const responseGet=await conexion.query('SELECT * FROM tbAlumno WHERE idRol=4 and idAlumno=?',[id]);
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
import {Request,Response} from "express"
import conexion from "../config/database";

const obtenerAdminService=async(id:string)=>{
    const respuesta=await conexion.query("SELECT * FROM tbProfesor WHERE idProfesor=? and idRol=1",[id]);
    return respuesta;
}

const obtenerAdminsService=async()=>{
    const respuesta=await conexion.query("SELECT * FROM tbProfesor WHERE idRol=1");
    return respuesta;
}

const obtenerProfesorService=async(id:string)=>{
    const respuesta=await conexion.query("SELECT * FROM tbProfesor WHERE idProfesor=? and idRol=2",[id]);
    return respuesta;
}

const obtenerProfesoresService=async()=>{
    const respuesta=await conexion.query("SELECT * FROM tbProfesor WHERE idRol=2");
    return respuesta;
}

const obtenerAlumnoService=async(id:string)=>{
    const respuesta=await conexion.query("SELECT * FROM tbAlumno WHERE idAlumno=?",[id]);
    return respuesta;
}

const obtenerAlumnosService=async()=>{
    const respuesta=await conexion.query("SELECT * FROM tbAlumno");
    return respuesta;
}

export {obtenerAlumnosService,obtenerAlumnoService,obtenerProfesoresService,obtenerProfesorService,obtenerAdminsService,obtenerAdminService}

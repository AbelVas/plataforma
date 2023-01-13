import { Request, response, Response } from "express";
import conexion from "../config/database";

const actualizaraPerfilAdminService= async(idAdmin:string,data:any) =>{
console.log(data)
return idAdmin;    
}
const actualizaraPerfilTutorService=async(idTutor:string,data:any)=>{
console.log(data)
}
const actualizaraPerfilAlumnoService=async(idAlumno:string,data:any)=>{
console.log(data)
}
const actualizaraPerfilProfesorService=async(idProfesor:string,data:any)=>{
console.log(data)
}

export {actualizaraPerfilTutorService,actualizaraPerfilAlumnoService,actualizaraPerfilProfesorService,actualizaraPerfilAdminService}

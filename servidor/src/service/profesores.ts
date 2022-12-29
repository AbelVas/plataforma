import { Request, Response } from "express";
import conexion from "../config/database";
import { encrypt,verified } from "../utils/passwordFunction";

const obtenerProfesoresService=async()=>{
    const responseGet=await conexion.query('SELECT `idProfesor`, `idCodigo`, `nombre_profesor`, `apellido_profesor`, `telefono`, `CUI`, `usuario`, `fecha_nacimiento`, `estatus`, `creado`, `permitir_ver_correo`, `idRol` FROM `tbProfesor` WHERE idRol=2 order by apellido_profesor asc');
    return responseGet;
}
const obtenerProfesorService=async(id:string)=>{
    const responseGet=await conexion.query('SELECT p.idProfesor,c.codigo,p.nombre_profesor,p.apellido_profesor,p.telefono,p.CUI,p.usuario,p.fecha_nacimiento,p.estatus,p.creado,p.permitir_ver_correo,p.idRol FROM tbProfesor p INNER JOIN tbCodigo c ON p.idCodigo=c.idCodigo WHERE p.idRol=2 and p.idProfesor=?',[id]);
    return responseGet;
}
const updateProfesorService=async(data:Request,id:string)=>{
    const responseUpdate=await conexion.query('UPDATE tbProfesor SET ? WHERE idRol=2 and idProfesor=?',[data,id]);
    return responseUpdate;
}
const deleteProfesorService=async(id:string)=>{
    const existe=await conexion.query('SELECT idProfesor,idCodigo FROM tbProfesor WHERE idProfesor=? and idRol=2',[id])
    const dataUsuario:any=Object.values(existe[0]);
    const activarCodigo=await conexion.query('UPDATE tbCodigo SET activo=1 WHERE idCodigo=?',[dataUsuario[1]])
    const responseDelete=await conexion.query('DELETE FROM tbProfesor WHERE idRol=2 and idProfesor=?',[id]);
    return responseDelete;
}
const insertProfesorService=async(data:any)=>{
    const existe=await conexion.query('SELECT idProfesor FROM tbProfesor WHERE CUI=? OR usuario=?',[data.CUI,data.usuario])
    if(existe==''){
        const responseInsert=await conexion.query('INSERT INTO tbProfesor set ?',[data]);
        const usarCodigo=await conexion.query('UPDATE tbCodigo SET activo="0" WHERE idCodigo=?',[data.idCodigo]);
        return responseInsert;
    }else{
        return false
    }
}
const validarAdminExisteSi=async(usuario:string,CUI:string,telefono:string)=>{
    const data=await conexion.query('SELECT idProfesor FROM tbProfesor WHERE usuario=? and CUI=? and telefono=?',[usuario,CUI,telefono]);
    return data;
}
const verifyPassword=async(id:string,pass:string)=>{
    const compararPass=await conexion.query('SELECT idProfesor,pass FROM tbProfesor WHERE idProfesor=?',[id]);
    if(compararPass=='') return "Error, Contraseña Incorrecta";
    const dataUsuario:any=Object.values(compararPass[0]);
    const passwordHash=dataUsuario[1];
    const isCorrect=await verified(pass,passwordHash);
    if(!isCorrect) return "Error, las contraseñas no coinciden ";
    return '1';
}
export{obtenerProfesoresService,obtenerProfesorService,updateProfesorService,deleteProfesorService,insertProfesorService,validarAdminExisteSi,verifyPassword}
import { Request, Response } from "express";
import conexion from "../config/database";
import { encrypt,verified } from "../utils/passwordFunction";

const insertarAdminService=async(req:Request)=>{
        const insert=await conexion.query('INSERT INTO tbProfesor set ?',[req]);
        return insert;
}
const getAdminService=async(id:string)=>{
    const data=await conexion.query("SELECT p.idProfesor,c.codigo,p.nombre_profesor,p.apellido_profesor,p.telefono,p.CUI,p.usuario,p.fecha_nacimiento,p.estatus,p.creado,p.permitir_ver_correo,p.idRol FROM tbProfesor p INNER JOIN tbCodigo c ON p.idCodigo=c.idCodigo WHERE p.idProfesor=? and p.idRol=1",[id])
    return data;
}
const getAdminsService=async()=>{
    const data=await conexion.query("SELECT idProfesor, idCodigo, nombre_profesor, apellido_profesor, telefono, CUI, usuario, fecha_nacimiento, estatus, creado, permitir_ver_correo, idRol FROM `tbProfesor` WHERE idProfesor!=1 and idRol=1")
    return data;
}
const updateAdminService=async(admin:Request,id:string)=>{
    const data=await conexion.query("UPDATE tbProfesor SET ? WHERE idProfesor=?",[admin,id]);
    return data;
}
const validarAdminExisteSi=async(usuario:string,CUI:string)=>{
    const data=await conexion.query('SELECT idProfesor FROM tbProfesor WHERE usuario=? and CUI=?',[usuario,CUI]);
    return data;
}
const eliminarAdminService=async(id:string)=>{
    if(id=="1") return "NO SE PUEDE ELIMINAR AL ADMINISTRADOR PRINCIPAL"
    const eliminar=await conexion.query('DELETE FROM tbProfesor WHERE idProfesor=?',[id])
    return eliminar;
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

const fotoPerfilAdminService=async(id:string,ruta:string,peso:string)=>{
    const consultaprev=await conexion.query("UPDATE tbImagenPerfilProfesor SET activa=0 WHERE idProfesor=?",[id]);
    const consulta=await conexion.query('INSERT INTO tbImagenPerfilProfesor SET idProfesor=?, ruta_imagen=?, peso_imagen=?, activa=1',[id,ruta,peso])
    return consulta
}

const getFotoPerfilAdminService=async(id:string)=>{
    const getFoto=await conexion.query("SELECT CASE WHEN img.activa = 1 THEN img.ruta_imagen WHEN img.activa IS NULL THEN NULL ELSE 'null' END AS ruta_imagen, CONCAT(p.nombre_profesor, ' ', p.apellido_profesor) AS profesor FROM tbImagenPerfilProfesor img RIGHT JOIN tbProfesor p ON p.idProfesor = img.idProfesor WHERE p.idProfesor = ? AND (img.activa = 1 OR img.activa IS NULL);",[id])
    return getFoto
}

export {getFotoPerfilAdminService,fotoPerfilAdminService,insertarAdminService,getAdminService,getAdminsService,updateAdminService,validarAdminExisteSi,eliminarAdminService,verifyPassword};
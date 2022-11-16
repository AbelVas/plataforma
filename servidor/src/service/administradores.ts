import { Request, Response } from "express";
import conexion from "../config/database";
import { encrypt } from "../utils/passwordFunction";

const insertarAdminService=async(req:Request)=>{
        const insert=await conexion.query('INSERT INTO tbProfesor set ?',[req]);
        return insert;
}
const getAdminService=async(id:string)=>{
    const data=await conexion.query("SELECT `idProfesor`, `idCodigo`, `nombre_profesor`, `apellido_profesor`, `telefono`, `CUI`, `usuario`, `fecha_nacimiento`, `estatus`, `creado`, `permitir_ver_correo`, `idRol` FROM `tbProfesor` WHERE idProfesor=? and idRol=1",[id])
    return data;
}
const getAdminsService=async()=>{
    const data=await conexion.query("SELECT `idProfesor`, `idCodigo`, `nombre_profesor`, `apellido_profesor`, `telefono`, `CUI`, `usuario`, `fecha_nacimiento`, `estatus`, `creado`, `permitir_ver_correo`, `idRol` FROM `tbProfesor` WHERE idProfesor!=1 and idRol=1")
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

export {insertarAdminService,getAdminService,getAdminsService,updateAdminService,validarAdminExisteSi,eliminarAdminService};
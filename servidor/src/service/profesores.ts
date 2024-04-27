import { Request, Response } from "express";
import conexion from "../config/database";
import { encrypt,verified } from "../utils/passwordFunction";

const obtenerProfesoresService=async()=>{
    const responseGet=await conexion.query('SELECT `idProfesor`, `idCodigo`, `nombre_profesor`, `apellido_profesor`, `telefono`, `CUI`, `usuario`, `fecha_nacimiento`, `estatus`, `creado`, `permitir_ver_correo`, `idRol` FROM `tbProfesor` WHERE idRol=2 order by apellido_profesor asc');
    return responseGet;
}
const obtenerProfesorService=async(id:string)=>{
    const responseGet=await conexion.query('SELECT p.idProfesor,c.codigo,p.nombre_profesor,p.apellido_profesor,p.telefono,p.CUI,p.usuario,p.fecha_nacimiento,p.estatus,p.creado,p.permitir_ver_correo,p.idRol,p.correo1,p.correo2 FROM tbProfesor p INNER JOIN tbCodigo c ON p.idCodigo=c.idCodigo WHERE p.idRol=2 and p.idProfesor=?',[id]);
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

const getGradoGuiaProfesorService=async(id:string)=>{
    const data=await conexion.query('SELECT gg.idGuias, gg.idGrado, g.nombre_grado, n.nivel, j.jornada, s.seccion FROM tbGuiaGrado gg INNER JOIN tbGrado g ON gg.idGrado=g.idGrado INNER JOIN tbNivel n ON g.idNivel=n.idNivel INNER JOIN tbJornada j ON n.idJornada=j.idJornada INNER JOIN tbSeccion s ON g.idSeccion=s.idSeccion WHERE idProfesor=?',[id]);
    return data;
}
const getFotoPerfilProfesorService=async(id:string)=>{
    const getFoto=await conexion.query("SELECT CASE WHEN img.activa = 1 THEN img.ruta_imagen WHEN img.activa IS NULL THEN NULL ELSE 'null' END AS ruta_imagen, CONCAT(p.nombre_profesor, ' ', p.apellido_profesor) AS profesor FROM tbImagenPerfilProfesor img RIGHT JOIN tbProfesor p ON p.idProfesor = img.idProfesor WHERE p.idProfesor = ? AND (img.activa = 1 OR img.activa IS NULL);",[id])
    return getFoto
}

const fotoPerfilProfesorService=async(id:string,ruta:string,peso:string,subida:string)=>{
    const consultaprev=await conexion.query("UPDATE tbImagenPerfilProfesor SET activa=0 WHERE idProfesor=?",[id]);
    const consulta=await conexion.query('INSERT INTO tbImagenPerfilProfesor SET idProfesor=?, ruta_imagen=?, peso_archivo=?, activa=1, subida=?',[id,ruta,peso,subida])
    return consulta
}

const fotoCursoProfesorService=async(id:string,ruta:string,peso:string,subida:string)=>{
    const consultaprev=await conexion.query("UPDATE tbImagenCurso SET activa=0 WHERE idCurso=?",[id]);
    const consulta=await conexion.query('INSERT INTO tbImagenCurso SET idCurso=?, ruta_imagen=?, peso_archivo=?, activa=1, subida=?',[id,ruta,peso,subida])
    return consulta
}

const getFotoCursoProfesorService=async(id:string)=>{
    const getFoto=await conexion.query("SELECT CASE WHEN img.activa = 1 THEN img.ruta_imagen WHEN img.activa IS NULL THEN NULL ELSE 'null' END AS ruta_imagen FROM tbImagenCurso img RIGHT JOIN tbCurso p ON p.idCurso = img.idCurso WHERE p.idCurso = ? AND (img.activa = 1 OR img.activa IS NULL);",[id])
    return getFoto
}

export{fotoPerfilProfesorService,getFotoPerfilProfesorService,obtenerProfesoresService,obtenerProfesorService,updateProfesorService,deleteProfesorService,insertProfesorService,validarAdminExisteSi,verifyPassword,getGradoGuiaProfesorService,fotoCursoProfesorService,getFotoCursoProfesorService}
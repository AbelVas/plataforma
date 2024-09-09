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
//este me sirve para validar la comunicación entre papás e hijos
const obtenerAlumnosPorCodigoService=async(idCodigo:string,idTutor:string)=>{
    const responseGet=await conexion.query('SELECT al.idAlumno, al.nombres_alumno, al.apellidos_alumno, al.sexo, al.usuario, g.nombre_grado, s.seccion, co.codigo, COUNT(reta.idAlumno) AS veces_vinculado, CASE WHEN rat.idAlumno IS NOT NULL THEN 1 ELSE 0 END AS ya_vinculado FROM tbAlumno al INNER JOIN tbGrado g ON g.idGrado = al.idGrado INNER JOIN tbSeccion s ON s.idSeccion = g.idSeccion INNER JOIN tbCodigo co ON co.idCodigo = al.idCodigo LEFT JOIN tbReacionAlumnoTutor reta ON reta.idAlumno = al.idAlumno LEFT JOIN tbReacionAlumnoTutor rat ON rat.idAlumno = al.idAlumno AND rat.idTutor = ? WHERE al.idRol = 4 AND co.codigo = ? GROUP BY al.idAlumno, al.nombres_alumno, al.apellidos_alumno, al.sexo, al.usuario, g.nombre_grado, s.seccion, co.codigo;',[idTutor,idCodigo]);
    return responseGet;
}
const obtenerAlumnosService=async()=>{
    const responseGet=await conexion.query('SELECT al.idAlumno,al.nombres_alumno,al.apellidos_alumno,al.sexo,al.usuario,al.activo,g.nombre_grado,s.seccion FROM (tbAlumno al INNER JOIN tbGrado g on g.idGrado=al.idGrado)INNER JOIN tbSeccion s on s.idSeccion=g.idSeccion WHERE idRol=4');
    return responseGet;
}
const obtenerAlumnosGradoService=async(id:string)=>{
    const responseGet=await conexion.query('SELECT idAlumno,idCodigo,sexo,apellidos_alumno,nombres_alumno,CONCAT(apellidos_alumno,", ",nombres_alumno) AS alumno,usuario,activo FROM tbAlumno WHERE idRol=4 and idGrado=?',[id]);
    return responseGet;
}
const obtenerAlumnoService=async(id:string)=>{
    const responseGet=await conexion.query('SELECT a.idAlumno, a.nombres_alumno, a.apellidos_alumno, a.ver_notas, a.activo, a.sexo, a.usuario, g.idGrado, g.nombre_grado, a.idCodigo, g.nombre_grado, s.idSeccion, s.seccion, c.codigo FROM tbAlumno a INNER JOIN tbGrado g ON a.idGrado=g.idGrado INNER JOIN tbSeccion s ON g.idSeccion=s.idSeccion INNER JOIN tbCodigo c ON a.idCodigo=c.idCodigo WHERE idAlumno=?',[id]);
    return responseGet;
}
const updateAlumnosService=async(data:Request,id:string)=>{
    const responseUpdate=await conexion.query('UPDATE tbAlumno SET ? WHERE idRol=4 and idAlumno=?',[data,id]);
    return responseUpdate;
}
const deleteAlumnoService=async(id:string)=>{
    const deleteNota= await conexion.query('DELETE FROM tbCalificacion WHERE idAlumno=? ',[id]);
    const abandonoFamiliar= await conexion.query('DELETE FROM tbReacionAlumnoTutor WHERE idAlumno=? ',[id]);
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
const verNotasAlumnosService=async(estado:string)=>{
    const update=await conexion.query('UPDATE tbAlumno SET ver_notas=?',[estado])
    return update
}
const getNotasVerService=async()=>{
    const selectVer=await conexion.query('SELECT count(idAlumno) FROM `tbAlumno` WHERE ver_notas=1')
    const selectNoVer=await conexion.query('SELECT count(idAlumno) FROM `tbAlumno` WHERE ver_notas=0')
    const ver:any=Object.values(selectVer[0]);
    const nover:any=Object.values(selectNoVer[0]);
    var objtVer={
        noVer:nover[0],
        ver:ver[0]
    }
    return objtVer
}

const getEstadoAlumno=async()=>{
    const ActivoEstudiante=await conexion.query('SELECT count(idAlumno) FROM `tbAlumno` WHERE activo=1')
    const NoActivoEstudiante=await conexion.query('SELECT count(idAlumno) FROM `tbAlumno` WHERE activo=0')
    const Activo:any=Object.values(ActivoEstudiante[0]);
    const Inactivo:any=Object.values(NoActivoEstudiante[0]);
    var objtEstudiantesActivo={
        noActivo:Inactivo[0],
        siActivo:Activo[0]
    }
    return objtEstudiantesActivo
}

const getEstadoProfesor=async()=>{
    const ActivoProfesor=await conexion.query('SELECT count(idProfesor) FROM `tbProfesor` WHERE estatus=1')
    const NoActivoProfesor=await conexion.query('SELECT count(idProfesor) FROM `tbProfesor` WHERE estatus=0')
    const Activo:any=Object.values(ActivoProfesor[0]);
    const Inactivo:any=Object.values(NoActivoProfesor[0]);
    var objtProfesorActivo={
        noActivo:Inactivo[0],
        siActivo:Activo[0]
    }
    return objtProfesorActivo
}

const getEstadoTutor=async()=>{
    const ActivoTutor=await conexion.query('SELECT count(idTutor) FROM `tbTutor` WHERE estado=1')
    const NoActivoTutor=await conexion.query('SELECT count(idTutor) FROM `tbTutor` WHERE estado=0')
    const Activo:any=Object.values(ActivoTutor[0]);
    const Inactivo:any=Object.values(NoActivoTutor[0]);
    var objTutorActivo={
        noActivo:Inactivo[0],
        siActivo:Activo[0]
    }
    return objTutorActivo
}

const UpdateStatusAlumnos=async(id:string)=>{

    const update=await conexion.query('Update tbAlumno set activo=? where idRol=4',[id]);
    return update;
}

const UpdateStatusProfesor=async(id:string)=>{

    const update=await conexion.query('Update tbProfesor set estatus=? where idRol=2',[id]);
    return update;
}

const UpdateStatusTutores=async(id:string)=>{

    const update=await conexion.query('Update tbTutor set estado=? where idRol=3',[id]);
    return update;
}

const fotoPerfilAlumnoService=async(id:string,ruta:string,peso:string,subida:string)=>{
    const consultaprev=await conexion.query("UPDATE tbImagenPerfilAlumno SET activa=0 WHERE idAlumno=?",[id]);
    const consulta=await conexion.query('INSERT INTO tbImagenPerfilAlumno SET idAlumno=?, ruta_imagen=?, peso_archivo=?, activa=1, subida=?',[id,ruta,peso,subida])
    return consulta
}

const getFotoPerfilAlumnoService=async(id:string)=>{
    const getFoto=await conexion.query("SELECT CASE WHEN img.activa = 1 THEN img.ruta_imagen WHEN img.activa IS NULL THEN NULL ELSE 'null' END AS ruta_imagen, CONCAT(a.nombres_alumno, ' ', a.apellidos_alumno) AS alumno FROM tbImagenPerfilAlumno img RIGHT JOIN tbAlumno a ON a.idAlumno = img.idAlumno WHERE a.idAlumno = ? AND (img.activa = 1 OR img.activa IS NULL);",[id])
    return getFoto
}

const getTutorporAlumno=async(id:string)=>{
    const getId= await conexion.query("SELECT idTutor FROM tbReacionAlumnoTutor WHERE idAlumno=? LIMIT 1",[id]);
    return getId
}


export{getFotoPerfilAlumnoService,fotoPerfilAlumnoService,getNotasVerService,verNotasAlumnosService,insertAlumnosService,obtenerAlumnosService,obtenerAlumnosGradoService,obtenerAlumnoService,updateAlumnosService,deleteAlumnoService,validarAlumnosExisteSi,verifyPassword,
    UpdateStatusAlumnos,UpdateStatusProfesor,UpdateStatusTutores,getEstadoAlumno,getEstadoProfesor,getEstadoTutor,getTutorporAlumno,obtenerAlumnosPorCodigoService}
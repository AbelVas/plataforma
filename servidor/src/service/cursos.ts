import { Request, response, Response } from "express";
import conexion from "../config/database";

const obtenerCursosService= async() =>{
    const responseGet=await conexion.query('SELECT `idCurso`, `nombre_curso`, `abreviatura`, `creado`, `consolidado_bimestre`, `consolidado_anual`, `boletas`  FROM tbCurso');
    return responseGet;
}

const obtenerCursoService= async(id:string)=>{
    const responseGet= await conexion.query('SELECT c.idCurso, g.nombre_grado, g.idGrado, c.nombre_curso, c.color_curso, c.abreviatura, c.creado, c.consolidado_bimestre, c.consolidado_anual, c.boletas, c.idGrado, s.seccion, p.nombre_profesor, p.apellido_profesor, p.idProfesor, n.idNivel FROM tbCurso c INNER JOIN tbGrado g ON c.idGrado=g.idGrado INNER JOIN tbSeccion s ON g.idSeccion=s.idSeccion INNER JOIN tbProfesor p ON c.idProfesor=p.idProfesor INNER JOIN tbNivel n ON g.idNivel=n.idNivel WHERE idCurso=?',[id]);
    return responseGet;
}

const updateCursosService = async(data:Request, id:string)=>{
    const responseUpdate= await conexion.query('UPDATE tbCurso SET ? WHERE idCurso=?',[data,id]);
    return responseUpdate;
}

const deleteCursosService = async(id:string)=>{
    const responseDelete=await conexion.query('DELETE FROM tbCurso WHERE idCurso=?',[id]);
    return responseDelete;
}

const insertCursosService=async(data:Request)=>{
    const responseInsert=await conexion.query('INSERT INTO tbCurso set ?',[data]);
    return responseInsert;
}

const obtenerCursosPorGradoService = async(idGrado:string)=>{
    const responseGet=await conexion.query('SELECT `idCurso`, `nombre_curso`, `abreviatura`, `creado`, `consolidado_bimestre`, `consolidado_anual`, `boletas`,color_curso FROM tbCurso WHERE idGrado=?',idGrado);
    return responseGet;
}

const obtenerCursosPorProfesorService = async (idProfesor:string)=>{
    const responseGet=await conexion.query('SELECT c.idCurso, g.nombre_grado, n.nivel, n.idJornada, s.seccion, j.jornada, c.nombre_curso, c.idProfesor, c.abreviatura, c.creado, c.consolidado_bimestre, c.consolidado_anual, c.boletas, c.idGrado, c.color_curso,CASE WHEN imgc.activa = 1 THEN imgc.ruta_imagen ELSE NULL END AS ruta_imagen FROM tbCurso c INNER JOIN tbGrado g ON c.idGrado=g.idGrado INNER JOIN tbNivel n ON g.idNivel=n.idNivel INNER JOIN tbSeccion s ON g.idSeccion=s.idSeccion INNER JOIN tbJornada j ON n.idJornada=j.idJornada LEFT JOIN tbImagenCurso imgc ON imgc.idCurso=c.idCurso WHERE c.idProfesor=?',idProfesor);
    return responseGet;
}
const obtenerCursosPorGradoProfesorService = async(idGrado:string)=>{
    const responseGet=await conexion.query('SELECT c.idCurso,c.nombre_curso,CONCAT(p.nombre_profesor," ",p.apellido_profesor) as profesor,p.idProfesor,c.consolidado_bimestre,c.consolidado_anual,c.boletas,c.abreviatura,color_curso FROM (tbCurso c INNER JOIN tbGrado g ON c.idGrado=g.idGrado)INNER JOIN tbProfesor p ON p.idProfesor=c.idProfesor where g.idGrado=?',[idGrado]);
    return responseGet;
}
const obtenerCursosPorProfesorGradoSeccionService=async(idProfesor:string,idCurso:any)=>{
    const response=await conexion.query('SELECT c.idCurso,c.nombre_curso,c.abreviatura,c.creado,c.consolidado_bimestre,c.consolidado_anual,c.boletas,CONCAT(g.nombre_grado,", Sección: ",s.seccion) AS grado,color_curso FROM (tbCurso c INNER JOIN tbGrado g ON g.idGrado=c.idGrado)INNER JOIN tbSeccion s ON s.idSeccion=g.idSeccion WHERE idProfesor=? and c.idCurso!=?',[idProfesor,idCurso.idCurso]);
    return response
}

const obtenerCursosPorAlumnoService=async(idAlumno:string)=>{
    const response=await conexion.query('SELECT c.idCurso,g.idGrado,p.idProfesor,c.nombre_curso,al.idAlumno,CONCAT(g.nombre_grado,", ",s.seccion) AS grado, CONCAT(p.nombre_profesor," ",p.apellido_profesor) as profesor, c.color_curso FROM (((tbGrado g INNER JOIN tbCurso c ON c.idGrado=g.idGrado)INNER JOIN tbAlumno al ON al.idGrado=g.idGrado)INNER JOIN tbSeccion s ON s.idSeccion=g.idSeccion)INNER JOIN tbProfesor p ON p.idProfesor=c.idProfesor WHERE al.idAlumno=?',[idAlumno]);
    return response
}

const obtenerProfePorCurso=async(idCurso:string)=>{
    const response=await conexion.query('SELECT CONCAT(tp.nombre_profesor," ",tp.apellido_profesor) as NombreProfesor, tc.idGrado, g.idNivel,tc.color_curso FROM tbCurso tc INNER JOIN tbProfesor tp ON tc.idProfesor=tp.idProfesor INNER JOIN tbGrado g ON tc.idGrado=g.idGrado WHERE tc.idCurso=? ',[idCurso]);
    return response
}

const obtenerCursosPorGradoProfesorAdminService = async(idGrado:string)=>{
    const responseGet=await conexion.query('SELECT c.idCurso,c.nombre_curso,CONCAT(p.nombre_profesor," ",p.apellido_profesor) as profesor,p.idProfesor,c.consolidado_bimestre,c.consolidado_anual,c.boletas,c.abreviatura,c.color_curso FROM (tbCurso c INNER JOIN tbGrado g ON c.idGrado=g.idGrado)INNER JOIN tbProfesor p ON p.idProfesor=c.idProfesor where g.idGrado=?',[idGrado]);
    return responseGet;
}
const obtenerCursodeProfesor=async(idCurso:string)=>{
    const response=await conexion.query("SELECT c.nombre_curso,CONCAT(p.apellido_profesor,' ',p.nombre_profesor) as profesor FROM tbCurso c INNER JOIN tbProfesor p ON p.idProfesor=c.idProfesor WHERE c.idCurso=?",[idCurso]);
    return response
}

const obtenerImagenSubidCursosProfesor=async(idCurso:string,ruta:any,subida:string)=>{
    const verificar=await conexion.query("SELECT ruta_imagen,subida FROM tbImagenCurso WHERE idCurso=? and subida=? ",[idCurso,subida])
    if(verificar!=''){
        if(subida!='1'){
            const update=await conexion.query("UPDATE tbImagenCurso SET activa=0 WHERE idCurso=?",[idCurso])
            const update2=await conexion.query("UPDATE tbImagenCurso SET activa=1, peso_archivo=0, subida=0, ruta_imagen=? WHERE idCurso=? and subida=0",[ruta,idCurso])
            return update2
        }else{
            const update=await conexion.query("UPDATE tbImagenCurso SET activa=0 WHERE idCurso=?",[idCurso])
            const update2=await conexion.query("UPDATE tbImagenCurso SET activa=1 WHERE idCurso=? and subida=1 and ruta_imagen=?",[idCurso,ruta])
            return update2
        }
    }else{
        const update=await conexion.query("UPDATE tbImagenCurso SET activa=0 WHERE idCurso=?",[idCurso])
        const consulta=await conexion.query("INSERT INTO tbImagenCurso(idCurso,ruta_imagen,peso_archivo,activa,subida) values(?,?,0,1,0)",[idCurso,ruta])
        return consulta
    }
}

export {obtenerImagenSubidCursosProfesor,obtenerCursosPorGradoProfesorAdminService,obtenerCursosService, obtenerCursoService, updateCursosService, deleteCursosService, insertCursosService,obtenerCursosPorGradoService,obtenerCursosPorProfesorService,obtenerCursosPorGradoProfesorService,obtenerCursosPorProfesorGradoSeccionService,obtenerCursosPorAlumnoService,obtenerProfePorCurso,obtenerCursodeProfesor}
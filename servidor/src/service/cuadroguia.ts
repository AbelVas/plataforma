import { Request } from "express";
import conexion from "../config/database";

const obtenerCursosNotasService= async(idGrado:string,idUnidad:string,idCurso:string) =>{
    var objetolineal:any=[]
    var notas:any=['80','90', '70','100']
    var alumnos:any=[]
    var atributos:any={}
    var dataUsuario:any=[]
    const cursosConsolidado=await conexion.query('SELECT nombre_curso,abreviatura FROM tbCurso WHERE idGrado=?',[idGrado]);
    var cantidadCursos=cursosConsolidado.length
    const alumno=await conexion.query('SELECT idAlumno,CONCAT(apellidos_alumno,", ",nombres_alumno) as alumno FROM tbAlumno WHERE idGrado=?',[idGrado])
    var cantidadAlumnos=alumno.length
    for(let i=0;i<cantidadAlumnos;i++){
        dataUsuario=Object.values(alumno);
        atributos.alumno=dataUsuario[i];
        for(let j=0;j<cantidadCursos;j++){
            var nota='nota'+j        
            atributos[nota]=j
            //objetolineal[i]=atributos[i]
            objetolineal[i]=atributos
    }
   
    //console.log(atributos)
    //var responseGet=await conexion.query('SELECT notaCurso(?,cur.idCurso,al.idAlumno) as nota FROM (tbGrado g INNER JOIN tbCurso cur ON cur.idGrado=g.idGrado)INNER JOIN tbAlumno al ON al.idGrado=g.idGrado WHERE g.idGrado=?  ORDER BY al.apellidos_alumno',[idUnidad,idGrado]); 
    }
    console.log(objetolineal)
    return objetolineal
}

export{obtenerCursosNotasService}
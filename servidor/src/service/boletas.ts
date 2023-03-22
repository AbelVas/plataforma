import conexion from "../config/database";

const alumnosGradoService=async(idGrado:string,idAlumno:string)=>{
    const dataAlumnos=await conexion.query("SELECT al.idAlumno,CONCAT(al.nombres_alumno,' ',al.apellidos_alumno)as alumno,g.nombre_grado,s.seccion FROM (tbAlumno al INNER JOIN tbGrado g ON al.idGrado=g.idGrado)INNER JOIN tbSeccion s ON s.idSeccion=g.idSeccion WHERE g.idGrado=? and al.idAlumno=? order by apellidos_alumno",[idGrado,idAlumno]);
    return dataAlumnos
}

const alumnoNotasBoletaService=async(idGrado:string,idAlumno:string)=>{
    var temp:any=[];
    //const dataAlumnos=await conexion.query("SELECT al.idAlumno,CONCAT(al.nombres_alumno,' ',al.apellidos_alumno)as alumno,g.nombre_grado,s.seccion FROM (tbAlumno al INNER JOIN tbGrado g ON al.idGrado=g.idGrado)INNER JOIN tbSeccion s ON s.idSeccion=g.idSeccion WHERE g.idGrado=? and al.idAlumno=? order by apellidos_alumno",[idGrado,idAlumno]);
    //QUERY fINAL
    const cursosNotas=await conexion.query("select c.nombre_curso,fTNOTA(1,c.idCurso,"+idAlumno+") as I,fTNOTA(2,c.idCurso,"+idAlumno+") as II,fTNOTA(3,c.idCurso,"+idAlumno+") as III, fTNOTA(4,c.idCurso,"+idAlumno+") as IV FROM tbCurso c where c.idGrado="+idGrado+" and c.boletas=1")
    const notaArray:any=Object.values(cursosNotas);
    for(let i=0;i<notaArray.length;i++){
        temp[i]={
            curso:notaArray[i].nombre_curso,
            uno:notaArray[i].I,
            dos:notaArray[i].II,
            tres:notaArray[i].III,
            cuatro:notaArray[i].IV,
            promedio:Math.round((notaArray[i].I+notaArray[i].II+notaArray[i].III+notaArray[i].IV)/4)
        }
    }
    return temp
}
export {alumnosGradoService,alumnoNotasBoletaService}
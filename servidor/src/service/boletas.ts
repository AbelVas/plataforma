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

const alumnoNotasBoletaEspecialService=async(idGrado:string,idAlumno:string)=>{
    var temp:any=[];
    var mensaje:any='';
    //const dataAlumnos=await conexion.query("SELECT al.idAlumno,CONCAT(al.nombres_alumno,' ',al.apellidos_alumno)as alumno,g.nombre_grado,s.seccion FROM (tbAlumno al INNER JOIN tbGrado g ON al.idGrado=g.idGrado)INNER JOIN tbSeccion s ON s.idSeccion=g.idSeccion WHERE g.idGrado=? and al.idAlumno=? order by apellidos_alumno",[idGrado,idAlumno]);
    //QUERY fINAL
    const cursosNotas=await conexion.query("select c.nombre_curso,fTNOTA(4,c.idCurso,"+idAlumno+") as I FROM tbCurso c where c.idGrado="+idGrado+" and c.boleta_especial=1")
    const notaArray:any=Object.values(cursosNotas);
    for(let i=0;i<notaArray.length;i++){
        if(notaArray[i].I>59.9999){
            mensaje='Aprobado'
        }else{
            mensaje='Reprobado'
        }
        temp[i]={
            curso:notaArray[i].nombre_curso,
            uno:notaArray[i].I,
            estado:mensaje
        }
    }
    return temp
}
export {alumnosGradoService,alumnoNotasBoletaService,alumnoNotasBoletaEspecialService}
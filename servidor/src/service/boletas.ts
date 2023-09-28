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

const alumnoNotasBoletaFinalPromedio=async(idCurso:string,idGrado:string)=>{
    var temp:any=[];
    var mensaje:any='';
    var temp:any=[]
    var idAlumnos:any=[]
    //OBTENEMOS LOS ALUMNOS DEL GRADO
        const dataAlumnos=await conexion.query("SELECT idAlumno FROM `tbAlumno` WHERE idGrado=? order by apellidos_alumno",[idGrado]);
        const alumnosArray:any=Object.values(dataAlumnos);
        //sacamos los ids de los alumnos
        for(let j=0;j<dataAlumnos.length;j++){
            idAlumnos[j]=alumnosArray[j].idAlumno
        }
    //FIN DE OBTENER LOS ALUMNOS DEL GRADO
    for(let i=0;i<dataAlumnos.length;i++){
        const cursosNotas=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno, fTNOTA(1,"+idCurso+",a.idAlumno) as uno,fTNOTA(2,"+idCurso+",a.idAlumno) as dos, fTNOTA(3,"+idCurso+",a.idAlumno) as tres, fTNOTA(4,"+idCurso+",a.idAlumno) as cuatro FROM tbAlumno a INNER JOIN tbCurso c WHERE a.idAlumno=? GROUP BY a.idAlumno ORDER BY a.apellidos_alumno",[idAlumnos[i]])
        const notaArray:any=Object.values(cursosNotas);
        temp[i]={
            alumno:notaArray[0].alumno,
            uno:notaArray[0].uno,
            dos:notaArray[0].dos,
            tres:notaArray[0].tres,
            cuatro:notaArray[0].cuatro,
            promedio: Math.round((notaArray[0].uno+notaArray[0].dos+notaArray[0].tres+notaArray[0].cuatro)/4)
        }
    }
    return temp
}
export {alumnosGradoService,alumnoNotasBoletaService,alumnoNotasBoletaEspecialService,alumnoNotasBoletaFinalPromedio}
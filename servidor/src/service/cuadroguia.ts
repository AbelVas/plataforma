import { Request } from "express";
import conexion from "../config/database";

const alumnosGradoService=async(idGrado:string)=>{
    const dataAlumnos=await conexion.query("SELECT idAlumno,CONCAT(nombres_alumno,', ',apellidos_alumno)as alumno FROM `tbAlumno` WHERE idGrado=? order by apellidos_alumno",[idGrado]);
    return dataAlumnos
}

const GradoCursoSeccionService=async(idGrado:string,idCurso:string)=>{
    const datos=await conexion.query("SELECT g.nombre_grado,s.seccion,c.nombre_curso, CONCAT(p.apellido_profesor,', ',p.nombre_profesor) as profesor FROM ((tbGrado g INNER JOIN tbSeccion s ON g.idSeccion=s.idSeccion)INNER JOIN tbCurso c ON c.idGrado=g.idGrado)INNER JOIN tbProfesor p ON p.idProfesor=c.idProfesor where g.idGrado=? AND c.idCurso=?",[idGrado,idCurso])
    return datos
}
const actividadesCursoGradoService=async(idCurso:string,idUnidad:string)=>{
    const actividadesCurso=await conexion.query("SELECT idDetalleActividad,nombre_actividad from tbDetalleActividad WHERE idCurso=? and idUnidad=? order by fecha_entrega",[idCurso,idUnidad])
    return actividadesCurso
}
const notasalumnosFinalService=async(idCurso:string,idUnidad:string,idGrado:string)=>{
    var consulta:any={}
    var idActividades:any=[]
    var temp:any=[]
    var idAlumnos:any=[]
    //Obtengo las actividdes del curso
    const actividadesCurso=await conexion.query("SELECT idDetalleActividad,nombre_actividad from tbDetalleActividad WHERE idCurso=? and idUnidad=? order by fecha_entrega",[idCurso,idUnidad])
    const actividadesArray:any=Object.values(actividadesCurso);
    //obtengo los alumnos del grado
    const dataAlumnos=await conexion.query("SELECT idAlumno,CONCAT(nombres_alumno,', ',apellidos_alumno)as alumno FROM `tbAlumno` WHERE idGrado=? order by apellidos_alumno",[idGrado]);
    const alumnosArray:any=Object.values(dataAlumnos);
    //sacamos el id del curso
    for(let i=0;i<actividadesCurso.length;i++){
        idActividades[i]=actividadesArray[i].idDetalleActividad
    }
    //sacamos los ids de los alumnos
  for(let h=0;h<dataAlumnos.length;h++){
        idAlumnos[h]=alumnosArray[h].idAlumno
    }
    
   switch(idActividades.length){
    case 1:
        for(let i=0;i<idAlumnos.length;i++){
            consulta=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[0]+","+idUnidad+") as cero FROM tbAlumno a WHERE idAlumno="+idAlumnos[i]+"")
            const notaArray:any=Object.values(consulta);
            temp[i]={
                alumno:notaArray[0].alumno,
                uno:notaArray[0].cero
            }
           }
        break;
    case 2:
        for(let i=0;i<idAlumnos.length;i++){
            consulta=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[0]+","+idUnidad+") as cero,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[1]+","+idUnidad+") as uno FROM tbAlumno a WHERE idAlumno="+idAlumnos[i]+"")
            const notaArray:any=Object.values(consulta);
            temp[i]={
                alumno:notaArray[0].alumno,
                uno:notaArray[0].cero,
                dos:notaArray[0].uno
            }
           }
        break;
    case 3:
        for(let i=0;i<idAlumnos.length;i++){
            consulta=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[0]+","+idUnidad+") as cero,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[1]+","+idUnidad+") as uno,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[2]+","+idUnidad+") as dos FROM tbAlumno a WHERE idAlumno="+idAlumnos[i]+"")
            const notaArray:any=Object.values(consulta);
            temp[i]={
                alumno:notaArray[0].alumno,
                uno:notaArray[0].cero,
                dos:notaArray[0].uno,
                tres:notaArray[0].dos
            }
           }
        break;
    case 4:
        for(let i=0;i<idAlumnos.length;i++){
            consulta=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[0]+","+idUnidad+") as cero,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[1]+","+idUnidad+") as uno,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[2]+","+idUnidad+") as dos,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[3]+","+idUnidad+") as tres FROM tbAlumno a WHERE idAlumno="+idAlumnos[i]+"")
            const notaArray:any=Object.values(consulta);
            temp[i]={
                alumno:notaArray[0].alumno,
                uno:notaArray[0].cero,
                dos:notaArray[0].uno,
                tres:notaArray[0].dos,
                cuatro:notaArray[0].tres
            }
           }
        break;
    case 5:
        for(let i=0;i<idAlumnos.length;i++){
            consulta=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[0]+","+idUnidad+") as cero,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[1]+","+idUnidad+") as uno,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[2]+","+idUnidad+") as dos,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[3]+","+idUnidad+") as tres,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[4]+","+idUnidad+") as cuatro FROM tbAlumno a WHERE idAlumno="+idAlumnos[i]+"")
            const notaArray:any=Object.values(consulta);
            temp[i]={
                alumno:notaArray[0].alumno,
                uno:notaArray[0].cero,
                dos:notaArray[0].uno,
                tres:notaArray[0].dos,
                cuatro:notaArray[0].tres,
                cinco:notaArray[0].cuatro
            }
           }
        break;
    case 6:
        for(let i=0;i<idAlumnos.length;i++){
            consulta=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[0]+","+idUnidad+") as cero,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[1]+","+idUnidad+") as uno,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[2]+","+idUnidad+") as dos,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[3]+","+idUnidad+") as tres,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[4]+","+idUnidad+") as cuatro,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[5]+","+idUnidad+") as cinco FROM tbAlumno a WHERE idAlumno="+idAlumnos[i]+"")
            const notaArray:any=Object.values(consulta);
            temp[i]={
                alumno:notaArray[0].alumno,
                uno:notaArray[0].cero,
                dos:notaArray[0].uno,
                tres:notaArray[0].dos,
                cuatro:notaArray[0].tres,
                cinco:notaArray[0].cuatro,
                seis:notaArray[0].cinco,
            }
           }
        break;
    case 7:
        for(let i=0;i<idAlumnos.length;i++){
            consulta=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[0]+","+idUnidad+") as cero,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[1]+","+idUnidad+") as uno,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[2]+","+idUnidad+") as dos,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[3]+","+idUnidad+") as tres,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[4]+","+idUnidad+") as cuatro,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[5]+","+idUnidad+") as cinco,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[6]+","+idUnidad+") as seis FROM tbAlumno a WHERE idAlumno="+idAlumnos[i]+"")
            const notaArray:any=Object.values(consulta);
            temp[i]={
                alumno:notaArray[0].alumno,
                uno:notaArray[0].cero,
                dos:notaArray[0].uno,
                tres:notaArray[0].dos,
                cuatro:notaArray[0].tres,
                cinco:notaArray[0].cuatro,
                seis:notaArray[0].cinco,
                siete:notaArray[0].seis,
            }
           }
        break;
    case 8:
        for(let i=0;i<idAlumnos.length;i++){
            consulta=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[0]+","+idUnidad+") as cero,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[1]+","+idUnidad+") as uno,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[2]+","+idUnidad+") as dos,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[3]+","+idUnidad+") as tres,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[4]+","+idUnidad+") as cuatro,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[5]+","+idUnidad+") as cinco,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[6]+","+idUnidad+") as seis,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[7]+","+idUnidad+") as siete FROM tbAlumno a WHERE idAlumno="+idAlumnos[i]+"")
            const notaArray:any=Object.values(consulta);
            temp[i]={
                alumno:notaArray[0].alumno,
                uno:notaArray[0].cero,
                dos:notaArray[0].uno,
                tres:notaArray[0].dos,
                cuatro:notaArray[0].tres,
                cinco:notaArray[0].cuatro,
                seis:notaArray[0].cinco,
                siete:notaArray[0].seis,
                ocho:notaArray[0].siete,
            }
           }
        break;
    case 9:
        for(let i=0;i<idAlumnos.length;i++){
            consulta=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[0]+","+idUnidad+") as cero,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[1]+","+idUnidad+") as uno,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[2]+","+idUnidad+") as dos,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[3]+","+idUnidad+") as tres,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[4]+","+idUnidad+") as cuatro,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[5]+","+idUnidad+") as cinco,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[6]+","+idUnidad+") as seis,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[7]+","+idUnidad+") as siete,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[8]+","+idUnidad+") as ocho FROM tbAlumno a WHERE idAlumno="+idAlumnos[i]+"")
            const notaArray:any=Object.values(consulta);
            temp[i]={
                alumno:notaArray[0].alumno,
                uno:notaArray[0].cero,
                dos:notaArray[0].uno,
                tres:notaArray[0].dos,
                cuatro:notaArray[0].tres,
                cinco:notaArray[0].cuatro,
                seis:notaArray[0].cinco,
                siete:notaArray[0].seis,
                ocho:notaArray[0].siete,
                nueve:notaArray[0].ocho,
            }
           }
        break;
    case 10:
        for(let i=0;i<idAlumnos.length;i++){
            consulta=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[0]+","+idUnidad+") as cero,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[1]+","+idUnidad+") as uno,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[2]+","+idUnidad+") as dos,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[3]+","+idUnidad+") as tres,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[4]+","+idUnidad+") as cuatro,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[5]+","+idUnidad+") as cinco,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[6]+","+idUnidad+") as seis,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[7]+","+idUnidad+") as siete,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[8]+","+idUnidad+") as ocho,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[9]+","+idUnidad+") as nueve FROM tbAlumno a WHERE idAlumno="+idAlumnos[i]+"")
            const notaArray:any=Object.values(consulta);
            temp[i]={
                alumno:notaArray[0].alumno,
                uno:notaArray[0].cero,
                dos:notaArray[0].uno,
                tres:notaArray[0].dos,
                cuatro:notaArray[0].tres,
                cinco:notaArray[0].cuatro,
                seis:notaArray[0].cinco,
                siete:notaArray[0].seis,
                ocho:notaArray[0].siete,
                nueve:notaArray[0].ocho,
                diez:notaArray[0].nueve,
            }
           }
        break;
    case 11:
        for(let i=0;i<idAlumnos.length;i++){
            consulta=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[0]+","+idUnidad+") as cero,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[1]+","+idUnidad+") as uno,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[2]+","+idUnidad+") as dos,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[3]+","+idUnidad+") as tres,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[4]+","+idUnidad+") as cuatro,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[5]+","+idUnidad+") as cinco,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[6]+","+idUnidad+") as seis,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[7]+","+idUnidad+") as siete,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[8]+","+idUnidad+") as ocho,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[9]+","+idUnidad+") as nueve,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[10]+","+idUnidad+") as diez FROM tbAlumno a WHERE idAlumno="+idAlumnos[i]+"")
            const notaArray:any=Object.values(consulta);
            temp[i]={
                alumno:notaArray[0].alumno,
                uno:notaArray[0].cero,
                dos:notaArray[0].uno,
                tres:notaArray[0].dos,
                cuatro:notaArray[0].tres,
                cinco:notaArray[0].cuatro,
                seis:notaArray[0].cinco,
                siete:notaArray[0].seis,
                ocho:notaArray[0].siete,
                nueve:notaArray[0].ocho,
                diez:notaArray[0].nueve,
                once:notaArray[0].diez,
            }
           }
        break;
    case 12:
        for(let i=0;i<idAlumnos.length;i++){
            consulta=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[0]+","+idUnidad+") as cero,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[1]+","+idUnidad+") as uno,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[2]+","+idUnidad+") as dos,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[3]+","+idUnidad+") as tres,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[4]+","+idUnidad+") as cuatro,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[5]+","+idUnidad+") as cinco,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[6]+","+idUnidad+") as seis,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[7]+","+idUnidad+") as siete,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[8]+","+idUnidad+") as ocho,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[9]+","+idUnidad+") as nueve,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[10]+","+idUnidad+") as diez,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[11]+","+idUnidad+") as once FROM tbAlumno a WHERE idAlumno="+idAlumnos[i]+"")
            const notaArray:any=Object.values(consulta);
            temp[i]={
                alumno:notaArray[0].alumno,
                uno:notaArray[0].cero,
                dos:notaArray[0].uno,
                tres:notaArray[0].dos,
                cuatro:notaArray[0].tres,
                cinco:notaArray[0].cuatro,
                seis:notaArray[0].cinco,
                siete:notaArray[0].seis,
                ocho:notaArray[0].siete,
                nueve:notaArray[0].ocho,
                diez:notaArray[0].nueve,
                once:notaArray[0].diez,
                doce:notaArray[0].once,
            }
           }
        break;
    case 13:
        for(let i=0;i<idAlumnos.length;i++){
            consulta=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[0]+","+idUnidad+") as cero,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[1]+","+idUnidad+") as uno,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[2]+","+idUnidad+") as dos,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[3]+","+idUnidad+") as tres,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[4]+","+idUnidad+") as cuatro,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[5]+","+idUnidad+") as cinco,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[6]+","+idUnidad+") as seis,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[7]+","+idUnidad+") as siete,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[8]+","+idUnidad+") as ocho,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[9]+","+idUnidad+") as nueve,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[10]+","+idUnidad+") as diez,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[11]+","+idUnidad+") as once,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[12]+","+idUnidad+") as doce FROM tbAlumno a WHERE idAlumno="+idAlumnos[i]+"")
            const notaArray:any=Object.values(consulta);
            temp[i]={
                alumno:notaArray[0].alumno,
                uno:notaArray[0].cero,
                dos:notaArray[0].uno,
                tres:notaArray[0].dos,
                cuatro:notaArray[0].tres,
                cinco:notaArray[0].cuatro,
                seis:notaArray[0].cinco,
                siete:notaArray[0].seis,
                ocho:notaArray[0].siete,
                nueve:notaArray[0].ocho,
                diez:notaArray[0].nueve,
                once:notaArray[0].diez,
                doce:notaArray[0].once,
                trece:notaArray[0].doce,
            }
           }
        break;
    case 14:
        for(let i=0;i<idAlumnos.length;i++){
            consulta=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[0]+","+idUnidad+") as cero,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[1]+","+idUnidad+") as uno,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[2]+","+idUnidad+") as dos,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[3]+","+idUnidad+") as tres,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[4]+","+idUnidad+") as cuatro,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[5]+","+idUnidad+") as cinco,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[6]+","+idUnidad+") as seis,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[7]+","+idUnidad+") as siete,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[8]+","+idUnidad+") as ocho,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[9]+","+idUnidad+") as nueve,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[10]+","+idUnidad+") as diez,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[11]+","+idUnidad+") as once,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[12]+","+idUnidad+") as doce,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[13]+","+idUnidad+") as trece FROM tbAlumno a WHERE idAlumno="+idAlumnos[i]+"")
            const notaArray:any=Object.values(consulta);
            temp[i]={
                alumno:notaArray[0].alumno,
                uno:notaArray[0].cero,
                dos:notaArray[0].uno,
                tres:notaArray[0].dos,
                cuatro:notaArray[0].tres,
                cinco:notaArray[0].cuatro,
                seis:notaArray[0].cinco,
                siete:notaArray[0].seis,
                ocho:notaArray[0].siete,
                nueve:notaArray[0].ocho,
                diez:notaArray[0].nueve,
                once:notaArray[0].diez,
                doce:notaArray[0].once,
                trece:notaArray[0].doce,
                catorce:notaArray[0].trece,
            }
           }
        break;
    case 15:
        for(let i=0;i<idAlumnos.length;i++){
            consulta=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[0]+","+idUnidad+") as cero,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[1]+","+idUnidad+") as uno,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[2]+","+idUnidad+") as dos,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[3]+","+idUnidad+") as tres,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[4]+","+idUnidad+") as cuatro,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[5]+","+idUnidad+") as cinco,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[6]+","+idUnidad+") as seis,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[7]+","+idUnidad+") as siete,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[8]+","+idUnidad+") as ocho,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[9]+","+idUnidad+") as nueve,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[10]+","+idUnidad+") as diez,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[11]+","+idUnidad+") as once,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[12]+","+idUnidad+") as doce,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[13]+","+idUnidad+") as trece,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[14]+","+idUnidad+") as catorce FROM tbAlumno a WHERE idAlumno="+idAlumnos[i]+"")
            const notaArray:any=Object.values(consulta);
            temp[i]={
                alumno:notaArray[0].alumno,
                uno:notaArray[0].cero,
                dos:notaArray[0].uno,
                tres:notaArray[0].dos,
                cuatro:notaArray[0].tres,
                cinco:notaArray[0].cuatro,
                seis:notaArray[0].cinco,
                siete:notaArray[0].seis,
                ocho:notaArray[0].siete,
                nueve:notaArray[0].ocho,
                diez:notaArray[0].nueve,
                once:notaArray[0].diez,
                doce:notaArray[0].once,
                trece:notaArray[0].doce,
                catorce:notaArray[0].trece,
                quince:notaArray[0].catorce,
            }
           }
        break;
    case 16:
        for(let i=0;i<idAlumnos.length;i++){
            consulta=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[0]+","+idUnidad+") as cero,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[1]+","+idUnidad+") as uno,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[2]+","+idUnidad+") as dos,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[3]+","+idUnidad+") as tres,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[4]+","+idUnidad+") as cuatro,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[5]+","+idUnidad+") as cinco,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[6]+","+idUnidad+") as seis,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[7]+","+idUnidad+") as siete,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[8]+","+idUnidad+") as ocho,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[9]+","+idUnidad+") as nueve,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[10]+","+idUnidad+") as diez,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[11]+","+idUnidad+") as once,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[12]+","+idUnidad+") as doce,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[13]+","+idUnidad+") as trece,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[14]+","+idUnidad+") as catorce,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[15]+","+idUnidad+") as quince FROM tbAlumno a WHERE idAlumno="+idAlumnos[i]+"")
            const notaArray:any=Object.values(consulta);
            temp[i]={
                alumno:notaArray[0].alumno,
                uno:notaArray[0].cero,
                dos:notaArray[0].uno,
                tres:notaArray[0].dos,
                cuatro:notaArray[0].tres,
                cinco:notaArray[0].cuatro,
                seis:notaArray[0].cinco,
                siete:notaArray[0].seis,
                ocho:notaArray[0].siete,
                nueve:notaArray[0].ocho,
                diez:notaArray[0].nueve,
                once:notaArray[0].diez,
                doce:notaArray[0].once,
                trece:notaArray[0].doce,
                catorce:notaArray[0].trece,
                quince:notaArray[0].catorce,
                dieciseis:notaArray[0].quince,
            }
           }
        break;
        case 17:
            for(let i=0;i<idAlumnos.length;i++){
                consulta=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[0]+","+idUnidad+") as cero,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[1]+","+idUnidad+") as uno,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[2]+","+idUnidad+") as dos,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[3]+","+idUnidad+") as tres,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[4]+","+idUnidad+") as cuatro,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[5]+","+idUnidad+") as cinco,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[6]+","+idUnidad+") as seis,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[7]+","+idUnidad+") as siete,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[8]+","+idUnidad+") as ocho,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[9]+","+idUnidad+") as nueve,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[10]+","+idUnidad+") as diez,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[11]+","+idUnidad+") as once,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[12]+","+idUnidad+") as doce,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[13]+","+idUnidad+") as trece,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[14]+","+idUnidad+") as catorce,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[15]+","+idUnidad+") as quince,fcursoactividad("+idCurso+","+idAlumnos[i]+","+idActividades[16]+","+idUnidad+") as dieciseis FROM tbAlumno a WHERE idAlumno="+idAlumnos[i]+"")
                const notaArray:any=Object.values(consulta);
                temp[i]={
                    alumno:notaArray[0].alumno,
                    uno:notaArray[0].cero,
                    dos:notaArray[0].uno,
                    tres:notaArray[0].dos,
                    cuatro:notaArray[0].tres,
                    cinco:notaArray[0].cuatro,
                    seis:notaArray[0].cinco,
                    siete:notaArray[0].seis,
                    ocho:notaArray[0].siete,
                    nueve:notaArray[0].ocho,
                    diez:notaArray[0].nueve,
                    once:notaArray[0].diez,
                    doce:notaArray[0].once,
                    trece:notaArray[0].doce,
                    catorce:notaArray[0].trece,
                    quince:notaArray[0].catorce,
                    dieciseis:notaArray[0].quince,
                    diecisiete:notaArray[0].dieciseis,
                }
               }
            break;
   }
    return temp
}

//consolidado cursos del grado por bimestre
const notasalumnosCursoFinalService=async(idGrado:string,idUnidad:string)=>{
    var consulta:any={}
    var idCursos:any=[]
    var temp:any=[]
    var idAlumnos:any=[]
    //Obtengo los cursos
    const cursos=await conexion.query("SELECT idCurso,abreviatura,nombre_curso FROM tbCurso WHERE idGrado=? and consolidado_bimestre=1",[idGrado]);
    const cursosArray:any=Object.values(cursos);
    for(let i=0;i<cursosArray.length;i++){
        idCursos[i]=cursosArray[i].idCurso
    }
    //Obtengo los Alumnos
    const dataAlumnos=await conexion.query("SELECT idAlumno,CONCAT(nombres_alumno,', ',apellidos_alumno)as alumno FROM `tbAlumno` WHERE idGrado=? order by apellidos_alumno",[idGrado]);
    const alumnosArray:any=Object.values(dataAlumnos);
    //sacamos los ids de los alumnos
    for(let h=0;h<dataAlumnos.length;h++){
    idAlumnos[h]=alumnosArray[h].idAlumno
    }
    console.log(idCursos.length)
    switch(idCursos.length){
        case 1:
            for(let i=0;i<idAlumnos.length;i++){
                consulta=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno,fmateria("+idUnidad+","+idCursos[0]+","+idAlumnos[i]+") as cero FROM tbAlumno a WHERE idAlumno="+idAlumnos[i]+"")
        
                const notaArray:any=Object.values(consulta);
                temp[i]={
                    alumno:notaArray[0].alumno,
                    uno:notaArray[0].cero,
                    promedio:Math.round(notaArray[0].cero)
                }
               }
            break;
        case 2:
            for(let i=0;i<idAlumnos.length;i++){
                consulta=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno,fmateria("+idUnidad+","+idCursos[0]+","+idAlumnos[i]+") as cero,fmateria("+idUnidad+","+idCursos[1]+","+idAlumnos[i]+") as uno FROM tbAlumno a WHERE idAlumno="+idAlumnos[i]+"")
        
                const notaArray:any=Object.values(consulta);
                temp[i]={
                    alumno:notaArray[0].alumno,
                    uno:notaArray[0].cero,
                    dos:notaArray[0].uno,
                    promedio:Math.round((notaArray[0].cero+notaArray[0].uno)/2)
                }
               }
            break;
        case 3:
            for(let i=0;i<idAlumnos.length;i++){
                consulta=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno,fmateria("+idUnidad+","+idCursos[0]+","+idAlumnos[i]+") as cero,fmateria("+idUnidad+","+idCursos[1]+","+idAlumnos[i]+") as uno,fmateria("+idUnidad+","+idCursos[2]+","+idAlumnos[i]+") as dos FROM tbAlumno a WHERE idAlumno="+idAlumnos[i]+"")
        
                const notaArray:any=Object.values(consulta);
                temp[i]={
                    alumno:notaArray[0].alumno,
                    uno:notaArray[0].cero,
                    dos:notaArray[0].uno,
                    tres:notaArray[0].dos,
                    promedio:Math.round((notaArray[0].cero+notaArray[0].uno+notaArray[0].dos)/3)
                }
               }
            break;
        case 4:
            for(let i=0;i<idAlumnos.length;i++){
                consulta=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno,fmateria("+idUnidad+","+idCursos[0]+","+idAlumnos[i]+") as cero,fmateria("+idUnidad+","+idCursos[1]+","+idAlumnos[i]+") as uno,fmateria("+idUnidad+","+idCursos[2]+","+idAlumnos[i]+") as dos,fmateria("+idUnidad+","+idCursos[3]+","+idAlumnos[i]+") as tres FROM tbAlumno a WHERE idAlumno="+idAlumnos[i]+"")
        
                const notaArray:any=Object.values(consulta);
                temp[i]={
                    alumno:notaArray[0].alumno,
                    uno:notaArray[0].cero,
                    dos:notaArray[0].uno,
                    tres:notaArray[0].dos,
                    cuatro:notaArray[0].tres,
                    promedio:Math.round((notaArray[0].cero+notaArray[0].uno+notaArray[0].dos+notaArray[0].tres)/4)
                }
               }
            break;
        case 5:
            for(let i=0;i<idAlumnos.length;i++){
                consulta=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno,fmateria("+idUnidad+","+idCursos[0]+","+idAlumnos[i]+") as cero,fmateria("+idUnidad+","+idCursos[1]+","+idAlumnos[i]+") as uno,fmateria("+idUnidad+","+idCursos[2]+","+idAlumnos[i]+") as dos,fmateria("+idUnidad+","+idCursos[3]+","+idAlumnos[i]+") as tres,fmateria("+idUnidad+","+idCursos[4]+","+idAlumnos[i]+") as cuatro FROM tbAlumno a WHERE idAlumno="+idAlumnos[i]+"")
        
                const notaArray:any=Object.values(consulta);
                temp[i]={
                    alumno:notaArray[0].alumno,
                    uno:notaArray[0].cero,
                    dos:notaArray[0].uno,
                    tres:notaArray[0].dos,
                    cuatro:notaArray[0].tres,
                    cinco:notaArray[0].cuatro,
                    promedio:Math.round((notaArray[0].cero+notaArray[0].uno+notaArray[0].dos+notaArray[0].tres+notaArray[0].cuatro)/5)
                }
               }
            break;
        case 6:
            for(let i=0;i<idAlumnos.length;i++){
                consulta=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno,fmateria("+idUnidad+","+idCursos[0]+","+idAlumnos[i]+") as cero,fmateria("+idUnidad+","+idCursos[1]+","+idAlumnos[i]+") as uno,fmateria("+idUnidad+","+idCursos[2]+","+idAlumnos[i]+") as dos,fmateria("+idUnidad+","+idCursos[3]+","+idAlumnos[i]+") as tres,fmateria("+idUnidad+","+idCursos[4]+","+idAlumnos[i]+") as cuatro,fmateria("+idUnidad+","+idCursos[5]+","+idAlumnos[i]+") as cinco FROM tbAlumno a WHERE idAlumno="+idAlumnos[i]+"")
        
                const notaArray:any=Object.values(consulta);
                temp[i]={
                    alumno:notaArray[0].alumno,
                    uno:notaArray[0].cero,
                    dos:notaArray[0].uno,
                    tres:notaArray[0].dos,
                    cuatro:notaArray[0].tres,
                    cinco:notaArray[0].cuatro,
                    seis:notaArray[0].cinco,
                    promedio:Math.round((notaArray[0].cero+notaArray[0].uno+notaArray[0].dos+notaArray[0].tres+notaArray[0].cuatro+notaArray[0].cinco)/6)
                }
               }
            break; 
        case 7:
            for(let i=0;i<idAlumnos.length;i++){
                consulta=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno,fmateria("+idUnidad+","+idCursos[0]+","+idAlumnos[i]+") as cero,fmateria("+idUnidad+","+idCursos[1]+","+idAlumnos[i]+") as uno,fmateria("+idUnidad+","+idCursos[2]+","+idAlumnos[i]+") as dos,fmateria("+idUnidad+","+idCursos[3]+","+idAlumnos[i]+") as tres,fmateria("+idUnidad+","+idCursos[4]+","+idAlumnos[i]+") as cuatro,fmateria("+idUnidad+","+idCursos[5]+","+idAlumnos[i]+") as cinco,fmateria("+idUnidad+","+idCursos[6]+","+idAlumnos[i]+") as seis FROM tbAlumno a WHERE idAlumno="+idAlumnos[i]+"")
        
                const notaArray:any=Object.values(consulta);
                temp[i]={
                    alumno:notaArray[0].alumno,
                    uno:notaArray[0].cero,
                    dos:notaArray[0].uno,
                    tres:notaArray[0].dos,
                    cuatro:notaArray[0].tres,
                    cinco:notaArray[0].cuatro,
                    seis:notaArray[0].cinco,
                    siete:notaArray[0].seis,
                    promedio:Math.round((notaArray[0].cero+notaArray[0].uno+notaArray[0].dos+notaArray[0].tres+notaArray[0].cuatro+notaArray[0].cinco+notaArray[0].seis)/7)
                }
               }
            break;
        case 8:
            for(let i=0;i<idAlumnos.length;i++){
                consulta=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno,fmateria("+idUnidad+","+idCursos[0]+","+idAlumnos[i]+") as cero,fmateria("+idUnidad+","+idCursos[1]+","+idAlumnos[i]+") as uno,fmateria("+idUnidad+","+idCursos[2]+","+idAlumnos[i]+") as dos,fmateria("+idUnidad+","+idCursos[3]+","+idAlumnos[i]+") as tres,fmateria("+idUnidad+","+idCursos[4]+","+idAlumnos[i]+") as cuatro,fmateria("+idUnidad+","+idCursos[5]+","+idAlumnos[i]+") as cinco,fmateria("+idUnidad+","+idCursos[6]+","+idAlumnos[i]+") as seis,fmateria("+idUnidad+","+idCursos[7]+","+idAlumnos[i]+") as siete FROM tbAlumno a WHERE idAlumno="+idAlumnos[i]+"")
        
                const notaArray:any=Object.values(consulta);
                temp[i]={
                    alumno:notaArray[0].alumno,
                    uno:notaArray[0].cero,
                    dos:notaArray[0].uno,
                    tres:notaArray[0].dos,
                    cuatro:notaArray[0].tres,
                    cinco:notaArray[0].cuatro,
                    seis:notaArray[0].cinco,
                    siete:notaArray[0].seis,
                    ocho:notaArray[0].siete,
                    promedio:Math.round((notaArray[0].cero+notaArray[0].uno+notaArray[0].dos+notaArray[0].tres+notaArray[0].cuatro+notaArray[0].cinco+notaArray[0].seis+notaArray[0].siete)/8)
                }
               }
            break;
        case 9:
            for(let i=0;i<idAlumnos.length;i++){
                consulta=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno,fmateria("+idUnidad+","+idCursos[0]+","+idAlumnos[i]+") as cero,fmateria("+idUnidad+","+idCursos[1]+","+idAlumnos[i]+") as uno,fmateria("+idUnidad+","+idCursos[2]+","+idAlumnos[i]+") as dos,fmateria("+idUnidad+","+idCursos[3]+","+idAlumnos[i]+") as tres,fmateria("+idUnidad+","+idCursos[4]+","+idAlumnos[i]+") as cuatro,fmateria("+idUnidad+","+idCursos[5]+","+idAlumnos[i]+") as cinco,fmateria("+idUnidad+","+idCursos[6]+","+idAlumnos[i]+") as seis,fmateria("+idUnidad+","+idCursos[7]+","+idAlumnos[i]+") as siete,fmateria("+idUnidad+","+idCursos[8]+","+idAlumnos[i]+") as ocho FROM tbAlumno a WHERE idAlumno="+idAlumnos[i]+"")
        
                const notaArray:any=Object.values(consulta);
                temp[i]={
                    alumno:notaArray[0].alumno,
                    uno:notaArray[0].cero,
                    dos:notaArray[0].uno,
                    tres:notaArray[0].dos,
                    cuatro:notaArray[0].tres,
                    cinco:notaArray[0].cuatro,
                    seis:notaArray[0].cinco,
                    siete:notaArray[0].seis,
                    ocho:notaArray[0].siete,
                    nueve:notaArray[0].ocho,
                    promedio:Math.round((notaArray[0].cero+notaArray[0].uno+notaArray[0].dos+notaArray[0].tres+notaArray[0].cuatro+notaArray[0].cinco+notaArray[0].seis+notaArray[0].siete+notaArray[0].ocho)/9)
                }
               }
            break;
        case 10:
            for(let i=0;i<idAlumnos.length;i++){
                consulta=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno,fmateria("+idUnidad+","+idCursos[0]+","+idAlumnos[i]+") as cero,fmateria("+idUnidad+","+idCursos[1]+","+idAlumnos[i]+") as uno,fmateria("+idUnidad+","+idCursos[2]+","+idAlumnos[i]+") as dos,fmateria("+idUnidad+","+idCursos[3]+","+idAlumnos[i]+") as tres,fmateria("+idUnidad+","+idCursos[4]+","+idAlumnos[i]+") as cuatro,fmateria("+idUnidad+","+idCursos[5]+","+idAlumnos[i]+") as cinco,fmateria("+idUnidad+","+idCursos[6]+","+idAlumnos[i]+") as seis,fmateria("+idUnidad+","+idCursos[7]+","+idAlumnos[i]+") as siete,fmateria("+idUnidad+","+idCursos[8]+","+idAlumnos[i]+") as ocho, fmateria("+idUnidad+","+idCursos[9]+","+idAlumnos[i]+") as nueve FROM tbAlumno a WHERE idAlumno="+idAlumnos[i]+"")
        
                const notaArray:any=Object.values(consulta);
                temp[i]={
                    alumno:notaArray[0].alumno,
                    uno:notaArray[0].cero,
                    dos:notaArray[0].uno,
                    tres:notaArray[0].dos,
                    cuatro:notaArray[0].tres,
                    cinco:notaArray[0].cuatro,
                    seis:notaArray[0].cinco,
                    siete:notaArray[0].seis,
                    ocho:notaArray[0].siete,
                    nueve:notaArray[0].ocho,
                    diez:notaArray[0].nueve,
                    promedio:Math.round((notaArray[0].cero+notaArray[0].uno+notaArray[0].dos+notaArray[0].tres+notaArray[0].cuatro+notaArray[0].cinco+notaArray[0].seis+notaArray[0].siete+notaArray[0].ocho+notaArray[0].nueve)/10)
                }
               }
            break;
        case 11:
            for(let i=0;i<idAlumnos.length;i++){
                consulta=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno,fmateria("+idUnidad+","+idCursos[0]+","+idAlumnos[i]+") as cero,fmateria("+idUnidad+","+idCursos[1]+","+idAlumnos[i]+") as uno,fmateria("+idUnidad+","+idCursos[2]+","+idAlumnos[i]+") as dos,fmateria("+idUnidad+","+idCursos[3]+","+idAlumnos[i]+") as tres,fmateria("+idUnidad+","+idCursos[4]+","+idAlumnos[i]+") as cuatro,fmateria("+idUnidad+","+idCursos[5]+","+idAlumnos[i]+") as cinco,fmateria("+idUnidad+","+idCursos[6]+","+idAlumnos[i]+") as seis,fmateria("+idUnidad+","+idCursos[7]+","+idAlumnos[i]+") as siete,fmateria("+idUnidad+","+idCursos[8]+","+idAlumnos[i]+") as ocho, fmateria("+idUnidad+","+idCursos[9]+","+idAlumnos[i]+") as nueve, fmateria("+idUnidad+","+idCursos[10]+","+idAlumnos[i]+") as diez FROM tbAlumno a WHERE idAlumno="+idAlumnos[i]+"")
        
                const notaArray:any=Object.values(consulta);
                temp[i]={
                    alumno:notaArray[0].alumno,
                    uno:notaArray[0].cero,
                    dos:notaArray[0].uno,
                    tres:notaArray[0].dos,
                    cuatro:notaArray[0].tres,
                    cinco:notaArray[0].cuatro,
                    seis:notaArray[0].cinco,
                    siete:notaArray[0].seis,
                    ocho:notaArray[0].siete,
                    nueve:notaArray[0].ocho,
                    diez:notaArray[0].nueve,
                    once:notaArray[0].diez,
                    promedio:Math.round((notaArray[0].cero+notaArray[0].uno+notaArray[0].dos+notaArray[0].tres+notaArray[0].cuatro+notaArray[0].cinco+notaArray[0].seis+notaArray[0].siete+notaArray[0].ocho+notaArray[0].nueve+notaArray[0].diez)/11)
                    
                }
               }
            break;
        case 12:
            for(let i=0;i<idAlumnos.length;i++){
                consulta=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno,fmateria("+idUnidad+","+idCursos[0]+","+idAlumnos[i]+") as cero,fmateria("+idUnidad+","+idCursos[1]+","+idAlumnos[i]+") as uno,fmateria("+idUnidad+","+idCursos[2]+","+idAlumnos[i]+") as dos,fmateria("+idUnidad+","+idCursos[3]+","+idAlumnos[i]+") as tres,fmateria("+idUnidad+","+idCursos[4]+","+idAlumnos[i]+") as cuatro,fmateria("+idUnidad+","+idCursos[5]+","+idAlumnos[i]+") as cinco,fmateria("+idUnidad+","+idCursos[6]+","+idAlumnos[i]+") as seis,fmateria("+idUnidad+","+idCursos[7]+","+idAlumnos[i]+") as siete,fmateria("+idUnidad+","+idCursos[8]+","+idAlumnos[i]+") as ocho, fmateria("+idUnidad+","+idCursos[9]+","+idAlumnos[i]+") as nueve, fmateria("+idUnidad+","+idCursos[10]+","+idAlumnos[i]+") as diez, fmateria("+idUnidad+","+idCursos[11]+","+idAlumnos[i]+") as once FROM tbAlumno a WHERE idAlumno="+idAlumnos[i]+"")
        
                const notaArray:any=Object.values(consulta);
                temp[i]={
                    alumno:notaArray[0].alumno,
                    uno:notaArray[0].cero,
                    dos:notaArray[0].uno,
                    tres:notaArray[0].dos,
                    cuatro:notaArray[0].tres,
                    cinco:notaArray[0].cuatro,
                    seis:notaArray[0].cinco,
                    siete:notaArray[0].seis,
                    ocho:notaArray[0].siete,
                    nueve:notaArray[0].ocho,
                    diez:notaArray[0].nueve,
                    once:notaArray[0].diez,
                    doce:notaArray[0].once,
                    promedio:Math.round((notaArray[0].cero+notaArray[0].uno+notaArray[0].dos+notaArray[0].tres+notaArray[0].cuatro+notaArray[0].cinco+notaArray[0].seis+notaArray[0].siete+notaArray[0].ocho+notaArray[0].nueve+notaArray[0].diez+notaArray[0].once)/12)
                }
               }
            break;
        case 13:
            for(let i=0;i<idAlumnos.length;i++){
                consulta=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno,fmateria("+idUnidad+","+idCursos[0]+","+idAlumnos[i]+") as cero,fmateria("+idUnidad+","+idCursos[1]+","+idAlumnos[i]+") as uno,fmateria("+idUnidad+","+idCursos[2]+","+idAlumnos[i]+") as dos,fmateria("+idUnidad+","+idCursos[3]+","+idAlumnos[i]+") as tres,fmateria("+idUnidad+","+idCursos[4]+","+idAlumnos[i]+") as cuatro,fmateria("+idUnidad+","+idCursos[5]+","+idAlumnos[i]+") as cinco,fmateria("+idUnidad+","+idCursos[6]+","+idAlumnos[i]+") as seis,fmateria("+idUnidad+","+idCursos[7]+","+idAlumnos[i]+") as siete,fmateria("+idUnidad+","+idCursos[8]+","+idAlumnos[i]+") as ocho, fmateria("+idUnidad+","+idCursos[9]+","+idAlumnos[i]+") as nueve, fmateria("+idUnidad+","+idCursos[10]+","+idAlumnos[i]+") as diez, fmateria("+idUnidad+","+idCursos[11]+","+idAlumnos[i]+") as once, fmateria("+idUnidad+","+idCursos[12]+","+idAlumnos[i]+") as doce FROM tbAlumno a WHERE idAlumno="+idAlumnos[i]+"")
        
                const notaArray:any=Object.values(consulta);
                temp[i]={
                    alumno:notaArray[0].alumno,
                    uno:notaArray[0].cero,
                    dos:notaArray[0].uno,
                    tres:notaArray[0].dos,
                    cuatro:notaArray[0].tres,
                    cinco:notaArray[0].cuatro,
                    seis:notaArray[0].cinco,
                    siete:notaArray[0].seis,
                    ocho:notaArray[0].siete,
                    nueve:notaArray[0].ocho,
                    diez:notaArray[0].nueve,
                    once:notaArray[0].diez,
                    doce:notaArray[0].once,
                    trece:notaArray[0].doce,
                    promedio:Math.round((notaArray[0].cero+notaArray[0].uno+notaArray[0].dos+notaArray[0].tres+notaArray[0].cuatro+notaArray[0].cinco+notaArray[0].seis+notaArray[0].siete+notaArray[0].ocho+notaArray[0].nueve+notaArray[0].diez+notaArray[0].once+notaArray[0].doce)/13)
                }
               }
            break;
        case 14:
            for(let i=0;i<idAlumnos.length;i++){
                consulta=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno,fmateria("+idUnidad+","+idCursos[0]+","+idAlumnos[i]+") as cero,fmateria("+idUnidad+","+idCursos[1]+","+idAlumnos[i]+") as uno,fmateria("+idUnidad+","+idCursos[2]+","+idAlumnos[i]+") as dos,fmateria("+idUnidad+","+idCursos[3]+","+idAlumnos[i]+") as tres,fmateria("+idUnidad+","+idCursos[4]+","+idAlumnos[i]+") as cuatro,fmateria("+idUnidad+","+idCursos[5]+","+idAlumnos[i]+") as cinco,fmateria("+idUnidad+","+idCursos[6]+","+idAlumnos[i]+") as seis,fmateria("+idUnidad+","+idCursos[7]+","+idAlumnos[i]+") as siete,fmateria("+idUnidad+","+idCursos[8]+","+idAlumnos[i]+") as ocho, fmateria("+idUnidad+","+idCursos[9]+","+idAlumnos[i]+") as nueve, fmateria("+idUnidad+","+idCursos[10]+","+idAlumnos[i]+") as diez, fmateria("+idUnidad+","+idCursos[11]+","+idAlumnos[i]+") as once, fmateria("+idUnidad+","+idCursos[12]+","+idAlumnos[i]+") as doce, fmateria("+idUnidad+","+idCursos[13]+","+idAlumnos[i]+") as trece FROM tbAlumno a WHERE idAlumno="+idAlumnos[i]+"")
        
                const notaArray:any=Object.values(consulta);
                temp[i]={
                    alumno:notaArray[0].alumno,
                    uno:notaArray[0].cero,
                    dos:notaArray[0].uno,
                    tres:notaArray[0].dos,
                    cuatro:notaArray[0].tres,
                    cinco:notaArray[0].cuatro,
                    seis:notaArray[0].cinco,
                    siete:notaArray[0].seis,
                    ocho:notaArray[0].siete,
                    nueve:notaArray[0].ocho,
                    diez:notaArray[0].nueve,
                    once:notaArray[0].diez,
                    doce:notaArray[0].once,
                    trece:notaArray[0].doce,
                    catorce:notaArray[0].trece,
                    promedio:Math.round((notaArray[0].cero+notaArray[0].uno+notaArray[0].dos+notaArray[0].tres+notaArray[0].cuatro+notaArray[0].cinco+notaArray[0].seis+notaArray[0].siete+notaArray[0].ocho+notaArray[0].nueve+notaArray[0].diez+notaArray[0].once+notaArray[0].doce+notaArray[0].trece)/14)
                }
               }
            break;
        case 15:
            for(let i=0;i<idAlumnos.length;i++){
                consulta=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno,fmateria("+idUnidad+","+idCursos[0]+","+idAlumnos[i]+") as cero,fmateria("+idUnidad+","+idCursos[1]+","+idAlumnos[i]+") as uno,fmateria("+idUnidad+","+idCursos[2]+","+idAlumnos[i]+") as dos,fmateria("+idUnidad+","+idCursos[3]+","+idAlumnos[i]+") as tres,fmateria("+idUnidad+","+idCursos[4]+","+idAlumnos[i]+") as cuatro,fmateria("+idUnidad+","+idCursos[5]+","+idAlumnos[i]+") as cinco,fmateria("+idUnidad+","+idCursos[6]+","+idAlumnos[i]+") as seis,fmateria("+idUnidad+","+idCursos[7]+","+idAlumnos[i]+") as siete,fmateria("+idUnidad+","+idCursos[8]+","+idAlumnos[i]+") as ocho, fmateria("+idUnidad+","+idCursos[9]+","+idAlumnos[i]+") as nueve, fmateria("+idUnidad+","+idCursos[10]+","+idAlumnos[i]+") as diez, fmateria("+idUnidad+","+idCursos[11]+","+idAlumnos[i]+") as once, fmateria("+idUnidad+","+idCursos[12]+","+idAlumnos[i]+") as doce, fmateria("+idUnidad+","+idCursos[13]+","+idAlumnos[i]+") as trece, fmateria("+idUnidad+","+idCursos[14]+","+idAlumnos[i]+") as catorce FROM tbAlumno a WHERE idAlumno="+idAlumnos[i]+"")
        
                const notaArray:any=Object.values(consulta);
                temp[i]={
                    alumno:notaArray[0].alumno,
                    uno:notaArray[0].cero,
                    dos:notaArray[0].uno,
                    tres:notaArray[0].dos,
                    cuatro:notaArray[0].tres,
                    cinco:notaArray[0].cuatro,
                    seis:notaArray[0].cinco,
                    siete:notaArray[0].seis,
                    ocho:notaArray[0].siete,
                    nueve:notaArray[0].ocho,
                    diez:notaArray[0].nueve,
                    once:notaArray[0].diez,
                    doce:notaArray[0].once,
                    trece:notaArray[0].doce,
                    catorce:notaArray[0].trece,
                    quince:notaArray[0].catorce,
                    promedio:Math.round((notaArray[0].cero+notaArray[0].uno+notaArray[0].dos+notaArray[0].tres+notaArray[0].cuatro+notaArray[0].cinco+notaArray[0].seis+notaArray[0].siete+notaArray[0].ocho+notaArray[0].nueve+notaArray[0].diez+notaArray[0].once+notaArray[0].doce+notaArray[0].trece+notaArray[0].catorce)/15)
                }
               }
            break;
        case 16:
            for(let i=0;i<idAlumnos.length;i++){
                consulta=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno,fmateria("+idUnidad+","+idCursos[0]+","+idAlumnos[i]+") as cero,fmateria("+idUnidad+","+idCursos[1]+","+idAlumnos[i]+") as uno,fmateria("+idUnidad+","+idCursos[2]+","+idAlumnos[i]+") as dos,fmateria("+idUnidad+","+idCursos[3]+","+idAlumnos[i]+") as tres,fmateria("+idUnidad+","+idCursos[4]+","+idAlumnos[i]+") as cuatro,fmateria("+idUnidad+","+idCursos[5]+","+idAlumnos[i]+") as cinco,fmateria("+idUnidad+","+idCursos[6]+","+idAlumnos[i]+") as seis,fmateria("+idUnidad+","+idCursos[7]+","+idAlumnos[i]+") as siete,fmateria("+idUnidad+","+idCursos[8]+","+idAlumnos[i]+") as ocho, fmateria("+idUnidad+","+idCursos[9]+","+idAlumnos[i]+") as nueve, fmateria("+idUnidad+","+idCursos[10]+","+idAlumnos[i]+") as diez, fmateria("+idUnidad+","+idCursos[11]+","+idAlumnos[i]+") as once, fmateria("+idUnidad+","+idCursos[12]+","+idAlumnos[i]+") as doce, fmateria("+idUnidad+","+idCursos[13]+","+idAlumnos[i]+") as trece, fmateria("+idUnidad+","+idCursos[14]+","+idAlumnos[i]+") as catorce,fmateria("+idUnidad+","+idCursos[15]+","+idAlumnos[i]+") as quince  FROM tbAlumno a WHERE idAlumno="+idAlumnos[i]+"")
                const notaArray:any=Object.values(consulta);
                temp[i]={
                    alumno:notaArray[0].alumno,
                    uno:notaArray[0].cero,
                    dos:notaArray[0].uno,
                    tres:notaArray[0].dos,
                    cuatro:notaArray[0].tres,
                    cinco:notaArray[0].cuatro,
                    seis:notaArray[0].cinco,
                    siete:notaArray[0].seis,
                    ocho:notaArray[0].siete,
                    nueve:notaArray[0].ocho,
                    diez:notaArray[0].nueve,
                    once:notaArray[0].diez,
                    doce:notaArray[0].once,
                    trece:notaArray[0].doce,
                    catorce:notaArray[0].trece,
                    quince:notaArray[0].catorce,
                    dieciseis:notaArray[0].quince,
                    promedio:Math.round((notaArray[0].cero+notaArray[0].uno+notaArray[0].dos+notaArray[0].tres+notaArray[0].cuatro+notaArray[0].cinco+notaArray[0].seis+notaArray[0].siete+notaArray[0].ocho+notaArray[0].nueve+notaArray[0].diez+notaArray[0].once+notaArray[0].doce+notaArray[0].trece+notaArray[0].catorce+notaArray[0].quince)/16)
                }
               }
            break;
            case 17:
            for(let i=0;i<idAlumnos.length;i++){
                consulta=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno,fmateria("+idUnidad+","+idCursos[0]+","+idAlumnos[i]+") as cero,fmateria("+idUnidad+","+idCursos[1]+","+idAlumnos[i]+") as uno,fmateria("+idUnidad+","+idCursos[2]+","+idAlumnos[i]+") as dos,fmateria("+idUnidad+","+idCursos[3]+","+idAlumnos[i]+") as tres,fmateria("+idUnidad+","+idCursos[4]+","+idAlumnos[i]+") as cuatro,fmateria("+idUnidad+","+idCursos[5]+","+idAlumnos[i]+") as cinco,fmateria("+idUnidad+","+idCursos[6]+","+idAlumnos[i]+") as seis,fmateria("+idUnidad+","+idCursos[7]+","+idAlumnos[i]+") as siete,fmateria("+idUnidad+","+idCursos[8]+","+idAlumnos[i]+") as ocho, fmateria("+idUnidad+","+idCursos[9]+","+idAlumnos[i]+") as nueve, fmateria("+idUnidad+","+idCursos[10]+","+idAlumnos[i]+") as diez, fmateria("+idUnidad+","+idCursos[11]+","+idAlumnos[i]+") as once, fmateria("+idUnidad+","+idCursos[12]+","+idAlumnos[i]+") as doce, fmateria("+idUnidad+","+idCursos[13]+","+idAlumnos[i]+") as trece, fmateria("+idUnidad+","+idCursos[14]+","+idAlumnos[i]+") as catorce,fmateria("+idUnidad+","+idCursos[15]+","+idAlumnos[i]+") as quince,fmateria("+idUnidad+","+idCursos[16]+","+idAlumnos[i]+") as dieciseis  FROM tbAlumno a WHERE idAlumno="+idAlumnos[i]+"")
                const notaArray:any=Object.values(consulta);
                temp[i]={
                    alumno:notaArray[0].alumno,
                    uno:notaArray[0].cero,
                    dos:notaArray[0].uno,
                    tres:notaArray[0].dos,
                    cuatro:notaArray[0].tres,
                    cinco:notaArray[0].cuatro,
                    seis:notaArray[0].cinco,
                    siete:notaArray[0].seis,
                    ocho:notaArray[0].siete,
                    nueve:notaArray[0].ocho,
                    diez:notaArray[0].nueve,
                    once:notaArray[0].diez,
                    doce:notaArray[0].once,
                    trece:notaArray[0].doce,
                    catorce:notaArray[0].trece,
                    quince:notaArray[0].catorce,
                    dieciseis:notaArray[0].quince,
                    diecisiete:notaArray[0].dieciseis,
                    promedio:Math.round((notaArray[0].cero+notaArray[0].uno+notaArray[0].dos+notaArray[0].tres+notaArray[0].cuatro+notaArray[0].cinco+notaArray[0].seis+notaArray[0].siete+notaArray[0].ocho+notaArray[0].nueve+notaArray[0].diez+notaArray[0].once+notaArray[0].doce+notaArray[0].trece+notaArray[0].catorce+notaArray[0].quince+notaArray[0].dieciseis)/17)
                }
               }
            break;
    }
    return temp
}
const cursosGradoCuadroGuiaService=async(idGrado:string)=>{
    const cursos=await conexion.query("SELECT idCurso,abreviatura,nombre_curso FROM tbCurso WHERE idGrado=? and consolidado_bimestre=1",[idGrado]);
    return cursos
}
export{GradoCursoSeccionService,actividadesCursoGradoService,notasalumnosFinalService,alumnosGradoService,cursosGradoCuadroGuiaService,notasalumnosCursoFinalService}
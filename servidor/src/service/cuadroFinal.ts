import { Request } from "express";
import conexion from "../config/database";

const notasalumnosFinalService=async(idGrado:string)=>{
    var idCursos:any=[]
    var temp:any=[]
    var idAlumnos:any=[]
    var cantidadCursos:any=0

    //obtengo los alumnos del grado
    const dataAlumnos=await conexion.query("SELECT idAlumno FROM `tbAlumno` WHERE idGrado=? order by apellidos_alumno",[idGrado]);
    const alumnosArray:any=Object.values(dataAlumnos);
    //sacamos los ids de los alumnos
    for(let j=0;j<dataAlumnos.length;j++){
        idAlumnos[j]=alumnosArray[j].idAlumno
    }
    //obtengo los cursos del grado
    const dataCursos=await conexion.query("SELECT idCurso,abreviatura FROM tbCurso WHERE idGrado=? and consolidado_anual=1",[idGrado]);
    const cursosArray:any=Object.values(dataCursos);
    //sacamos los ids de los cursos
    for(let h=0;h<dataCursos.length;h++){
        idCursos[h]=cursosArray[h].idCurso
    }
    //cantidad cursos para promedio
    cantidadCursos=dataCursos.length


    switch(cantidadCursos){
        case 11:
            var contador=0;
            for(let i=0;i<cantidadCursos;i++){
                while(contador<dataAlumnos.length){
                    //consulta primer bimestre
                    const consulta1=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno,fmateria(1,"+idCursos[0]+",a.idAlumno) as cero, fmateria(1,"+idCursos[1]+",a.idAlumno) as uno, fmateria(1,"+idCursos[2]+",a.idAlumno) as dos, fmateria(1,"+idCursos[3]+",a.idAlumno) as tres, fmateria(1,"+idCursos[4]+",a.idAlumno) as cuatro, fmateria(1,"+idCursos[5]+",a.idAlumno) as cinco, fmateria(1,"+idCursos[6]+",a.idAlumno) as seis, fmateria(1,"+idCursos[7]+",a.idAlumno) as siete, fmateria(1,"+idCursos[8]+",a.idAlumno) as ocho, fmateria(1,"+idCursos[9]+",a.idAlumno) as nueve, fmateria(1,"+idCursos[10]+",a.idAlumno) as diez FROM tbAlumno a INNER JOIN tbCurso c WHERE a.idGrado=? and a.idAlumno=?",[idGrado,idAlumnos[contador]])
                    //consulta segundo bimestre
                    const consulta2=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno,fmateria(2,"+idCursos[0]+",a.idAlumno) as cero, fmateria(2,"+idCursos[1]+",a.idAlumno) as uno, fmateria(2,"+idCursos[2]+",a.idAlumno) as dos, fmateria(2,"+idCursos[3]+",a.idAlumno) as tres, fmateria(2,"+idCursos[4]+",a.idAlumno) as cuatro, fmateria(2,"+idCursos[5]+",a.idAlumno) as cinco, fmateria(2,"+idCursos[6]+",a.idAlumno) as seis, fmateria(2,"+idCursos[7]+",a.idAlumno) as siete, fmateria(2,"+idCursos[8]+",a.idAlumno) as ocho, fmateria(2,"+idCursos[9]+",a.idAlumno) as nueve, fmateria(2,"+idCursos[10]+",a.idAlumno) as diez FROM tbAlumno a INNER JOIN tbCurso c WHERE a.idGrado=? and a.idAlumno=?",[idGrado,idAlumnos[contador]])
                    //consulta segundo bimestre
                    const consulta3=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno,fmateria(3,"+idCursos[0]+",a.idAlumno) as cero, fmateria(3,"+idCursos[1]+",a.idAlumno) as uno, fmateria(3,"+idCursos[2]+",a.idAlumno) as dos, fmateria(3,"+idCursos[3]+",a.idAlumno) as tres, fmateria(3,"+idCursos[4]+",a.idAlumno) as cuatro, fmateria(3,"+idCursos[5]+",a.idAlumno) as cinco, fmateria(3,"+idCursos[6]+",a.idAlumno) as seis, fmateria(3,"+idCursos[7]+",a.idAlumno) as siete, fmateria(3,"+idCursos[8]+",a.idAlumno) as ocho, fmateria(3,"+idCursos[9]+",a.idAlumno) as nueve, fmateria(3,"+idCursos[10]+",a.idAlumno) as diez FROM tbAlumno a INNER JOIN tbCurso c WHERE a.idGrado=? and a.idAlumno=?",[idGrado,idAlumnos[contador]])
                    //consulta segundo bimestre
                    const consulta4=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno,fmateria(4,"+idCursos[0]+",a.idAlumno) as cero, fmateria(4,"+idCursos[1]+",a.idAlumno) as uno, fmateria(4,"+idCursos[2]+",a.idAlumno) as dos, fmateria(4,"+idCursos[3]+",a.idAlumno) as tres, fmateria(4,"+idCursos[4]+",a.idAlumno) as cuatro, fmateria(4,"+idCursos[5]+",a.idAlumno) as cinco, fmateria(4,"+idCursos[6]+",a.idAlumno) as seis, fmateria(4,"+idCursos[7]+",a.idAlumno) as siete, fmateria(4,"+idCursos[8]+",a.idAlumno) as ocho, fmateria(4,"+idCursos[9]+",a.idAlumno) as nueve, fmateria(4,"+idCursos[10]+",a.idAlumno) as diez FROM tbAlumno a INNER JOIN tbCurso c WHERE a.idGrado=? and a.idAlumno=?",[idGrado,idAlumnos[contador]])
                    //array consultas
                    const notaArray1:any=Object.values(consulta1);
                    const notaArray2:any=Object.values(consulta2);
                    const notaArray3:any=Object.values(consulta3);
                    const notaArray4:any=Object.values(consulta4);
                   //chingo de arrays
                   temp[contador]={
                    alumno:notaArray1[0].alumno,
                    uno:Math.round((notaArray1[0].cero+notaArray2[0].cero+notaArray3[0].cero+notaArray4[0].cero)/4),
                    dos:Math.round((notaArray1[1].uno+notaArray2[1].uno+notaArray3[1].uno+notaArray4[1].uno)/4),
                    tres:Math.round((notaArray1[2].dos+notaArray2[2].dos+notaArray3[2].dos+notaArray4[2].dos)/4),
                    cuatro:Math.round((notaArray1[3].tres+notaArray2[3].tres+notaArray3[3].tres+notaArray4[3].tres)/4),
                    cinco:Math.round((notaArray1[4].cuatro+notaArray2[4].cuatro+notaArray3[4].cuatro+notaArray4[4].cuatro)/4),
                    seis:Math.round((notaArray1[5].cinco+notaArray2[5].cinco+notaArray3[5].cinco+notaArray4[5].cinco)/4),
                    siete:Math.round((notaArray1[6].seis+notaArray2[6].seis+notaArray3[6].seis+notaArray4[6].seis)/4),
                    ocho:Math.round((notaArray1[7].siete+notaArray2[7].siete+notaArray3[7].siete+notaArray4[7].siete)/4),
                    nueve:Math.round((notaArray1[8].ocho+notaArray2[8].ocho+notaArray3[8].ocho+notaArray4[8].ocho)/4),
                    diez:Math.round((notaArray1[9].nueve+notaArray2[9].nueve+notaArray3[9].nueve+notaArray4[9].nueve)/4),
                    once:Math.round((notaArray1[10].diez+notaArray2[10].diez+notaArray3[10].diez+notaArray4[10].diez)/4),
                }

                    contador=contador+1;
                }
            }
        break;
        case 12:
            var contador=0;
            for(let i=0;i<cantidadCursos;i++){
                while(contador<dataAlumnos.length){
                    //consulta primer bimestre
                    const consulta1=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno,fmateria(1,"+idCursos[0]+",a.idAlumno) as cero, fmateria(1,"+idCursos[1]+",a.idAlumno) as uno, fmateria(1,"+idCursos[2]+",a.idAlumno) as dos, fmateria(1,"+idCursos[3]+",a.idAlumno) as tres, fmateria(1,"+idCursos[4]+",a.idAlumno) as cuatro, fmateria(1,"+idCursos[5]+",a.idAlumno) as cinco, fmateria(1,"+idCursos[6]+",a.idAlumno) as seis, fmateria(1,"+idCursos[7]+",a.idAlumno) as siete, fmateria(1,"+idCursos[8]+",a.idAlumno) as ocho, fmateria(1,"+idCursos[9]+",a.idAlumno) as nueve, fmateria(1,"+idCursos[10]+",a.idAlumno) as diez, fmateria(1,"+idCursos[11]+",a.idAlumno) as once FROM tbAlumno a INNER JOIN tbCurso c WHERE a.idGrado=? and a.idAlumno=?",[idGrado,idAlumnos[contador]])
                    //consulta segundo bimestre
                    const consulta2=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno,fmateria(2,"+idCursos[0]+",a.idAlumno) as cero, fmateria(2,"+idCursos[1]+",a.idAlumno) as uno, fmateria(2,"+idCursos[2]+",a.idAlumno) as dos, fmateria(2,"+idCursos[3]+",a.idAlumno) as tres, fmateria(2,"+idCursos[4]+",a.idAlumno) as cuatro, fmateria(2,"+idCursos[5]+",a.idAlumno) as cinco, fmateria(2,"+idCursos[6]+",a.idAlumno) as seis, fmateria(2,"+idCursos[7]+",a.idAlumno) as siete, fmateria(2,"+idCursos[8]+",a.idAlumno) as ocho, fmateria(2,"+idCursos[9]+",a.idAlumno) as nueve, fmateria(2,"+idCursos[10]+",a.idAlumno) as diez, fmateria(2,"+idCursos[11]+",a.idAlumno) as once FROM tbAlumno a INNER JOIN tbCurso c WHERE a.idGrado=? and a.idAlumno=?",[idGrado,idAlumnos[contador]])
                    //consulta segundo bimestre
                    const consulta3=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno,fmateria(3,"+idCursos[0]+",a.idAlumno) as cero, fmateria(3,"+idCursos[1]+",a.idAlumno) as uno, fmateria(3,"+idCursos[2]+",a.idAlumno) as dos, fmateria(3,"+idCursos[3]+",a.idAlumno) as tres, fmateria(3,"+idCursos[4]+",a.idAlumno) as cuatro, fmateria(3,"+idCursos[5]+",a.idAlumno) as cinco, fmateria(3,"+idCursos[6]+",a.idAlumno) as seis, fmateria(3,"+idCursos[7]+",a.idAlumno) as siete, fmateria(3,"+idCursos[8]+",a.idAlumno) as ocho, fmateria(3,"+idCursos[9]+",a.idAlumno) as nueve, fmateria(3,"+idCursos[10]+",a.idAlumno) as diez, fmateria(3,"+idCursos[11]+",a.idAlumno) as once FROM tbAlumno a INNER JOIN tbCurso c WHERE a.idGrado=? and a.idAlumno=?",[idGrado,idAlumnos[contador]])
                    //consulta segundo bimestre
                    const consulta4=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno,fmateria(4,"+idCursos[0]+",a.idAlumno) as cero, fmateria(4,"+idCursos[1]+",a.idAlumno) as uno, fmateria(4,"+idCursos[2]+",a.idAlumno) as dos, fmateria(4,"+idCursos[3]+",a.idAlumno) as tres, fmateria(4,"+idCursos[4]+",a.idAlumno) as cuatro, fmateria(4,"+idCursos[5]+",a.idAlumno) as cinco, fmateria(4,"+idCursos[6]+",a.idAlumno) as seis, fmateria(4,"+idCursos[7]+",a.idAlumno) as siete, fmateria(4,"+idCursos[8]+",a.idAlumno) as ocho, fmateria(4,"+idCursos[9]+",a.idAlumno) as nueve, fmateria(4,"+idCursos[10]+",a.idAlumno) as diez, fmateria(4,"+idCursos[11]+",a.idAlumno) as once FROM tbAlumno a INNER JOIN tbCurso c WHERE a.idGrado=? and a.idAlumno=?",[idGrado,idAlumnos[contador]])
                    //array consultas
                    const notaArray1:any=Object.values(consulta1);
                    const notaArray2:any=Object.values(consulta2);
                    const notaArray3:any=Object.values(consulta3);
                    const notaArray4:any=Object.values(consulta4);
                   //chingo de arrays
                   temp[contador]={
                    alumno:notaArray1[0].alumno,
                    uno:Math.round((notaArray1[0].cero+notaArray2[0].cero+notaArray3[0].cero+notaArray4[0].cero)/4),
                    dos:Math.round((notaArray1[1].uno+notaArray2[1].uno+notaArray3[1].uno+notaArray4[1].uno)/4),
                    tres:Math.round((notaArray1[2].dos+notaArray2[2].dos+notaArray3[2].dos+notaArray4[2].dos)/4),
                    cuatro:Math.round((notaArray1[3].tres+notaArray2[3].tres+notaArray3[3].tres+notaArray4[3].tres)/4),
                    cinco:Math.round((notaArray1[4].cuatro+notaArray2[4].cuatro+notaArray3[4].cuatro+notaArray4[4].cuatro)/4),
                    seis:Math.round((notaArray1[5].cinco+notaArray2[5].cinco+notaArray3[5].cinco+notaArray4[5].cinco)/4),
                    siete:Math.round((notaArray1[6].seis+notaArray2[6].seis+notaArray3[6].seis+notaArray4[6].seis)/4),
                    ocho:Math.round((notaArray1[7].siete+notaArray2[7].siete+notaArray3[7].siete+notaArray4[7].siete)/4),
                    nueve:Math.round((notaArray1[8].ocho+notaArray2[8].ocho+notaArray3[8].ocho+notaArray4[8].ocho)/4),
                    diez:Math.round((notaArray1[9].nueve+notaArray2[9].nueve+notaArray3[9].nueve+notaArray4[9].nueve)/4),
                    once:Math.round((notaArray1[10].diez+notaArray2[10].diez+notaArray3[10].diez+notaArray4[10].diez)/4),
                    doce:Math.round((notaArray1[11].once+notaArray2[11].once+notaArray3[11].once+notaArray4[11].once)/4),
                }
                    contador=contador+1;
                }
            }
        break;
        case 13:
            var contador=0;
            for(let i=0;i<cantidadCursos;i++){
                while(contador<dataAlumnos.length){
                    //consulta primer bimestre
                    var consulta1=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno,fmateria(1,"+idCursos[0]+",a.idAlumno) as cero, fmateria(1,"+idCursos[1]+",a.idAlumno) as uno, fmateria(1,"+idCursos[2]+",a.idAlumno) as dos, fmateria(1,"+idCursos[3]+",a.idAlumno) as tres, fmateria(1,"+idCursos[4]+",a.idAlumno) as cuatro, fmateria(1,"+idCursos[5]+",a.idAlumno) as cinco, fmateria(1,"+idCursos[6]+",a.idAlumno) as seis, fmateria(1,"+idCursos[7]+",a.idAlumno) as siete, fmateria(1,"+idCursos[8]+",a.idAlumno) as ocho, fmateria(1,"+idCursos[9]+",a.idAlumno) as nueve, fmateria(1,"+idCursos[10]+",a.idAlumno) as diez, fmateria(1,"+idCursos[11]+",a.idAlumno) as once, fmateria(1,"+idCursos[12]+",a.idAlumno) as doce FROM tbAlumno a INNER JOIN tbCurso c WHERE a.idGrado=? and a.idAlumno=?",[idGrado,idAlumnos[contador]])
                    //consulta segundo bimestre
                    var consulta2=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno,fmateria(2,"+idCursos[0]+",a.idAlumno) as cero, fmateria(2,"+idCursos[1]+",a.idAlumno) as uno, fmateria(2,"+idCursos[2]+",a.idAlumno) as dos, fmateria(2,"+idCursos[3]+",a.idAlumno) as tres, fmateria(2,"+idCursos[4]+",a.idAlumno) as cuatro, fmateria(2,"+idCursos[5]+",a.idAlumno) as cinco, fmateria(2,"+idCursos[6]+",a.idAlumno) as seis, fmateria(2,"+idCursos[7]+",a.idAlumno) as siete, fmateria(2,"+idCursos[8]+",a.idAlumno) as ocho, fmateria(2,"+idCursos[9]+",a.idAlumno) as nueve, fmateria(2,"+idCursos[10]+",a.idAlumno) as diez, fmateria(2,"+idCursos[11]+",a.idAlumno) as once, fmateria(2,"+idCursos[12]+",a.idAlumno) as doce FROM tbAlumno a INNER JOIN tbCurso c WHERE a.idGrado=? and a.idAlumno=?",[idGrado,idAlumnos[contador]])
                    //consulta segundo bimestre
                    var consulta3=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno,fmateria(3,"+idCursos[0]+",a.idAlumno) as cero, fmateria(3,"+idCursos[1]+",a.idAlumno) as uno, fmateria(3,"+idCursos[2]+",a.idAlumno) as dos, fmateria(3,"+idCursos[3]+",a.idAlumno) as tres, fmateria(3,"+idCursos[4]+",a.idAlumno) as cuatro, fmateria(3,"+idCursos[5]+",a.idAlumno) as cinco, fmateria(3,"+idCursos[6]+",a.idAlumno) as seis, fmateria(3,"+idCursos[7]+",a.idAlumno) as siete, fmateria(3,"+idCursos[8]+",a.idAlumno) as ocho, fmateria(3,"+idCursos[9]+",a.idAlumno) as nueve, fmateria(3,"+idCursos[10]+",a.idAlumno) as diez, fmateria(3,"+idCursos[11]+",a.idAlumno) as once, fmateria(3,"+idCursos[12]+",a.idAlumno) as doce FROM tbAlumno a INNER JOIN tbCurso c WHERE a.idGrado=? and a.idAlumno=?",[idGrado,idAlumnos[contador]])
                    //consulta segundo bimestre
                    var consulta4=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno,fmateria(4,"+idCursos[0]+",a.idAlumno) as cero, fmateria(4,"+idCursos[1]+",a.idAlumno) as uno, fmateria(4,"+idCursos[2]+",a.idAlumno) as dos, fmateria(4,"+idCursos[3]+",a.idAlumno) as tres, fmateria(4,"+idCursos[4]+",a.idAlumno) as cuatro, fmateria(4,"+idCursos[5]+",a.idAlumno) as cinco, fmateria(4,"+idCursos[6]+",a.idAlumno) as seis, fmateria(4,"+idCursos[7]+",a.idAlumno) as siete, fmateria(4,"+idCursos[8]+",a.idAlumno) as ocho, fmateria(4,"+idCursos[9]+",a.idAlumno) as nueve, fmateria(4,"+idCursos[10]+",a.idAlumno) as diez, fmateria(4,"+idCursos[11]+",a.idAlumno) as once, fmateria(4,"+idCursos[12]+",a.idAlumno) as doce FROM tbAlumno a INNER JOIN tbCurso c WHERE a.idGrado=? and a.idAlumno=?",[idGrado,idAlumnos[contador]])
                    //array consultas
                    const notaArray1:any=Object.values(consulta1);
                    const notaArray2:any=Object.values(consulta2);
                    const notaArray3:any=Object.values(consulta3);
                    const notaArray4:any=Object.values(consulta4);
                   //chingo de arrays
                   temp[contador]={
                    alumno:notaArray1[0].alumno,
                    uno:Math.round((notaArray1[0].cero+notaArray2[0].cero+notaArray3[0].cero+notaArray4[0].cero)/4),
                    dos:Math.round((notaArray1[1].uno+notaArray2[1].uno+notaArray3[1].uno+notaArray4[1].uno)/4),
                    tres:Math.round((notaArray1[2].dos+notaArray2[2].dos+notaArray3[2].dos+notaArray4[2].dos)/4),
                    cuatro:Math.round((notaArray1[3].tres+notaArray2[3].tres+notaArray3[3].tres+notaArray4[3].tres)/4),
                    cinco:Math.round((notaArray1[4].cuatro+notaArray2[4].cuatro+notaArray3[4].cuatro+notaArray4[4].cuatro)/4),
                    seis:Math.round((notaArray1[5].cinco+notaArray2[5].cinco+notaArray3[5].cinco+notaArray4[5].cinco)/4),
                    siete:Math.round((notaArray1[6].seis+notaArray2[6].seis+notaArray3[6].seis+notaArray4[6].seis)/4),
                    ocho:Math.round((notaArray1[7].siete+notaArray2[7].siete+notaArray3[7].siete+notaArray4[7].siete)/4),
                    nueve:Math.round((notaArray1[8].ocho+notaArray2[8].ocho+notaArray3[8].ocho+notaArray4[8].ocho)/4),
                    diez:Math.round((notaArray1[9].nueve+notaArray2[9].nueve+notaArray3[9].nueve+notaArray4[9].nueve)/4),
                    once:Math.round((notaArray1[10].diez+notaArray2[10].diez+notaArray3[10].diez+notaArray4[10].diez)/4),
                    doce:Math.round((notaArray1[11].once+notaArray2[11].once+notaArray3[11].once+notaArray4[11].once)/4),
                    trece:Math.round((notaArray1[12].doce+notaArray2[12].doce+notaArray3[12].doce+notaArray4[12].doce)/4),
                    
                }
                    contador=contador+1;
                }
            }
        break;
        case 14:
            var contador=0;
            for(let i=0;i<cantidadCursos;i++){
                while(contador<dataAlumnos.length){
                    //consulta primer bimestre
                    var consulta1=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno,fmateria(1,"+idCursos[0]+",a.idAlumno) as cero, fmateria(1,"+idCursos[1]+",a.idAlumno) as uno, fmateria(1,"+idCursos[2]+",a.idAlumno) as dos, fmateria(1,"+idCursos[3]+",a.idAlumno) as tres, fmateria(1,"+idCursos[4]+",a.idAlumno) as cuatro, fmateria(1,"+idCursos[5]+",a.idAlumno) as cinco, fmateria(1,"+idCursos[6]+",a.idAlumno) as seis, fmateria(1,"+idCursos[7]+",a.idAlumno) as siete, fmateria(1,"+idCursos[8]+",a.idAlumno) as ocho, fmateria(1,"+idCursos[9]+",a.idAlumno) as nueve, fmateria(1,"+idCursos[10]+",a.idAlumno) as diez, fmateria(1,"+idCursos[11]+",a.idAlumno) as once, fmateria(1,"+idCursos[12]+",a.idAlumno) as doce,fmateria(1,"+idCursos[13]+",a.idAlumno) as trece FROM tbAlumno a INNER JOIN tbCurso c WHERE a.idGrado=? and a.idAlumno=?",[idGrado,idAlumnos[contador]])
                    //consulta segundo bimestre
                    var consulta2=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno,fmateria(2,"+idCursos[0]+",a.idAlumno) as cero, fmateria(2,"+idCursos[1]+",a.idAlumno) as uno, fmateria(2,"+idCursos[2]+",a.idAlumno) as dos, fmateria(2,"+idCursos[3]+",a.idAlumno) as tres, fmateria(2,"+idCursos[4]+",a.idAlumno) as cuatro, fmateria(2,"+idCursos[5]+",a.idAlumno) as cinco, fmateria(2,"+idCursos[6]+",a.idAlumno) as seis, fmateria(2,"+idCursos[7]+",a.idAlumno) as siete, fmateria(2,"+idCursos[8]+",a.idAlumno) as ocho, fmateria(2,"+idCursos[9]+",a.idAlumno) as nueve, fmateria(2,"+idCursos[10]+",a.idAlumno) as diez, fmateria(2,"+idCursos[11]+",a.idAlumno) as once, fmateria(2,"+idCursos[12]+",a.idAlumno) as doce,fmateria(2,"+idCursos[13]+",a.idAlumno) as trece FROM tbAlumno a INNER JOIN tbCurso c WHERE a.idGrado=? and a.idAlumno=?",[idGrado,idAlumnos[contador]])
                    //consulta segundo bimestre
                    var consulta3=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno,fmateria(3,"+idCursos[0]+",a.idAlumno) as cero, fmateria(3,"+idCursos[1]+",a.idAlumno) as uno, fmateria(3,"+idCursos[2]+",a.idAlumno) as dos, fmateria(3,"+idCursos[3]+",a.idAlumno) as tres, fmateria(3,"+idCursos[4]+",a.idAlumno) as cuatro, fmateria(3,"+idCursos[5]+",a.idAlumno) as cinco, fmateria(3,"+idCursos[6]+",a.idAlumno) as seis, fmateria(3,"+idCursos[7]+",a.idAlumno) as siete, fmateria(3,"+idCursos[8]+",a.idAlumno) as ocho, fmateria(3,"+idCursos[9]+",a.idAlumno) as nueve, fmateria(3,"+idCursos[10]+",a.idAlumno) as diez, fmateria(3,"+idCursos[11]+",a.idAlumno) as once, fmateria(3,"+idCursos[12]+",a.idAlumno) as doce,fmateria(3,"+idCursos[13]+",a.idAlumno) as trece FROM tbAlumno a INNER JOIN tbCurso c WHERE a.idGrado=? and a.idAlumno=?",[idGrado,idAlumnos[contador]])
                    //consulta segundo bimestre
                    var consulta4=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno,fmateria(4,"+idCursos[0]+",a.idAlumno) as cero, fmateria(4,"+idCursos[1]+",a.idAlumno) as uno, fmateria(4,"+idCursos[2]+",a.idAlumno) as dos, fmateria(4,"+idCursos[3]+",a.idAlumno) as tres, fmateria(4,"+idCursos[4]+",a.idAlumno) as cuatro, fmateria(4,"+idCursos[5]+",a.idAlumno) as cinco, fmateria(4,"+idCursos[6]+",a.idAlumno) as seis, fmateria(4,"+idCursos[7]+",a.idAlumno) as siete, fmateria(4,"+idCursos[8]+",a.idAlumno) as ocho, fmateria(4,"+idCursos[9]+",a.idAlumno) as nueve, fmateria(4,"+idCursos[10]+",a.idAlumno) as diez, fmateria(4,"+idCursos[11]+",a.idAlumno) as once, fmateria(4,"+idCursos[12]+",a.idAlumno) as doce,fmateria(4,"+idCursos[13]+",a.idAlumno) as trece FROM tbAlumno a INNER JOIN tbCurso c WHERE a.idGrado=? and a.idAlumno=?",[idGrado,idAlumnos[contador]])
                    //array consultas
                    const notaArray1:any=Object.values(consulta1);
                    const notaArray2:any=Object.values(consulta2);
                    const notaArray3:any=Object.values(consulta3);
                    const notaArray4:any=Object.values(consulta4);
                   //chingo de arrays
                   temp[contador]={
                    alumno:notaArray1[0].alumno,
                    uno:Math.round((notaArray1[0].cero+notaArray2[0].cero+notaArray3[0].cero+notaArray4[0].cero)/4),
                    dos:Math.round((notaArray1[1].uno+notaArray2[1].uno+notaArray3[1].uno+notaArray4[1].uno)/4),
                    tres:Math.round((notaArray1[2].dos+notaArray2[2].dos+notaArray3[2].dos+notaArray4[2].dos)/4),
                    cuatro:Math.round((notaArray1[3].tres+notaArray2[3].tres+notaArray3[3].tres+notaArray4[3].tres)/4),
                    cinco:Math.round((notaArray1[4].cuatro+notaArray2[4].cuatro+notaArray3[4].cuatro+notaArray4[4].cuatro)/4),
                    seis:Math.round((notaArray1[5].cinco+notaArray2[5].cinco+notaArray3[5].cinco+notaArray4[5].cinco)/4),
                    siete:Math.round((notaArray1[6].seis+notaArray2[6].seis+notaArray3[6].seis+notaArray4[6].seis)/4),
                    ocho:Math.round((notaArray1[7].siete+notaArray2[7].siete+notaArray3[7].siete+notaArray4[7].siete)/4),
                    nueve:Math.round((notaArray1[8].ocho+notaArray2[8].ocho+notaArray3[8].ocho+notaArray4[8].ocho)/4),
                    diez:Math.round((notaArray1[9].nueve+notaArray2[9].nueve+notaArray3[9].nueve+notaArray4[9].nueve)/4),
                    once:Math.round((notaArray1[10].diez+notaArray2[10].diez+notaArray3[10].diez+notaArray4[10].diez)/4),
                    doce:Math.round((notaArray1[11].once+notaArray2[11].once+notaArray3[11].once+notaArray4[11].once)/4),
                    trece:Math.round((notaArray1[12].doce+notaArray2[12].doce+notaArray3[12].doce+notaArray4[12].doce)/4),
                    catorce:Math.round((notaArray1[13].trece+notaArray2[13].trece+notaArray3[13].trece+notaArray4[13].trece)/4),
                }
                    contador=contador+1;
                }
            }
        break;
        case 15:
            var contador=0;
            for(let i=0;i<cantidadCursos;i++){
                while(contador<dataAlumnos.length){
                    //consulta primer bimestre
                    var consulta1=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno,fmateria(1,"+idCursos[0]+",a.idAlumno) as cero, fmateria(1,"+idCursos[1]+",a.idAlumno) as uno, fmateria(1,"+idCursos[2]+",a.idAlumno) as dos, fmateria(1,"+idCursos[3]+",a.idAlumno) as tres, fmateria(1,"+idCursos[4]+",a.idAlumno) as cuatro, fmateria(1,"+idCursos[5]+",a.idAlumno) as cinco, fmateria(1,"+idCursos[6]+",a.idAlumno) as seis, fmateria(1,"+idCursos[7]+",a.idAlumno) as siete, fmateria(1,"+idCursos[8]+",a.idAlumno) as ocho, fmateria(1,"+idCursos[9]+",a.idAlumno) as nueve, fmateria(1,"+idCursos[10]+",a.idAlumno) as diez, fmateria(1,"+idCursos[11]+",a.idAlumno) as once, fmateria(1,"+idCursos[12]+",a.idAlumno) as doce,fmateria(1,"+idCursos[13]+",a.idAlumno) as trece,fmateria(1,"+idCursos[14]+",a.idAlumno) as catorce FROM tbAlumno a INNER JOIN tbCurso c WHERE a.idGrado=? and a.idAlumno=?",[idGrado,idAlumnos[contador]])
                    //consulta segundo bimestre
                    var consulta2=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno,fmateria(2,"+idCursos[0]+",a.idAlumno) as cero, fmateria(2,"+idCursos[1]+",a.idAlumno) as uno, fmateria(2,"+idCursos[2]+",a.idAlumno) as dos, fmateria(2,"+idCursos[3]+",a.idAlumno) as tres, fmateria(2,"+idCursos[4]+",a.idAlumno) as cuatro, fmateria(2,"+idCursos[5]+",a.idAlumno) as cinco, fmateria(2,"+idCursos[6]+",a.idAlumno) as seis, fmateria(2,"+idCursos[7]+",a.idAlumno) as siete, fmateria(2,"+idCursos[8]+",a.idAlumno) as ocho, fmateria(2,"+idCursos[9]+",a.idAlumno) as nueve, fmateria(2,"+idCursos[10]+",a.idAlumno) as diez, fmateria(2,"+idCursos[11]+",a.idAlumno) as once, fmateria(2,"+idCursos[12]+",a.idAlumno) as doce,fmateria(2,"+idCursos[13]+",a.idAlumno) as trece,fmateria(2,"+idCursos[14]+",a.idAlumno) as catorce FROM tbAlumno a INNER JOIN tbCurso c WHERE a.idGrado=? and a.idAlumno=?",[idGrado,idAlumnos[contador]])
                    //consulta segundo bimestre
                    var consulta3=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno,fmateria(3,"+idCursos[0]+",a.idAlumno) as cero, fmateria(3,"+idCursos[1]+",a.idAlumno) as uno, fmateria(3,"+idCursos[2]+",a.idAlumno) as dos, fmateria(3,"+idCursos[3]+",a.idAlumno) as tres, fmateria(3,"+idCursos[4]+",a.idAlumno) as cuatro, fmateria(3,"+idCursos[5]+",a.idAlumno) as cinco, fmateria(3,"+idCursos[6]+",a.idAlumno) as seis, fmateria(3,"+idCursos[7]+",a.idAlumno) as siete, fmateria(3,"+idCursos[8]+",a.idAlumno) as ocho, fmateria(3,"+idCursos[9]+",a.idAlumno) as nueve, fmateria(3,"+idCursos[10]+",a.idAlumno) as diez, fmateria(3,"+idCursos[11]+",a.idAlumno) as once, fmateria(3,"+idCursos[12]+",a.idAlumno) as doce,fmateria(3,"+idCursos[13]+",a.idAlumno) as trece,fmateria(3,"+idCursos[14]+",a.idAlumno) as catorce FROM tbAlumno a INNER JOIN tbCurso c WHERE a.idGrado=? and a.idAlumno=?",[idGrado,idAlumnos[contador]])
                    //consulta segundo bimestre
                    var consulta4=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno,fmateria(4,"+idCursos[0]+",a.idAlumno) as cero, fmateria(4,"+idCursos[1]+",a.idAlumno) as uno, fmateria(4,"+idCursos[2]+",a.idAlumno) as dos, fmateria(4,"+idCursos[3]+",a.idAlumno) as tres, fmateria(4,"+idCursos[4]+",a.idAlumno) as cuatro, fmateria(4,"+idCursos[5]+",a.idAlumno) as cinco, fmateria(4,"+idCursos[6]+",a.idAlumno) as seis, fmateria(4,"+idCursos[7]+",a.idAlumno) as siete, fmateria(4,"+idCursos[8]+",a.idAlumno) as ocho, fmateria(4,"+idCursos[9]+",a.idAlumno) as nueve, fmateria(4,"+idCursos[10]+",a.idAlumno) as diez, fmateria(4,"+idCursos[11]+",a.idAlumno) as once, fmateria(4,"+idCursos[12]+",a.idAlumno) as doce,fmateria(4,"+idCursos[13]+",a.idAlumno) as trece,,fmateria(4,"+idCursos[14]+",a.idAlumno) as catorce FROM tbAlumno a INNER JOIN tbCurso c WHERE a.idGrado=? and a.idAlumno=?",[idGrado,idAlumnos[contador]])
                    //array consultas
                    const notaArray1:any=Object.values(consulta1);
                    const notaArray2:any=Object.values(consulta2);
                    const notaArray3:any=Object.values(consulta3);
                    const notaArray4:any=Object.values(consulta4);
                   //chingo de arrays
                   temp[contador]={
                    alumno:notaArray1[0].alumno,
                    uno:Math.round((notaArray1[0].cero+notaArray2[0].cero+notaArray3[0].cero+notaArray4[0].cero)/4),
                    dos:Math.round((notaArray1[1].uno+notaArray2[1].uno+notaArray3[1].uno+notaArray4[1].uno)/4),
                    tres:Math.round((notaArray1[2].dos+notaArray2[2].dos+notaArray3[2].dos+notaArray4[2].dos)/4),
                    cuatro:Math.round((notaArray1[3].tres+notaArray2[3].tres+notaArray3[3].tres+notaArray4[3].tres)/4),
                    cinco:Math.round((notaArray1[4].cuatro+notaArray2[4].cuatro+notaArray3[4].cuatro+notaArray4[4].cuatro)/4),
                    seis:Math.round((notaArray1[5].cinco+notaArray2[5].cinco+notaArray3[5].cinco+notaArray4[5].cinco)/4),
                    siete:Math.round((notaArray1[6].seis+notaArray2[6].seis+notaArray3[6].seis+notaArray4[6].seis)/4),
                    ocho:Math.round((notaArray1[7].siete+notaArray2[7].siete+notaArray3[7].siete+notaArray4[7].siete)/4),
                    nueve:Math.round((notaArray1[8].ocho+notaArray2[8].ocho+notaArray3[8].ocho+notaArray4[8].ocho)/4),
                    diez:Math.round((notaArray1[9].nueve+notaArray2[9].nueve+notaArray3[9].nueve+notaArray4[9].nueve)/4),
                    once:Math.round((notaArray1[10].diez+notaArray2[10].diez+notaArray3[10].diez+notaArray4[10].diez)/4),
                    doce:Math.round((notaArray1[11].once+notaArray2[11].once+notaArray3[11].once+notaArray4[11].once)/4),
                    trece:Math.round((notaArray1[12].doce+notaArray2[12].doce+notaArray3[12].doce+notaArray4[12].doce)/4),
                    catorce:Math.round((notaArray1[13].trece+notaArray2[13].trece+notaArray3[13].trece+notaArray4[13].trece)/4),
                    quince:Math.round((notaArray1[14].catorce+notaArray2[14].catorce+notaArray3[14].catorce+notaArray4[14].catorce)/4),
                }
                    contador=contador+1;
                }
            }
        break;
        case 16:
            var contador=0;
            for(let i=0;i<cantidadCursos;i++){
                while(contador<dataAlumnos.length){
                    //consulta primer bimestre
                    var consulta1=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno,fmateria(1,"+idCursos[0]+",a.idAlumno) as cero, fmateria(1,"+idCursos[1]+",a.idAlumno) as uno, fmateria(1,"+idCursos[2]+",a.idAlumno) as dos, fmateria(1,"+idCursos[3]+",a.idAlumno) as tres, fmateria(1,"+idCursos[4]+",a.idAlumno) as cuatro, fmateria(1,"+idCursos[5]+",a.idAlumno) as cinco, fmateria(1,"+idCursos[6]+",a.idAlumno) as seis, fmateria(1,"+idCursos[7]+",a.idAlumno) as siete, fmateria(1,"+idCursos[8]+",a.idAlumno) as ocho, fmateria(1,"+idCursos[9]+",a.idAlumno) as nueve, fmateria(1,"+idCursos[10]+",a.idAlumno) as diez, fmateria(1,"+idCursos[11]+",a.idAlumno) as once, fmateria(1,"+idCursos[12]+",a.idAlumno) as doce,fmateria(1,"+idCursos[13]+",a.idAlumno) as trece,fmateria(1,"+idCursos[14]+",a.idAlumno) as catorce,fmateria(1,"+idCursos[15]+",a.idAlumno) as quince FROM tbAlumno a INNER JOIN tbCurso c WHERE a.idGrado=? and a.idAlumno=?",[idGrado,idAlumnos[contador]])
                    //consulta segundo bimestre
                    var consulta2=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno,fmateria(2,"+idCursos[0]+",a.idAlumno) as cero, fmateria(2,"+idCursos[1]+",a.idAlumno) as uno, fmateria(2,"+idCursos[2]+",a.idAlumno) as dos, fmateria(2,"+idCursos[3]+",a.idAlumno) as tres, fmateria(2,"+idCursos[4]+",a.idAlumno) as cuatro, fmateria(2,"+idCursos[5]+",a.idAlumno) as cinco, fmateria(2,"+idCursos[6]+",a.idAlumno) as seis, fmateria(2,"+idCursos[7]+",a.idAlumno) as siete, fmateria(2,"+idCursos[8]+",a.idAlumno) as ocho, fmateria(2,"+idCursos[9]+",a.idAlumno) as nueve, fmateria(2,"+idCursos[10]+",a.idAlumno) as diez, fmateria(2,"+idCursos[11]+",a.idAlumno) as once, fmateria(2,"+idCursos[12]+",a.idAlumno) as doce,fmateria(2,"+idCursos[13]+",a.idAlumno) as trece,fmateria(2,"+idCursos[14]+",a.idAlumno) as catorce,fmateria(2,"+idCursos[15]+",a.idAlumno) as quince FROM tbAlumno a INNER JOIN tbCurso c WHERE a.idGrado=? and a.idAlumno=?",[idGrado,idAlumnos[contador]])
                    //consulta segundo bimestre
                    var consulta3=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno,fmateria(3,"+idCursos[0]+",a.idAlumno) as cero, fmateria(3,"+idCursos[1]+",a.idAlumno) as uno, fmateria(3,"+idCursos[2]+",a.idAlumno) as dos, fmateria(3,"+idCursos[3]+",a.idAlumno) as tres, fmateria(3,"+idCursos[4]+",a.idAlumno) as cuatro, fmateria(3,"+idCursos[5]+",a.idAlumno) as cinco, fmateria(3,"+idCursos[6]+",a.idAlumno) as seis, fmateria(3,"+idCursos[7]+",a.idAlumno) as siete, fmateria(3,"+idCursos[8]+",a.idAlumno) as ocho, fmateria(3,"+idCursos[9]+",a.idAlumno) as nueve, fmateria(3,"+idCursos[10]+",a.idAlumno) as diez, fmateria(3,"+idCursos[11]+",a.idAlumno) as once, fmateria(3,"+idCursos[12]+",a.idAlumno) as doce,fmateria(3,"+idCursos[13]+",a.idAlumno) as trece,fmateria(3,"+idCursos[14]+",a.idAlumno) as catorce,fmateria(3,"+idCursos[15]+",a.idAlumno) as quince FROM tbAlumno a INNER JOIN tbCurso c WHERE a.idGrado=? and a.idAlumno=?",[idGrado,idAlumnos[contador]])
                    //consulta segundo bimestre
                    var consulta4=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno,fmateria(4,"+idCursos[0]+",a.idAlumno) as cero, fmateria(4,"+idCursos[1]+",a.idAlumno) as uno, fmateria(4,"+idCursos[2]+",a.idAlumno) as dos, fmateria(4,"+idCursos[3]+",a.idAlumno) as tres, fmateria(4,"+idCursos[4]+",a.idAlumno) as cuatro, fmateria(4,"+idCursos[5]+",a.idAlumno) as cinco, fmateria(4,"+idCursos[6]+",a.idAlumno) as seis, fmateria(4,"+idCursos[7]+",a.idAlumno) as siete, fmateria(4,"+idCursos[8]+",a.idAlumno) as ocho, fmateria(4,"+idCursos[9]+",a.idAlumno) as nueve, fmateria(4,"+idCursos[10]+",a.idAlumno) as diez, fmateria(4,"+idCursos[11]+",a.idAlumno) as once, fmateria(4,"+idCursos[12]+",a.idAlumno) as doce,fmateria(4,"+idCursos[13]+",a.idAlumno) as trece,,fmateria(4,"+idCursos[14]+",a.idAlumno) as catorce,fmateria(4,"+idCursos[15]+",a.idAlumno) as quince FROM tbAlumno a INNER JOIN tbCurso c WHERE a.idGrado=? and a.idAlumno=?",[idGrado,idAlumnos[contador]])
                    //array consultas
                    const notaArray1:any=Object.values(consulta1);
                    const notaArray2:any=Object.values(consulta2);
                    const notaArray3:any=Object.values(consulta3);
                    const notaArray4:any=Object.values(consulta4);
                   //chingo de arrays
                   temp[contador]={
                    alumno:notaArray1[0].alumno,
                    uno:Math.round((notaArray1[0].cero+notaArray2[0].cero+notaArray3[0].cero+notaArray4[0].cero)/4),
                    dos:Math.round((notaArray1[1].uno+notaArray2[1].uno+notaArray3[1].uno+notaArray4[1].uno)/4),
                    tres:Math.round((notaArray1[2].dos+notaArray2[2].dos+notaArray3[2].dos+notaArray4[2].dos)/4),
                    cuatro:Math.round((notaArray1[3].tres+notaArray2[3].tres+notaArray3[3].tres+notaArray4[3].tres)/4),
                    cinco:Math.round((notaArray1[4].cuatro+notaArray2[4].cuatro+notaArray3[4].cuatro+notaArray4[4].cuatro)/4),
                    seis:Math.round((notaArray1[5].cinco+notaArray2[5].cinco+notaArray3[5].cinco+notaArray4[5].cinco)/4),
                    siete:Math.round((notaArray1[6].seis+notaArray2[6].seis+notaArray3[6].seis+notaArray4[6].seis)/4),
                    ocho:Math.round((notaArray1[7].siete+notaArray2[7].siete+notaArray3[7].siete+notaArray4[7].siete)/4),
                    nueve:Math.round((notaArray1[8].ocho+notaArray2[8].ocho+notaArray3[8].ocho+notaArray4[8].ocho)/4),
                    diez:Math.round((notaArray1[9].nueve+notaArray2[9].nueve+notaArray3[9].nueve+notaArray4[9].nueve)/4),
                    once:Math.round((notaArray1[10].diez+notaArray2[10].diez+notaArray3[10].diez+notaArray4[10].diez)/4),
                    doce:Math.round((notaArray1[11].once+notaArray2[11].once+notaArray3[11].once+notaArray4[11].once)/4),
                    trece:Math.round((notaArray1[12].doce+notaArray2[12].doce+notaArray3[12].doce+notaArray4[12].doce)/4),
                    catorce:Math.round((notaArray1[13].trece+notaArray2[13].trece+notaArray3[13].trece+notaArray4[13].trece)/4),
                    quince:Math.round((notaArray1[14].catorce+notaArray2[14].catorce+notaArray3[14].catorce+notaArray4[14].catorce)/4),
                    dieciseis:Math.round((notaArray1[15].quince+notaArray2[15].quince+notaArray3[15].quince+notaArray4[15].quince)/4),
                }
                    contador=contador+1;
                }
            }
        break;
        case 17:
            var contador=0;
            for(let i=0;i<cantidadCursos;i++){
                while(contador<dataAlumnos.length){
                    //consulta primer bimestre
                    var consulta1=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno,fmateria(1,"+idCursos[0]+",a.idAlumno) as cero, fmateria(1,"+idCursos[1]+",a.idAlumno) as uno, fmateria(1,"+idCursos[2]+",a.idAlumno) as dos, fmateria(1,"+idCursos[3]+",a.idAlumno) as tres, fmateria(1,"+idCursos[4]+",a.idAlumno) as cuatro, fmateria(1,"+idCursos[5]+",a.idAlumno) as cinco, fmateria(1,"+idCursos[6]+",a.idAlumno) as seis, fmateria(1,"+idCursos[7]+",a.idAlumno) as siete, fmateria(1,"+idCursos[8]+",a.idAlumno) as ocho, fmateria(1,"+idCursos[9]+",a.idAlumno) as nueve, fmateria(1,"+idCursos[10]+",a.idAlumno) as diez, fmateria(1,"+idCursos[11]+",a.idAlumno) as once, fmateria(1,"+idCursos[12]+",a.idAlumno) as doce,fmateria(1,"+idCursos[13]+",a.idAlumno) as trece,fmateria(1,"+idCursos[14]+",a.idAlumno) as catorce,fmateria(1,"+idCursos[15]+",a.idAlumno) as quince,fmateria(1,"+idCursos[16]+",a.idAlumno) as dieciseis FROM tbAlumno a INNER JOIN tbCurso c WHERE a.idGrado=? and a.idAlumno=?",[idGrado,idAlumnos[contador]])
                    //consulta segundo bimestre
                    var consulta2=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno,fmateria(2,"+idCursos[0]+",a.idAlumno) as cero, fmateria(2,"+idCursos[1]+",a.idAlumno) as uno, fmateria(2,"+idCursos[2]+",a.idAlumno) as dos, fmateria(2,"+idCursos[3]+",a.idAlumno) as tres, fmateria(2,"+idCursos[4]+",a.idAlumno) as cuatro, fmateria(2,"+idCursos[5]+",a.idAlumno) as cinco, fmateria(2,"+idCursos[6]+",a.idAlumno) as seis, fmateria(2,"+idCursos[7]+",a.idAlumno) as siete, fmateria(2,"+idCursos[8]+",a.idAlumno) as ocho, fmateria(2,"+idCursos[9]+",a.idAlumno) as nueve, fmateria(2,"+idCursos[10]+",a.idAlumno) as diez, fmateria(2,"+idCursos[11]+",a.idAlumno) as once, fmateria(2,"+idCursos[12]+",a.idAlumno) as doce,fmateria(2,"+idCursos[13]+",a.idAlumno) as trece,fmateria(2,"+idCursos[14]+",a.idAlumno) as catorce,fmateria(2,"+idCursos[15]+",a.idAlumno) as quince,fmateria(2,"+idCursos[16]+",a.idAlumno) as dieciseis FROM tbAlumno a INNER JOIN tbCurso c WHERE a.idGrado=? and a.idAlumno=?",[idGrado,idAlumnos[contador]])
                    //consulta segundo bimestre
                    var consulta3=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno,fmateria(3,"+idCursos[0]+",a.idAlumno) as cero, fmateria(3,"+idCursos[1]+",a.idAlumno) as uno, fmateria(3,"+idCursos[2]+",a.idAlumno) as dos, fmateria(3,"+idCursos[3]+",a.idAlumno) as tres, fmateria(3,"+idCursos[4]+",a.idAlumno) as cuatro, fmateria(3,"+idCursos[5]+",a.idAlumno) as cinco, fmateria(3,"+idCursos[6]+",a.idAlumno) as seis, fmateria(3,"+idCursos[7]+",a.idAlumno) as siete, fmateria(3,"+idCursos[8]+",a.idAlumno) as ocho, fmateria(3,"+idCursos[9]+",a.idAlumno) as nueve, fmateria(3,"+idCursos[10]+",a.idAlumno) as diez, fmateria(3,"+idCursos[11]+",a.idAlumno) as once, fmateria(3,"+idCursos[12]+",a.idAlumno) as doce,fmateria(3,"+idCursos[13]+",a.idAlumno) as trece,fmateria(3,"+idCursos[14]+",a.idAlumno) as catorce,fmateria(3,"+idCursos[15]+",a.idAlumno) as quince,fmateria(3,"+idCursos[16]+",a.idAlumno) as dieciseis FROM tbAlumno a INNER JOIN tbCurso c WHERE a.idGrado=? and a.idAlumno=?",[idGrado,idAlumnos[contador]])
                    //consulta segundo bimestre
                    var consulta4=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno,fmateria(4,"+idCursos[0]+",a.idAlumno) as cero, fmateria(4,"+idCursos[1]+",a.idAlumno) as uno, fmateria(4,"+idCursos[2]+",a.idAlumno) as dos, fmateria(4,"+idCursos[3]+",a.idAlumno) as tres, fmateria(4,"+idCursos[4]+",a.idAlumno) as cuatro, fmateria(4,"+idCursos[5]+",a.idAlumno) as cinco, fmateria(4,"+idCursos[6]+",a.idAlumno) as seis, fmateria(4,"+idCursos[7]+",a.idAlumno) as siete, fmateria(4,"+idCursos[8]+",a.idAlumno) as ocho, fmateria(4,"+idCursos[9]+",a.idAlumno) as nueve, fmateria(4,"+idCursos[10]+",a.idAlumno) as diez, fmateria(4,"+idCursos[11]+",a.idAlumno) as once, fmateria(4,"+idCursos[12]+",a.idAlumno) as doce,fmateria(4,"+idCursos[13]+",a.idAlumno) as trece,,fmateria(4,"+idCursos[14]+",a.idAlumno) as catorce,fmateria(4,"+idCursos[15]+",a.idAlumno) as quince,fmateria(4,"+idCursos[16]+",a.idAlumno) as dieciseis FROM tbAlumno a INNER JOIN tbCurso c WHERE a.idGrado=? and a.idAlumno=?",[idGrado,idAlumnos[contador]])
                    //array consultas
                    const notaArray1:any=Object.values(consulta1);
                    const notaArray2:any=Object.values(consulta2);
                    const notaArray3:any=Object.values(consulta3);
                    const notaArray4:any=Object.values(consulta4);
                   //chingo de arrays
                   temp[contador]={
                    alumno:notaArray1[0].alumno,
                    uno:Math.round((notaArray1[0].cero+notaArray2[0].cero+notaArray3[0].cero+notaArray4[0].cero)/4),
                    dos:Math.round((notaArray1[1].uno+notaArray2[1].uno+notaArray3[1].uno+notaArray4[1].uno)/4),
                    tres:Math.round((notaArray1[2].dos+notaArray2[2].dos+notaArray3[2].dos+notaArray4[2].dos)/4),
                    cuatro:Math.round((notaArray1[3].tres+notaArray2[3].tres+notaArray3[3].tres+notaArray4[3].tres)/4),
                    cinco:Math.round((notaArray1[4].cuatro+notaArray2[4].cuatro+notaArray3[4].cuatro+notaArray4[4].cuatro)/4),
                    seis:Math.round((notaArray1[5].cinco+notaArray2[5].cinco+notaArray3[5].cinco+notaArray4[5].cinco)/4),
                    siete:Math.round((notaArray1[6].seis+notaArray2[6].seis+notaArray3[6].seis+notaArray4[6].seis)/4),
                    ocho:Math.round((notaArray1[7].siete+notaArray2[7].siete+notaArray3[7].siete+notaArray4[7].siete)/4),
                    nueve:Math.round((notaArray1[8].ocho+notaArray2[8].ocho+notaArray3[8].ocho+notaArray4[8].ocho)/4),
                    diez:Math.round((notaArray1[9].nueve+notaArray2[9].nueve+notaArray3[9].nueve+notaArray4[9].nueve)/4),
                    once:Math.round((notaArray1[10].diez+notaArray2[10].diez+notaArray3[10].diez+notaArray4[10].diez)/4),
                    doce:Math.round((notaArray1[11].once+notaArray2[11].once+notaArray3[11].once+notaArray4[11].once)/4),
                    trece:Math.round((notaArray1[12].doce+notaArray2[12].doce+notaArray3[12].doce+notaArray4[12].doce)/4),
                    catorce:Math.round((notaArray1[13].trece+notaArray2[13].trece+notaArray3[13].trece+notaArray4[13].trece)/4),
                    quince:Math.round((notaArray1[14].catorce+notaArray2[14].catorce+notaArray3[14].catorce+notaArray4[14].catorce)/4),
                    dieciseis:Math.round((notaArray1[15].quince+notaArray2[15].quince+notaArray3[15].quince+notaArray4[15].quince)/4),
                    diecisiete:Math.round((notaArray1[15].dieciseis+notaArray2[15].dieciseis+notaArray3[15].dieciseis+notaArray4[15].dieciseis)/4),
                }
                    contador=contador+1;
                }
            }
        break;
    }
    return temp
}
export {notasalumnosFinalService}
import { Request } from "express";
import conexion from "../config/database";

const notasalumnosFinalService=async(idGrado:string)=>{
    var idCursos:any=[]
    var temp:any=[]
    var idAlumnos:any=[]
    var cantidadCursos:any;

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
        case 1:
            var contador=0;
            for(let i=0;i<cantidadCursos;i++){
                while(contador<dataAlumnos.length){
                    //consulta PARA PROMEDIO POR CURSO Y ESTUDIANTE
                    const consulta1=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno,PromedioFinalCurso("+idCursos[0]+",a.idAlumno) as uno FROM tbAlumno a INNER JOIN tbCurso c WHERE a.idAlumno=? GROUP BY a.idAlumno ORDER BY a.apellidos_alumno",[idAlumnos[contador]])
                    //array consultas
                    const notaArray1:any=Object.values(consulta1);
                   //chingo de arrays
                   temp[contador]={
                    alumno:notaArray1[0].alumno,
                    uno:notaArray1[0].uno,
                    promedio:Math.round((notaArray1[0].uno))
                }
                    contador=contador+1;
                }
            }
        break;
        case 2:
            var contador=0;
            for(let i=0;i<cantidadCursos;i++){
                while(contador<dataAlumnos.length){
                    //consulta PARA PROMEDIO POR CURSO Y ESTUDIANTE
                    const consulta1=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno, PromedioFinalCurso("+idCursos[0]+",a.idAlumno) as uno, PromedioFinalCurso("+idCursos[1]+",a.idAlumno) as dos FROM tbAlumno a INNER JOIN tbCurso c WHERE a.idAlumno=? GROUP BY a.idAlumno ORDER BY a.apellidos_alumno",[idAlumnos[contador]])
                    //array consultas
                    const notaArray1:any=Object.values(consulta1);
                   //chingo de arrays
                   temp[contador]={
                    alumno:notaArray1[0].alumno,
                    uno:notaArray1[0].uno,
                    dos:notaArray1[0].dos,
                    promedio:Math.round((notaArray1[0].uno+notaArray1[0].dos)/2)
                }
                    contador=contador+1;
                }
            }
        break;
        case 3:
            var contador=0;
            for(let i=0;i<cantidadCursos;i++){
                while(contador<dataAlumnos.length){
                    //consulta PARA PROMEDIO POR CURSO Y ESTUDIANTE
                    const consulta1=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno, PromedioFinalCurso("+idCursos[0]+",a.idAlumno) as uno, PromedioFinalCurso("+idCursos[1]+",a.idAlumno) as dos, PromedioFinalCurso("+idCursos[2]+",a.idAlumno) as tres FROM tbAlumno a INNER JOIN tbCurso c WHERE a.idAlumno=? GROUP BY a.idAlumno ORDER BY a.apellidos_alumno",[idAlumnos[contador]])
                    //array consultas
                    const notaArray1:any=Object.values(consulta1);
                   //chingo de arrays
                   temp[contador]={
                    alumno:notaArray1[0].alumno,
                    uno:notaArray1[0].uno,
                    dos:notaArray1[0].dos,
                    tres:notaArray1[0].tres,
                    promedio:Math.round((notaArray1[0].uno+notaArray1[0].dos+notaArray1[0].tres)/3)
                }
                    contador=contador+1;
                }
            }
        break;
        case 4:
            var contador=0;
            for(let i=0;i<cantidadCursos;i++){
                while(contador<dataAlumnos.length){
                    //consulta PARA PROMEDIO POR CURSO Y ESTUDIANTE
                    const consulta1=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno, PromedioFinalCurso("+idCursos[0]+",a.idAlumno) as uno, PromedioFinalCurso("+idCursos[1]+",a.idAlumno) as dos, PromedioFinalCurso("+idCursos[2]+",a.idAlumno) as tres, PromedioFinalCurso("+idCursos[3]+",a.idAlumno) as cuatro FROM tbAlumno a INNER JOIN tbCurso c WHERE a.idAlumno=? GROUP BY a.idAlumno ORDER BY a.apellidos_alumno",[idAlumnos[contador]])
                    //array consultas
                    const notaArray1:any=Object.values(consulta1);
                   //chingo de arrays
                   temp[contador]={
                    alumno:notaArray1[0].alumno,
                    uno:notaArray1[0].uno,
                    dos:notaArray1[0].dos,
                    tres:notaArray1[0].tres,
                    cuatro:notaArray1[0].cuatro,
                    promedio:Math.round((notaArray1[0].uno+notaArray1[0].dos+notaArray1[0].tres+notaArray1[0].cuatro)/4)
                }
                    contador=contador+1;
                }
            }
        break;
        case 5:
            var contador=0;
            for(let i=0;i<cantidadCursos;i++){
                while(contador<dataAlumnos.length){
                    //consulta PARA PROMEDIO POR CURSO Y ESTUDIANTE
                    const consulta1=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno, PromedioFinalCurso("+idCursos[0]+",a.idAlumno) as uno, PromedioFinalCurso("+idCursos[1]+",a.idAlumno) as dos, PromedioFinalCurso("+idCursos[2]+",a.idAlumno) as tres, PromedioFinalCurso("+idCursos[3]+",a.idAlumno) as cuatro, PromedioFinalCurso("+idCursos[4]+",a.idAlumno) as cinco FROM tbAlumno a INNER JOIN tbCurso c WHERE a.idAlumno=? GROUP BY a.idAlumno ORDER BY a.apellidos_alumno",[idAlumnos[contador]])
                    //array consultas
                    const notaArray1:any=Object.values(consulta1);
                   //chingo de arrays
                   temp[contador]={
                    alumno:notaArray1[0].alumno,
                    uno:notaArray1[0].uno,
                    dos:notaArray1[0].dos,
                    tres:notaArray1[0].tres,
                    cuatro:notaArray1[0].cuatro,
                    cinco:notaArray1[0].cinco,
                    promedio:Math.round((notaArray1[0].uno+notaArray1[0].dos+notaArray1[0].tres+notaArray1[0].cuatro+notaArray1[0].cinco)/5)
                }
                    contador=contador+1;
                }
            }
        break;
        case 6:
            var contador=0;
            for(let i=0;i<cantidadCursos;i++){
                while(contador<dataAlumnos.length){
                    //consulta PARA PROMEDIO POR CURSO Y ESTUDIANTE
                    const consulta1=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno, PromedioFinalCurso("+idCursos[0]+",a.idAlumno) as uno, PromedioFinalCurso("+idCursos[1]+",a.idAlumno) as dos, PromedioFinalCurso("+idCursos[2]+",a.idAlumno) as tres, PromedioFinalCurso("+idCursos[3]+",a.idAlumno) as cuatro, PromedioFinalCurso("+idCursos[4]+",a.idAlumno) as cinco, PromedioFinalCurso("+idCursos[5]+",a.idAlumno) as seis FROM tbAlumno a INNER JOIN tbCurso c WHERE a.idAlumno=? GROUP BY a.idAlumno ORDER BY a.apellidos_alumno",[idAlumnos[contador]])
                    //array consultas
                    const notaArray1:any=Object.values(consulta1);
                   //chingo de arrays
                   temp[contador]={
                    alumno:notaArray1[0].alumno,
                    uno:notaArray1[0].uno,
                    dos:notaArray1[0].dos,
                    tres:notaArray1[0].tres,
                    cuatro:notaArray1[0].cuatro,
                    cinco:notaArray1[0].cinco,
                    seis:notaArray1[0].seis,
                    promedio:Math.round((notaArray1[0].uno+notaArray1[0].dos+notaArray1[0].tres+notaArray1[0].cuatro+notaArray1[0].cinco+notaArray1[0].seis)/6)
                }
                    contador=contador+1;
                }
            }
        break;
        case 7:
            var contador=0;
            for(let i=0;i<cantidadCursos;i++){
                while(contador<dataAlumnos.length){
                    //consulta PARA PROMEDIO POR CURSO Y ESTUDIANTE
                    const consulta1=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno, PromedioFinalCurso("+idCursos[0]+",a.idAlumno) as uno, PromedioFinalCurso("+idCursos[1]+",a.idAlumno) as dos, PromedioFinalCurso("+idCursos[2]+",a.idAlumno) as tres, PromedioFinalCurso("+idCursos[3]+",a.idAlumno) as cuatro, PromedioFinalCurso("+idCursos[4]+",a.idAlumno) as cinco, PromedioFinalCurso("+idCursos[5]+",a.idAlumno) as seis, PromedioFinalCurso("+idCursos[6]+",a.idAlumno) as siete FROM tbAlumno a INNER JOIN tbCurso c WHERE a.idAlumno=? GROUP BY a.idAlumno ORDER BY a.apellidos_alumno",[idAlumnos[contador]])
                    //array consultas
                    const notaArray1:any=Object.values(consulta1);
                   //chingo de arrays
                   temp[contador]={
                    alumno:notaArray1[0].alumno,
                    uno:notaArray1[0].uno,
                    dos:notaArray1[0].dos,
                    tres:notaArray1[0].tres,
                    cuatro:notaArray1[0].cuatro,
                    cinco:notaArray1[0].cinco,
                    seis:notaArray1[0].seis,
                    siete:notaArray1[0].site,
                    promedio:Math.round((notaArray1[0].uno+notaArray1[0].dos+notaArray1[0].tres+notaArray1[0].cuatro+notaArray1[0].cinco+notaArray1[0].seis+notaArray1[0].siete)/7)
                }
                    contador=contador+1;
                }
            }
        break;
        case 8:
            var contador=0;
            for(let i=0;i<cantidadCursos;i++){
                while(contador<dataAlumnos.length){
                    //consulta PARA PROMEDIO POR CURSO Y ESTUDIANTE
                    const consulta1=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno, PromedioFinalCurso("+idCursos[0]+",a.idAlumno) as uno, PromedioFinalCurso("+idCursos[1]+",a.idAlumno) as dos, PromedioFinalCurso("+idCursos[2]+",a.idAlumno) as tres, PromedioFinalCurso("+idCursos[3]+",a.idAlumno) as cuatro, PromedioFinalCurso("+idCursos[4]+",a.idAlumno) as cinco, PromedioFinalCurso("+idCursos[5]+",a.idAlumno) as seis, PromedioFinalCurso("+idCursos[6]+",a.idAlumno) as siete,PromedioFinalCurso("+idCursos[7]+",a.idAlumno) as ocho FROM tbAlumno a INNER JOIN tbCurso c WHERE a.idAlumno=? GROUP BY a.idAlumno ORDER BY a.apellidos_alumno",[idAlumnos[contador]])
                    //array consultas
                    const notaArray1:any=Object.values(consulta1);
                   //chingo de arrays
                   temp[contador]={
                    alumno:notaArray1[0].alumno,
                    uno:notaArray1[0].uno,
                    dos:notaArray1[0].dos,
                    tres:notaArray1[0].tres,
                    cuatro:notaArray1[0].cuatro,
                    cinco:notaArray1[0].cinco,
                    seis:notaArray1[0].seis,
                    siete:notaArray1[0].site,
                    ocho:notaArray1[0].ocho,
                    promedio:Math.round((notaArray1[0].uno+notaArray1[0].dos+notaArray1[0].tres+notaArray1[0].cuatro+notaArray1[0].cinco+notaArray1[0].seis+notaArray1[0].siete+notaArray1[0].ocho)/8)
                }
                    contador=contador+1;
                }
            }
        break;
        case 9:
            var contador=0;
            for(let i=0;i<cantidadCursos;i++){
                while(contador<dataAlumnos.length){
                    //consulta PARA PROMEDIO POR CURSO Y ESTUDIANTE
                    const consulta1=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno, PromedioFinalCurso("+idCursos[0]+",a.idAlumno) as uno, PromedioFinalCurso("+idCursos[1]+",a.idAlumno) as dos, PromedioFinalCurso("+idCursos[2]+",a.idAlumno) as tres, PromedioFinalCurso("+idCursos[3]+",a.idAlumno) as cuatro, PromedioFinalCurso("+idCursos[4]+",a.idAlumno) as cinco, PromedioFinalCurso("+idCursos[5]+",a.idAlumno) as seis, PromedioFinalCurso("+idCursos[6]+",a.idAlumno) as siete,PromedioFinalCurso("+idCursos[7]+",a.idAlumno) as ocho,PromedioFinalCurso("+idCursos[8]+",a.idAlumno) as nueve FROM tbAlumno a INNER JOIN tbCurso c WHERE a.idAlumno=? GROUP BY a.idAlumno ORDER BY a.apellidos_alumno",[idAlumnos[contador]])
                    //array consultas
                    const notaArray1:any=Object.values(consulta1);
                   //chingo de arrays
                   temp[contador]={
                    alumno:notaArray1[0].alumno,
                    uno:notaArray1[0].uno,
                    dos:notaArray1[0].dos,
                    tres:notaArray1[0].tres,
                    cuatro:notaArray1[0].cuatro,
                    cinco:notaArray1[0].cinco,
                    seis:notaArray1[0].seis,
                    siete:notaArray1[0].site,
                    ocho:notaArray1[0].ocho,
                    nueve:notaArray1[0].nueve,
                    promedio:Math.round((notaArray1[0].uno+notaArray1[0].dos+notaArray1[0].tres+notaArray1[0].cuatro+notaArray1[0].cinco+notaArray1[0].seis+notaArray1[0].siete+notaArray1[0].ocho+notaArray1[0].nueve)/9)
                }
                    contador=contador+1;
                }
            }
        break;
        case 10:
            var contador=0;
            for(let i=0;i<cantidadCursos;i++){
                while(contador<dataAlumnos.length){
                    //consulta PARA PROMEDIO POR CURSO Y ESTUDIANTE
                    const consulta1=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno, PromedioFinalCurso("+idCursos[0]+",a.idAlumno) as uno, PromedioFinalCurso("+idCursos[1]+",a.idAlumno) as dos, PromedioFinalCurso("+idCursos[2]+",a.idAlumno) as tres, PromedioFinalCurso("+idCursos[3]+",a.idAlumno) as cuatro, PromedioFinalCurso("+idCursos[4]+",a.idAlumno) as cinco, PromedioFinalCurso("+idCursos[5]+",a.idAlumno) as seis, PromedioFinalCurso("+idCursos[6]+",a.idAlumno) as siete,PromedioFinalCurso("+idCursos[7]+",a.idAlumno) as ocho,PromedioFinalCurso("+idCursos[8]+",a.idAlumno) as nueve,PromedioFinalCurso("+idCursos[9]+",a.idAlumno) as diez FROM tbAlumno a INNER JOIN tbCurso c WHERE a.idAlumno=? GROUP BY a.idAlumno ORDER BY a.apellidos_alumno",[idAlumnos[contador]])
                    //array consultas
                    const notaArray1:any=Object.values(consulta1);
                   //chingo de arrays
                   temp[contador]={
                    alumno:notaArray1[0].alumno,
                    uno:notaArray1[0].uno,
                    dos:notaArray1[0].dos,
                    tres:notaArray1[0].tres,
                    cuatro:notaArray1[0].cuatro,
                    cinco:notaArray1[0].cinco,
                    seis:notaArray1[0].seis,
                    siete:notaArray1[0].site,
                    ocho:notaArray1[0].ocho,
                    nueve:notaArray1[0].nueve,
                    diez:notaArray1[0].diez,
                    promedio:Math.round((notaArray1[0].uno+notaArray1[0].dos+notaArray1[0].tres+notaArray1[0].cuatro+notaArray1[0].cinco+notaArray1[0].seis+notaArray1[0].siete+notaArray1[0].ocho+notaArray1[0].nueve+notaArray1[0].diez)/10)
                }
                    contador=contador+1;
                }
            }
        break;
        case 11:
            var contador=0;
            for(let i=0;i<cantidadCursos;i++){
                while(contador<dataAlumnos.length){
                    //consulta PARA PROMEDIO POR CURSO Y ESTUDIANTE
                    const consulta1=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno, PromedioFinalCurso("+idCursos[0]+",a.idAlumno) as uno, PromedioFinalCurso("+idCursos[1]+",a.idAlumno) as dos, PromedioFinalCurso("+idCursos[2]+",a.idAlumno) as tres, PromedioFinalCurso("+idCursos[3]+",a.idAlumno) as cuatro, PromedioFinalCurso("+idCursos[4]+",a.idAlumno) as cinco, PromedioFinalCurso("+idCursos[5]+",a.idAlumno) as seis, PromedioFinalCurso("+idCursos[6]+",a.idAlumno) as siete,PromedioFinalCurso("+idCursos[7]+",a.idAlumno) as ocho,PromedioFinalCurso("+idCursos[8]+",a.idAlumno) as nueve,PromedioFinalCurso("+idCursos[9]+",a.idAlumno) as diez,PromedioFinalCurso("+idCursos[10]+",a.idAlumno) as once FROM tbAlumno a INNER JOIN tbCurso c WHERE a.idAlumno=? GROUP BY a.idAlumno ORDER BY a.apellidos_alumno",[idAlumnos[contador]])
                    //array consultas
                    const notaArray1:any=Object.values(consulta1);
                   //chingo de arrays
                   temp[contador]={
                    alumno:notaArray1[0].alumno,
                    uno:notaArray1[0].uno,
                    dos:notaArray1[0].dos,
                    tres:notaArray1[0].tres,
                    cuatro:notaArray1[0].cuatro,
                    cinco:notaArray1[0].cinco,
                    seis:notaArray1[0].seis,
                    siete:notaArray1[0].site,
                    ocho:notaArray1[0].ocho,
                    nueve:notaArray1[0].nueve,
                    diez:notaArray1[0].diez,
                    once:notaArray1[0].once,
                    promedio:Math.round((notaArray1[0].uno+notaArray1[0].dos+notaArray1[0].tres+notaArray1[0].cuatro+notaArray1[0].cinco+notaArray1[0].seis+notaArray1[0].siete+notaArray1[0].ocho+notaArray1[0].nueve+notaArray1[0].diez+notaArray1[0].once)/11)
                }
                    contador=contador+1;
                }
            }
        break;
        case 12:
            var contador=0;
            for(let i=0;i<cantidadCursos;i++){
                while(contador<dataAlumnos.length){
                    //consulta PARA PROMEDIO POR CURSO Y ESTUDIANTE
                    const consulta1=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno, PromedioFinalCurso("+idCursos[0]+",a.idAlumno) as uno, PromedioFinalCurso("+idCursos[1]+",a.idAlumno) as dos, PromedioFinalCurso("+idCursos[2]+",a.idAlumno) as tres, PromedioFinalCurso("+idCursos[3]+",a.idAlumno) as cuatro, PromedioFinalCurso("+idCursos[4]+",a.idAlumno) as cinco, PromedioFinalCurso("+idCursos[5]+",a.idAlumno) as seis, PromedioFinalCurso("+idCursos[6]+",a.idAlumno) as siete,PromedioFinalCurso("+idCursos[7]+",a.idAlumno) as ocho,PromedioFinalCurso("+idCursos[8]+",a.idAlumno) as nueve,PromedioFinalCurso("+idCursos[9]+",a.idAlumno) as diez,PromedioFinalCurso("+idCursos[10]+",a.idAlumno) as once,PromedioFinalCurso("+idCursos[11]+",a.idAlumno) as doce FROM tbAlumno a INNER JOIN tbCurso c WHERE a.idAlumno=? GROUP BY a.idAlumno ORDER BY a.apellidos_alumno",[idAlumnos[contador]])
                    //array consultas
                    const notaArray1:any=Object.values(consulta1);
                   //chingo de arrays
                   temp[contador]={
                    alumno:notaArray1[0].alumno,
                    uno:notaArray1[0].uno,
                    dos:notaArray1[0].dos,
                    tres:notaArray1[0].tres,
                    cuatro:notaArray1[0].cuatro,
                    cinco:notaArray1[0].cinco,
                    seis:notaArray1[0].seis,
                    siete:notaArray1[0].site,
                    ocho:notaArray1[0].ocho,
                    nueve:notaArray1[0].nueve,
                    diez:notaArray1[0].diez,
                    once:notaArray1[0].once,
                    doce:notaArray1[0].doce,
                    promedio:Math.round((notaArray1[0].uno+notaArray1[0].dos+notaArray1[0].tres+notaArray1[0].cuatro+notaArray1[0].cinco+notaArray1[0].seis+notaArray1[0].siete+notaArray1[0].ocho+notaArray1[0].nueve+notaArray1[0].diez+notaArray1[0].once+notaArray1[0].doce)/12)
                }
                    contador=contador+1;
                }
            }
        break;
        case 13:
            var contador=0;
            for(let i=0;i<cantidadCursos;i++){
                while(contador<dataAlumnos.length){
                    //consulta PARA PROMEDIO POR CURSO Y ESTUDIANTE
                    const consulta1=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno, PromedioFinalCurso("+idCursos[0]+",a.idAlumno) as uno, PromedioFinalCurso("+idCursos[1]+",a.idAlumno) as dos, PromedioFinalCurso("+idCursos[2]+",a.idAlumno) as tres, PromedioFinalCurso("+idCursos[3]+",a.idAlumno) as cuatro, PromedioFinalCurso("+idCursos[4]+",a.idAlumno) as cinco, PromedioFinalCurso("+idCursos[5]+",a.idAlumno) as seis, PromedioFinalCurso("+idCursos[6]+",a.idAlumno) as siete,PromedioFinalCurso("+idCursos[7]+",a.idAlumno) as ocho,PromedioFinalCurso("+idCursos[8]+",a.idAlumno) as nueve,PromedioFinalCurso("+idCursos[9]+",a.idAlumno) as diez,PromedioFinalCurso("+idCursos[10]+",a.idAlumno) as once,PromedioFinalCurso("+idCursos[11]+",a.idAlumno) as doce,PromedioFinalCurso("+idCursos[12]+",a.idAlumno) as trece FROM tbAlumno a INNER JOIN tbCurso c WHERE a.idAlumno=? GROUP BY a.idAlumno ORDER BY a.apellidos_alumno",[idAlumnos[contador]])
                    //array consultas
                    const notaArray1:any=Object.values(consulta1);
                   //chingo de arrays
                   temp[contador]={
                    alumno:notaArray1[0].alumno,
                    uno:notaArray1[0].uno,
                    dos:notaArray1[0].dos,
                    tres:notaArray1[0].tres,
                    cuatro:notaArray1[0].cuatro,
                    cinco:notaArray1[0].cinco,
                    seis:notaArray1[0].seis,
                    siete:notaArray1[0].site,
                    ocho:notaArray1[0].ocho,
                    nueve:notaArray1[0].nueve,
                    diez:notaArray1[0].diez,
                    once:notaArray1[0].once,
                    doce:notaArray1[0].doce,
                    trece:notaArray1[0].trece,
                    promedio:Math.round((notaArray1[0].uno+notaArray1[0].dos+notaArray1[0].tres+notaArray1[0].cuatro+notaArray1[0].cinco+notaArray1[0].seis+notaArray1[0].siete+notaArray1[0].ocho+notaArray1[0].nueve+notaArray1[0].diez+notaArray1[0].once+notaArray1[0].doce+notaArray1[0].trece)/13)
                }
                    contador=contador+1;
                }
            }
        break;
        case 14:
            var contador=0;
            for(let i=0;i<cantidadCursos;i++){
                while(contador<dataAlumnos.length){
                    //consulta PARA PROMEDIO POR CURSO Y ESTUDIANTE
                    const consulta1=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno, PromedioFinalCurso("+idCursos[0]+",a.idAlumno) as uno, PromedioFinalCurso("+idCursos[1]+",a.idAlumno) as dos, PromedioFinalCurso("+idCursos[2]+",a.idAlumno) as tres, PromedioFinalCurso("+idCursos[3]+",a.idAlumno) as cuatro, PromedioFinalCurso("+idCursos[4]+",a.idAlumno) as cinco, PromedioFinalCurso("+idCursos[5]+",a.idAlumno) as seis, PromedioFinalCurso("+idCursos[6]+",a.idAlumno) as siete,PromedioFinalCurso("+idCursos[7]+",a.idAlumno) as ocho,PromedioFinalCurso("+idCursos[8]+",a.idAlumno) as nueve,PromedioFinalCurso("+idCursos[9]+",a.idAlumno) as diez,PromedioFinalCurso("+idCursos[10]+",a.idAlumno) as once,PromedioFinalCurso("+idCursos[11]+",a.idAlumno) as doce,PromedioFinalCurso("+idCursos[12]+",a.idAlumno) as trece,PromedioFinalCurso("+idCursos[13]+",a.idAlumno) as catorce FROM tbAlumno a INNER JOIN tbCurso c WHERE a.idAlumno=? GROUP BY a.idAlumno ORDER BY a.apellidos_alumno",[idAlumnos[contador]])
                    //array consultas
                    const notaArray1:any=Object.values(consulta1);
                   //chingo de arrays
                   temp[contador]={
                    alumno:notaArray1[0].alumno,
                    uno:notaArray1[0].uno,
                    dos:notaArray1[0].dos,
                    tres:notaArray1[0].tres,
                    cuatro:notaArray1[0].cuatro,
                    cinco:notaArray1[0].cinco,
                    seis:notaArray1[0].seis,
                    siete:notaArray1[0].site,
                    ocho:notaArray1[0].ocho,
                    nueve:notaArray1[0].nueve,
                    diez:notaArray1[0].diez,
                    once:notaArray1[0].once,
                    doce:notaArray1[0].doce,
                    trece:notaArray1[0].trece,
                    catorce:notaArray1[0].catorce,
                    promedio:Math.round((notaArray1[0].uno+notaArray1[0].dos+notaArray1[0].tres+notaArray1[0].cuatro+notaArray1[0].cinco+notaArray1[0].seis+notaArray1[0].siete+notaArray1[0].ocho+notaArray1[0].nueve+notaArray1[0].diez+notaArray1[0].once+notaArray1[0].doce+notaArray1[0].trece+notaArray1[0].catorce)/14)
                }
                    contador=contador+1;
                }
            }
        break;
        case 15:
            var contador=0;
            for(let i=0;i<cantidadCursos;i++){
                while(contador<dataAlumnos.length){
                    //consulta PARA PROMEDIO POR CURSO Y ESTUDIANTE
                    const consulta1=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno, PromedioFinalCurso("+idCursos[0]+",a.idAlumno) as uno, PromedioFinalCurso("+idCursos[1]+",a.idAlumno) as dos, PromedioFinalCurso("+idCursos[2]+",a.idAlumno) as tres, PromedioFinalCurso("+idCursos[3]+",a.idAlumno) as cuatro, PromedioFinalCurso("+idCursos[4]+",a.idAlumno) as cinco, PromedioFinalCurso("+idCursos[5]+",a.idAlumno) as seis, PromedioFinalCurso("+idCursos[6]+",a.idAlumno) as siete,PromedioFinalCurso("+idCursos[7]+",a.idAlumno) as ocho,PromedioFinalCurso("+idCursos[8]+",a.idAlumno) as nueve,PromedioFinalCurso("+idCursos[9]+",a.idAlumno) as diez,PromedioFinalCurso("+idCursos[10]+",a.idAlumno) as once,PromedioFinalCurso("+idCursos[11]+",a.idAlumno) as doce,PromedioFinalCurso("+idCursos[12]+",a.idAlumno) as trece,PromedioFinalCurso("+idCursos[13]+",a.idAlumno) as catorce,PromedioFinalCurso("+idCursos[14]+",a.idAlumno) as quince FROM tbAlumno a INNER JOIN tbCurso c WHERE a.idAlumno=? GROUP BY a.idAlumno ORDER BY a.apellidos_alumno",[idAlumnos[contador]])
                    //array consultas
                    const notaArray1:any=Object.values(consulta1);
                   //chingo de arrays
                   temp[contador]={
                    alumno:notaArray1[0].alumno,
                    uno:notaArray1[0].uno,
                    dos:notaArray1[0].dos,
                    tres:notaArray1[0].tres,
                    cuatro:notaArray1[0].cuatro,
                    cinco:notaArray1[0].cinco,
                    seis:notaArray1[0].seis,
                    siete:notaArray1[0].site,
                    ocho:notaArray1[0].ocho,
                    nueve:notaArray1[0].nueve,
                    diez:notaArray1[0].diez,
                    once:notaArray1[0].once,
                    doce:notaArray1[0].doce,
                    trece:notaArray1[0].trece,
                    catorce:notaArray1[0].catorce,
                    quince:notaArray1[0].quince,
                    promedio:Math.round((notaArray1[0].uno+notaArray1[0].dos+notaArray1[0].tres+notaArray1[0].cuatro+notaArray1[0].cinco+notaArray1[0].seis+notaArray1[0].siete+notaArray1[0].ocho+notaArray1[0].nueve+notaArray1[0].diez+notaArray1[0].once+notaArray1[0].doce+notaArray1[0].trece+notaArray1[0].catorce+notaArray1[0].quince)/15)
                }
                    contador=contador+1;
                }
            }
        break;
        case 16:
            var contador=0;
            for(let i=0;i<cantidadCursos;i++){
                while(contador<dataAlumnos.length){
                    //consulta PARA PROMEDIO POR CURSO Y ESTUDIANTE
                    const consulta1=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno, PromedioFinalCurso("+idCursos[0]+",a.idAlumno) as uno, PromedioFinalCurso("+idCursos[1]+",a.idAlumno) as dos, PromedioFinalCurso("+idCursos[2]+",a.idAlumno) as tres, PromedioFinalCurso("+idCursos[3]+",a.idAlumno) as cuatro, PromedioFinalCurso("+idCursos[4]+",a.idAlumno) as cinco, PromedioFinalCurso("+idCursos[5]+",a.idAlumno) as seis, PromedioFinalCurso("+idCursos[6]+",a.idAlumno) as siete,PromedioFinalCurso("+idCursos[7]+",a.idAlumno) as ocho,PromedioFinalCurso("+idCursos[8]+",a.idAlumno) as nueve,PromedioFinalCurso("+idCursos[9]+",a.idAlumno) as diez,PromedioFinalCurso("+idCursos[10]+",a.idAlumno) as once,PromedioFinalCurso("+idCursos[11]+",a.idAlumno) as doce,PromedioFinalCurso("+idCursos[12]+",a.idAlumno) as trece,PromedioFinalCurso("+idCursos[13]+",a.idAlumno) as catorce,PromedioFinalCurso("+idCursos[14]+",a.idAlumno) as quince,PromedioFinalCurso("+idCursos[15]+",a.idAlumno) as dieciseis FROM tbAlumno a INNER JOIN tbCurso c WHERE a.idAlumno=? GROUP BY a.idAlumno ORDER BY a.apellidos_alumno",[idAlumnos[contador]])
                    //array consultas
                    const notaArray1:any=Object.values(consulta1);
                   //chingo de arrays
                   temp[contador]={
                    alumno:notaArray1[0].alumno,
                    uno:notaArray1[0].uno,
                    dos:notaArray1[0].dos,
                    tres:notaArray1[0].tres,
                    cuatro:notaArray1[0].cuatro,
                    cinco:notaArray1[0].cinco,
                    seis:notaArray1[0].seis,
                    siete:notaArray1[0].site,
                    ocho:notaArray1[0].ocho,
                    nueve:notaArray1[0].nueve,
                    diez:notaArray1[0].diez,
                    once:notaArray1[0].once,
                    doce:notaArray1[0].doce,
                    trece:notaArray1[0].trece,
                    catorce:notaArray1[0].catorce,
                    quince:notaArray1[0].quince,
                    dieciseis:notaArray1[0].dieciseis,
                    promedio:Math.round((notaArray1[0].uno+notaArray1[0].dos+notaArray1[0].tres+notaArray1[0].cuatro+notaArray1[0].cinco+notaArray1[0].seis+notaArray1[0].siete+notaArray1[0].ocho+notaArray1[0].nueve+notaArray1[0].diez+notaArray1[0].once+notaArray1[0].doce+notaArray1[0].trece+notaArray1[0].catorce+notaArray1[0].quince+notaArray1[0].dieciseis)/16)
                }
                    contador=contador+1;
                }
            }
        break;
        case 17:
            var contador=0;
            for(let i=0;i<cantidadCursos;i++){
                while(contador<dataAlumnos.length){
                    //consulta PARA PROMEDIO POR CURSO Y ESTUDIANTE
                    const consulta1=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno, PromedioFinalCurso("+idCursos[0]+",a.idAlumno) as uno, PromedioFinalCurso("+idCursos[1]+",a.idAlumno) as dos, PromedioFinalCurso("+idCursos[2]+",a.idAlumno) as tres, PromedioFinalCurso("+idCursos[3]+",a.idAlumno) as cuatro, PromedioFinalCurso("+idCursos[4]+",a.idAlumno) as cinco, PromedioFinalCurso("+idCursos[5]+",a.idAlumno) as seis, PromedioFinalCurso("+idCursos[6]+",a.idAlumno) as siete,PromedioFinalCurso("+idCursos[7]+",a.idAlumno) as ocho,PromedioFinalCurso("+idCursos[8]+",a.idAlumno) as nueve,PromedioFinalCurso("+idCursos[9]+",a.idAlumno) as diez,PromedioFinalCurso("+idCursos[10]+",a.idAlumno) as once,PromedioFinalCurso("+idCursos[11]+",a.idAlumno) as doce,PromedioFinalCurso("+idCursos[12]+",a.idAlumno) as trece,PromedioFinalCurso("+idCursos[13]+",a.idAlumno) as catorce,PromedioFinalCurso("+idCursos[14]+",a.idAlumno) as quince,PromedioFinalCurso("+idCursos[15]+",a.idAlumno) as dieciseis,PromedioFinalCurso("+idCursos[16]+",a.idAlumno) as diecisiete FROM tbAlumno a INNER JOIN tbCurso c WHERE a.idAlumno=? GROUP BY a.idAlumno ORDER BY a.apellidos_alumno",[idAlumnos[contador]])
                    //array consultas
                    const notaArray1:any=Object.values(consulta1);
                   //chingo de arrays
                   temp[contador]={
                    alumno:notaArray1[0].alumno,
                    uno:notaArray1[0].uno,
                    dos:notaArray1[0].dos,
                    tres:notaArray1[0].tres,
                    cuatro:notaArray1[0].cuatro,
                    cinco:notaArray1[0].cinco,
                    seis:notaArray1[0].seis,
                    siete:notaArray1[0].site,
                    ocho:notaArray1[0].ocho,
                    nueve:notaArray1[0].nueve,
                    diez:notaArray1[0].diez,
                    once:notaArray1[0].once,
                    doce:notaArray1[0].doce,
                    trece:notaArray1[0].trece,
                    catorce:notaArray1[0].catorce,
                    quince:notaArray1[0].quince,
                    dieciseis:notaArray1[0].dieciseis,
                    diecisiete:notaArray1[0].diecisiete,
                    promedio:Math.round((notaArray1[0].uno+notaArray1[0].dos+notaArray1[0].tres+notaArray1[0].cuatro+notaArray1[0].cinco+notaArray1[0].seis+notaArray1[0].siete+notaArray1[0].ocho+notaArray1[0].nueve+notaArray1[0].diez+notaArray1[0].once+notaArray1[0].doce+notaArray1[0].trece+notaArray1[0].catorce+notaArray1[0].quince+notaArray1[0].dieciseis+notaArray1[0].diecisiete)/17)
                }
                    contador=contador+1;
                }
            }
        break;
        case 18:
            var contador=0;
            for(let i=0;i<cantidadCursos;i++){
                while(contador<dataAlumnos.length){
                    //consulta PARA PROMEDIO POR CURSO Y ESTUDIANTE
                    const consulta1=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno, PromedioFinalCurso("+idCursos[0]+",a.idAlumno) as uno, PromedioFinalCurso("+idCursos[1]+",a.idAlumno) as dos, PromedioFinalCurso("+idCursos[2]+",a.idAlumno) as tres, PromedioFinalCurso("+idCursos[3]+",a.idAlumno) as cuatro, PromedioFinalCurso("+idCursos[4]+",a.idAlumno) as cinco, PromedioFinalCurso("+idCursos[5]+",a.idAlumno) as seis, PromedioFinalCurso("+idCursos[6]+",a.idAlumno) as siete,PromedioFinalCurso("+idCursos[7]+",a.idAlumno) as ocho,PromedioFinalCurso("+idCursos[8]+",a.idAlumno) as nueve,PromedioFinalCurso("+idCursos[9]+",a.idAlumno) as diez,PromedioFinalCurso("+idCursos[10]+",a.idAlumno) as once,PromedioFinalCurso("+idCursos[11]+",a.idAlumno) as doce,PromedioFinalCurso("+idCursos[12]+",a.idAlumno) as trece,PromedioFinalCurso("+idCursos[13]+",a.idAlumno) as catorce,PromedioFinalCurso("+idCursos[14]+",a.idAlumno) as quince,PromedioFinalCurso("+idCursos[15]+",a.idAlumno) as dieciseis,PromedioFinalCurso("+idCursos[16]+",a.idAlumno) as diecisiete,PromedioFinalCurso("+idCursos[17]+",a.idAlumno) as dieciocho FROM tbAlumno a INNER JOIN tbCurso c WHERE a.idAlumno=? GROUP BY a.idAlumno ORDER BY a.apellidos_alumno",[idAlumnos[contador]])
                    //array consultas
                    const notaArray1:any=Object.values(consulta1);
                   //chingo de arrays
                   temp[contador]={
                    alumno:notaArray1[0].alumno,
                    uno:notaArray1[0].uno,
                    dos:notaArray1[0].dos,
                    tres:notaArray1[0].tres,
                    cuatro:notaArray1[0].cuatro,
                    cinco:notaArray1[0].cinco,
                    seis:notaArray1[0].seis,
                    siete:notaArray1[0].site,
                    ocho:notaArray1[0].ocho,
                    nueve:notaArray1[0].nueve,
                    diez:notaArray1[0].diez,
                    once:notaArray1[0].once,
                    doce:notaArray1[0].doce,
                    trece:notaArray1[0].trece,
                    catorce:notaArray1[0].catorce,
                    quince:notaArray1[0].quince,
                    dieciseis:notaArray1[0].dieciseis,
                    diecisiete:notaArray1[0].diecisiete,
                    dieciocho:notaArray1[0].dieciocho,
                    promedio:Math.round((notaArray1[0].uno+notaArray1[0].dos+notaArray1[0].tres+notaArray1[0].cuatro+notaArray1[0].cinco+notaArray1[0].seis+notaArray1[0].siete+notaArray1[0].ocho+notaArray1[0].nueve+notaArray1[0].diez+notaArray1[0].once+notaArray1[0].doce+notaArray1[0].trece+notaArray1[0].catorce+notaArray1[0].quince+notaArray1[0].dieciseis+notaArray1[0].diecisiete+notaArray1[0].dieciocho)/18)
                }
                    contador=contador+1;
                }
            }
        break;
        case 19:
            var contador=0;
            for(let i=0;i<cantidadCursos;i++){
                while(contador<dataAlumnos.length){
                    //consulta PARA PROMEDIO POR CURSO Y ESTUDIANTE
                    const consulta1=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno, PromedioFinalCurso("+idCursos[0]+",a.idAlumno) as uno, PromedioFinalCurso("+idCursos[1]+",a.idAlumno) as dos, PromedioFinalCurso("+idCursos[2]+",a.idAlumno) as tres, PromedioFinalCurso("+idCursos[3]+",a.idAlumno) as cuatro, PromedioFinalCurso("+idCursos[4]+",a.idAlumno) as cinco, PromedioFinalCurso("+idCursos[5]+",a.idAlumno) as seis, PromedioFinalCurso("+idCursos[6]+",a.idAlumno) as siete,PromedioFinalCurso("+idCursos[7]+",a.idAlumno) as ocho,PromedioFinalCurso("+idCursos[8]+",a.idAlumno) as nueve,PromedioFinalCurso("+idCursos[9]+",a.idAlumno) as diez,PromedioFinalCurso("+idCursos[10]+",a.idAlumno) as once,PromedioFinalCurso("+idCursos[11]+",a.idAlumno) as doce,PromedioFinalCurso("+idCursos[12]+",a.idAlumno) as trece,PromedioFinalCurso("+idCursos[13]+",a.idAlumno) as catorce,PromedioFinalCurso("+idCursos[14]+",a.idAlumno) as quince,PromedioFinalCurso("+idCursos[15]+",a.idAlumno) as dieciseis,PromedioFinalCurso("+idCursos[16]+",a.idAlumno) as diecisiete,PromedioFinalCurso("+idCursos[17]+",a.idAlumno) as dieciocho,PromedioFinalCurso("+idCursos[18]+",a.idAlumno) as diecinueve FROM tbAlumno a INNER JOIN tbCurso c WHERE a.idAlumno=? GROUP BY a.idAlumno ORDER BY a.apellidos_alumno",[idAlumnos[contador]])
                    //array consultas
                    const notaArray1:any=Object.values(consulta1);
                   //chingo de arrays
                   temp[contador]={
                    alumno:notaArray1[0].alumno,
                    uno:notaArray1[0].uno,
                    dos:notaArray1[0].dos,
                    tres:notaArray1[0].tres,
                    cuatro:notaArray1[0].cuatro,
                    cinco:notaArray1[0].cinco,
                    seis:notaArray1[0].seis,
                    siete:notaArray1[0].site,
                    ocho:notaArray1[0].ocho,
                    nueve:notaArray1[0].nueve,
                    diez:notaArray1[0].diez,
                    once:notaArray1[0].once,
                    doce:notaArray1[0].doce,
                    trece:notaArray1[0].trece,
                    catorce:notaArray1[0].catorce,
                    quince:notaArray1[0].quince,
                    dieciseis:notaArray1[0].dieciseis,
                    diecisiete:notaArray1[0].diecisiete,
                    dieciocho:notaArray1[0].dieciocho,
                    diecinueve:notaArray1[0].diecinueve,
                    promedio:Math.round((notaArray1[0].uno+notaArray1[0].dos+notaArray1[0].tres+notaArray1[0].cuatro+notaArray1[0].cinco+notaArray1[0].seis+notaArray1[0].siete+notaArray1[0].ocho+notaArray1[0].nueve+notaArray1[0].diez+notaArray1[0].once+notaArray1[0].doce+notaArray1[0].trece+notaArray1[0].catorce+notaArray1[0].quince+notaArray1[0].dieciseis+notaArray1[0].diecisiete+notaArray1[0].dieciocho+notaArray1[0].diecinueve)/19)
                }
                    contador=contador+1;
                }
            }
        break;
        case 20:
            var contador=0;
            for(let i=0;i<cantidadCursos;i++){
                while(contador<dataAlumnos.length){
                    //consulta PARA PROMEDIO POR CURSO Y ESTUDIANTE
                    const consulta1=await conexion.query("SELECT CONCAT(a.apellidos_alumno,', ',a.nombres_alumno) as alumno, PromedioFinalCurso("+idCursos[0]+",a.idAlumno) as uno, PromedioFinalCurso("+idCursos[1]+",a.idAlumno) as dos, PromedioFinalCurso("+idCursos[2]+",a.idAlumno) as tres, PromedioFinalCurso("+idCursos[3]+",a.idAlumno) as cuatro, PromedioFinalCurso("+idCursos[4]+",a.idAlumno) as cinco, PromedioFinalCurso("+idCursos[5]+",a.idAlumno) as seis, PromedioFinalCurso("+idCursos[6]+",a.idAlumno) as siete,PromedioFinalCurso("+idCursos[7]+",a.idAlumno) as ocho,PromedioFinalCurso("+idCursos[8]+",a.idAlumno) as nueve,PromedioFinalCurso("+idCursos[9]+",a.idAlumno) as diez,PromedioFinalCurso("+idCursos[10]+",a.idAlumno) as once,PromedioFinalCurso("+idCursos[11]+",a.idAlumno) as doce,PromedioFinalCurso("+idCursos[12]+",a.idAlumno) as trece,PromedioFinalCurso("+idCursos[13]+",a.idAlumno) as catorce,PromedioFinalCurso("+idCursos[14]+",a.idAlumno) as quince,PromedioFinalCurso("+idCursos[15]+",a.idAlumno) as dieciseis,PromedioFinalCurso("+idCursos[16]+",a.idAlumno) as diecisiete,PromedioFinalCurso("+idCursos[17]+",a.idAlumno) as dieciocho,PromedioFinalCurso("+idCursos[18]+",a.idAlumno) as diecinueve,PromedioFinalCurso("+idCursos[19]+",a.idAlumno) as veinte FROM tbAlumno a INNER JOIN tbCurso c WHERE a.idAlumno=? GROUP BY a.idAlumno ORDER BY a.apellidos_alumno",[idAlumnos[contador]])
                    //array consultas
                    const notaArray1:any=Object.values(consulta1);
                   //chingo de arrays
                   temp[contador]={
                    alumno:notaArray1[0].alumno,
                    uno:notaArray1[0].uno,
                    dos:notaArray1[0].dos,
                    tres:notaArray1[0].tres,
                    cuatro:notaArray1[0].cuatro,
                    cinco:notaArray1[0].cinco,
                    seis:notaArray1[0].seis,
                    siete:notaArray1[0].site,
                    ocho:notaArray1[0].ocho,
                    nueve:notaArray1[0].nueve,
                    diez:notaArray1[0].diez,
                    once:notaArray1[0].once,
                    doce:notaArray1[0].doce,
                    trece:notaArray1[0].trece,
                    catorce:notaArray1[0].catorce,
                    quince:notaArray1[0].quince,
                    dieciseis:notaArray1[0].dieciseis,
                    diecisiete:notaArray1[0].diecisiete,
                    dieciocho:notaArray1[0].dieciocho,
                    diecinueve:notaArray1[0].diecinueve,
                    veinte:notaArray1[0].veinte,
                    promedio:Math.round((notaArray1[0].uno+notaArray1[0].dos+notaArray1[0].tres+notaArray1[0].cuatro+notaArray1[0].cinco+notaArray1[0].seis+notaArray1[0].siete+notaArray1[0].ocho+notaArray1[0].nueve+notaArray1[0].diez+notaArray1[0].once+notaArray1[0].doce+notaArray1[0].trece+notaArray1[0].catorce+notaArray1[0].quince+notaArray1[0].dieciseis+notaArray1[0].diecisiete+notaArray1[0].dieciocho+notaArray1[0].diecinueve+notaArray1[0].veinte)/20)
                }
                    contador=contador+1;
                }
            }
        break;
    }
    return temp
}
export {notasalumnosFinalService}
import conexion from "../config/database";

const GetAlumnosTotal=async()=>{

    const responseGet=await conexion.query('SELECT COUNT(idAlumno) AS CantidadAlumnos FROM tbAlumno');
    return responseGet;
}

const GetAlumnosTotalPorGrado=async()=>{ //Usé esta para contar a los alumnos según el género

    const responseGet=await conexion.query('SELECT sexo, COUNT(idAlumno) CantidadAlumno FROM tbAlumno group by sexo');
    return responseGet;
}

const GetAlumnosHombres=async()=>{

    const responseGet=await conexion.query('SELECT COUNT(idAlumno) AS nino FROM tbAlumno WHERE sexo=1');
    return responseGet;
}

const GetAlumnosMujeres=async()=>{

    const responseGet=await conexion.query('SELECT COUNT(idAlumno) AS nina FROM tbAlumno WHERE sexo=0');
    return responseGet;
}

const GetCodigosEnUso=async()=>{ //Usé esta para contar los códigos activos e inactivos

    const responseGet=await conexion.query('SELECT COUNT(activo) as activo FROM tbCodigo WHERE activo=1 group by activo');
    return responseGet;
}

const GetCodigosEnDesuso=async()=>{

    const responseGet=await conexion.query('SELECT COUNT(activo) as noActivo FROM tbCodigo WHERE activo=0');
    return responseGet;
}

const GetContrasenaProfesorCambiada=async()=>{  //Usé esta para contar las contraseñas cambiadas y no cambiadas
    const responseGet=await conexion.query('SELECT SUM(CASE WHEN cambio_contrasena = 1 THEN 1 ELSE 0 END) AS sicambio,SUM(CASE WHEN `cambio_contrasena` = 0 THEN 1 ELSE 0 END) AS nocambio FROM tbProfesor');
    return responseGet;
}

const GetCantidadGradosService=async()=>{
    
    const responseGet=await conexion.query('SELECT COUNT(idGrado) AS CantidadGrados FROM tbGrado');
    return responseGet;
}

const GetCantidadDocentesService=async()=>{

    const responseGet=await conexion.query('SELECT COUNT(idProfesor) AS CantidadProfesores FROM tbProfesor WHERE idRol>1');
    return responseGet;
}

const getAlmacenamientoGigasService=async()=>{
    const data=await conexion.query('SELECT SUM(peso_archivo) AS almacenamiento_ocupado FROM (SELECT peso_archivo FROM tbImagenPerfilProfesor UNION ALL SELECT peso_archivo FROM tbImagenPerfilAlumno UNION ALL SELECT peso_archivo FROM tbImagenCurso) AS subquery;')
    return data
}


export{getAlmacenamientoGigasService,GetAlumnosTotal,GetAlumnosTotalPorGrado,GetAlumnosHombres,GetAlumnosMujeres,GetCodigosEnUso, GetCodigosEnDesuso,GetContrasenaProfesorCambiada,GetCantidadGradosService,GetCantidadDocentesService}
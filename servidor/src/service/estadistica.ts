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

    const responseGet=await conexion.query('SELECT activo, COUNT(activo) as activo FROM tbCodigo group by activo');
    return responseGet;
}

const GetCodigosEnDesuso=async()=>{

    const responseGet=await conexion.query('SELECT COUNT(activo) as noActivo FROM tbCodigo WHERE activo=0');
    return responseGet;
}

const GetContrasenaProfesorCambiada=async()=>{  //Usé esta para contar las contraseñas cambiadas y no cambiadas
    const responseGet=await conexion.query('SELECT valores.cambio_contrasena AS cambio_contrasena, COUNT(tbProfesor.cambio_contrasena) AS CambioContra FROM (SELECT 0 AS cambio_contrasena UNION SELECT 1 AS cambio_contrasena) AS valores LEFT JOIN tbProfesor ON valores.cambio_contrasena = tbProfesor.cambio_contrasena GROUP BY valores.cambio_contrasena ORDER BY cambio_contrasena DESC');
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



export{GetAlumnosTotal,GetAlumnosTotalPorGrado,GetAlumnosHombres,GetAlumnosMujeres,GetCodigosEnUso, GetCodigosEnDesuso,GetContrasenaProfesorCambiada,GetCantidadGradosService,GetCantidadDocentesService}
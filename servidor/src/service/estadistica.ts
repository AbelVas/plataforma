import conexion from "../config/database";

const GetAlumnosTotal=async()=>{

    const responseGet=await conexion.query('SELECT COUNT(idAlumno) AS CantidadAlumnos FROM tbAlumno');
    return responseGet;
}

const GetAlumnosTotalPorGrado=async()=>{

    const responseGet=await conexion.query('SELECT al.idGrado,tg.nombre_grado, COUNT(al.idAlumno) CantidadAlumno FROM tbAlumno al INNER JOIN tbGrado tg ON al.idGrado=tg.idGrado group by al.idGrado');
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

const GetCodigosEnUso=async()=>{

    const responseGet=await conexion.query('SELECT COUNT(activo) as activo FROM tbCodigo WHERE activo=1');
    return responseGet;
}

const GetCodigosEnDesuso=async()=>{

    const responseGet=await conexion.query('SELECT COUNT(activo) as noActivo FROM tbCodigo WHERE activo=0');
    return responseGet;
}

const GetContrasenaProfesorCambiada=async()=>{

    const responseGet=await conexion.query('SELECT COUNT(cambio_contrasena) AS siCambioContra FROM tbProfesor WHERE cambio_contrasena=1');
    return responseGet;
}

const GetContrasenaProfesorNoCambiada=async()=>{

    const responseGet=await conexion.query('SELECT COUNT(cambio_contrasena) AS noCambioContra FROM tbProfesor WHERE cambio_contrasena=0');
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
export{GetAlumnosTotal,GetAlumnosTotalPorGrado,GetAlumnosHombres,GetAlumnosMujeres,GetCodigosEnUso, GetCodigosEnDesuso,GetContrasenaProfesorCambiada,GetContrasenaProfesorNoCambiada,GetCantidadGradosService,GetCantidadDocentesService}
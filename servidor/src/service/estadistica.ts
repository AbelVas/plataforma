import conexion from "../config/database";

const GetAlumnosTotal=async()=>{

    const responseGet=await conexion.query('SELECT COUNT(idAlumno) AS CantidadAlumnos FROM tbAlumno');
    return responseGet;
}

const GetAlumnosTotalPorGrado=async()=>{

    const responseGet=await conexion.query('SELECT idGrado, COUNT(idAlumno) CantidadAlumno FROM tbAlumno group by idGrado');
    return responseGet;
}

const GetAlumnosHombres=async()=>{

    const responseGet=await conexion.query('SELECT COUNT(*) AS nino FROM tbAlumno WHERE sexo=1');
    return responseGet;
}

const GetAlumnosMujeres=async()=>{

    const responseGet=await conexion.query('SELECT COUNT(*) AS nina FROM tbAlumno WHERE sexo=0');
    return responseGet;
}

const GetCodigosEnUso=async()=>{

    const responseGet=await conexion.query('SELECT COUNT(activo) as noActivo FROM tbCodigo WHERE activo=1');
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

export{GetAlumnosTotal,GetAlumnosTotalPorGrado,GetAlumnosHombres,GetAlumnosMujeres,GetCodigosEnUso, GetCodigosEnDesuso,GetContrasenaProfesorCambiada,GetContrasenaProfesorNoCambiada}
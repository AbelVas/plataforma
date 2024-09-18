import conexion from "../config/database";

// Obtener el total de alumnos
const GetAlumnosTotal = async () => {
    const responseGet = await conexion.query('SELECT COUNT(idAlumno) AS CantidadAlumnos FROM tbAlumno');
    return responseGet;
}
// Obtener el total de alumnos según el sexo
const GetAlumnosTotalPorSexo = async () => {
    const responseGet = await conexion.query('SELECT sexo, COUNT(idAlumno) AS CantidadAlumno FROM tbAlumno GROUP BY sexo');
    return responseGet;
}

// Obtener la cantidad de alumnos hombres
const GetAlumnosHombres = async () => {
    const responseGet = await conexion.query("SELECT COUNT(idAlumno) AS nino FROM tbAlumno WHERE sexo = '1'");
    return responseGet;
}

// Obtener la cantidad de alumnos mujeres
const GetAlumnosMujeres = async () => {
    const responseGet = await conexion.query("SELECT COUNT(idAlumno) AS nina FROM tbAlumno WHERE sexo = '0'");
    return responseGet;
}

// Obtener la cantidad de códigos en uso (activos)
const GetCodigosEnUso = async () => {
    const responseGet = await conexion.query('SELECT COUNT(*) AS activo FROM tbCodigo WHERE activo = 1');
    return responseGet;
}

// Obtener la cantidad de códigos en desuso (inactivos)
const GetCodigosEnDesuso = async () => {
    const responseGet = await conexion.query('SELECT COUNT(*) AS noActivo FROM tbCodigo WHERE activo = 0');
    return responseGet;
}

// Obtener el número de profesores que han cambiado su contraseña
const GetContrasenaProfesorCambiada = async () => {
    const responseGet = await conexion.query(`
        SELECT 
            SUM(CASE WHEN cambio_contrasena = '1' THEN 1 ELSE 0 END) AS sicambio,
            SUM(CASE WHEN cambio_contrasena = '0' THEN 1 ELSE 0 END) AS nocambio
        FROM tbProfesor
    `);
    return responseGet;
}

// Obtener la cantidad de grados en la escuela
const GetCantidadGradosService = async () => {
    const responseGet = await conexion.query('SELECT COUNT(idGrado) AS CantidadGrados FROM tbGrado');
    return responseGet;
}

// Obtener la cantidad de docentes (diferentes de admin)
const GetCantidadDocentesService = async () => {
    const responseGet = await conexion.query('SELECT COUNT(idProfesor) AS CantidadProfesores FROM tbProfesor WHERE idRol > 1');
    return responseGet;
}

// Obtener el almacenamiento total utilizado en gigas
const getAlmacenamientoGigasService = async () => {
    const data = await conexion.query(`
        SELECT SUM(peso_archivo) AS almacenamiento_ocupado 
        FROM (
            SELECT peso_archivo FROM tbImagenPerfilProfesor 
            UNION ALL 
            SELECT peso_archivo FROM tbImagenPerfilAlumno 
            UNION ALL 
            SELECT peso_archivo FROM tbImagenCurso 
            UNION ALL 
            SELECT peso_archivo FROM tbRenasPenalesPoliciales
        ) AS subquery
    `);
    return data;
}

export {
    getAlmacenamientoGigasService,
    GetAlumnosTotal,
    GetAlumnosTotalPorSexo,
    GetAlumnosHombres,
    GetAlumnosMujeres,
    GetCodigosEnUso,
    GetCodigosEnDesuso,
    GetContrasenaProfesorCambiada,
    GetCantidadGradosService,
    GetCantidadDocentesService
};

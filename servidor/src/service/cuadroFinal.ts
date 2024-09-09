import { Request } from "express";
import conexion from "../config/database";

const notasalumnosFinalService = async (idGrado: string) => {
    let idAlumnos: any[] = [];
    let temp: any[] = [];

    // Obtengo los alumnos del grado
    const dataAlumnos = await conexion.query("SELECT idAlumno FROM tbAlumno WHERE idGrado=? ORDER BY apellidos_alumno", [idGrado]);
    const alumnosArray = Object.values(dataAlumnos);

    // Sacamos los ids de los alumnos
    idAlumnos = alumnosArray.map((alumno: any) => alumno.idAlumno);

    // Obtengo los cursos del grado
    const dataCursos = await conexion.query("SELECT idCurso FROM tbCurso WHERE idGrado=? AND consolidado_anual=1", [idGrado]);
    const cursosArray = Object.values(dataCursos);
    const idCursos = cursosArray.map((curso: any) => curso.idCurso);

    const cantidadCursos = idCursos.length;

    // Consulta dinámica para obtener las notas y el promedio
    for (let alumnoId of idAlumnos) {
        const cursoPromedios = idCursos
            .map((idCurso, index) => `PromedioFinalCurso(${idCurso}, a.idAlumno) as curso${index + 1}`)
            .join(", ");

        const consultaSQL = `
            SELECT CONCAT(a.apellidos_alumno, ', ', a.nombres_alumno) as alumno, ${cursoPromedios}
            FROM tbAlumno a
            WHERE a.idAlumno=?
            GROUP BY a.idAlumno
            ORDER BY a.apellidos_alumno
        `;

        const consulta = await conexion.query(consultaSQL, [alumnoId]);
        const notaArray = Object.values(consulta)[0] as { [key: string]: any };  // Aquí tipamos notaArray como un objeto con claves de tipo string y valores de cualquier tipo.

        // Sumar las notas y calcular el promedio
        const sumaNotas = idCursos.reduce((sum, _, index) => sum + notaArray[`curso${index + 1}`], 0);
        const promedio = Math.round(sumaNotas / cantidadCursos);

        // Crear el objeto con los resultados
        const alumnoNotas = {
            alumno: notaArray.alumno,
            promedio,
            ...idCursos.reduce((acc, _, index) => ({ ...acc, [`curso${index + 1}`]: notaArray[`curso${index + 1}`] }), {})
        };

        temp.push(alumnoNotas);
    }

    return temp;
};

export {notasalumnosFinalService}
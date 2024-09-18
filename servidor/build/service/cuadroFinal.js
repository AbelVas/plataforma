"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notasalumnosFinalService = void 0;
const database_1 = __importDefault(require("../config/database"));
const notasalumnosFinalService = (idGrado) => __awaiter(void 0, void 0, void 0, function* () {
    let idAlumnos = [];
    let temp = [];
    // Obtengo los alumnos del grado
    const dataAlumnos = yield database_1.default.query("SELECT idAlumno FROM tbAlumno WHERE idGrado=? ORDER BY apellidos_alumno", [idGrado]);
    const alumnosArray = Object.values(dataAlumnos);
    // Sacamos los ids de los alumnos
    idAlumnos = alumnosArray.map((alumno) => alumno.idAlumno);
    // Obtengo los cursos del grado
    const dataCursos = yield database_1.default.query("SELECT idCurso FROM tbCurso WHERE idGrado=? AND consolidado_anual=1", [idGrado]);
    const cursosArray = Object.values(dataCursos);
    const idCursos = cursosArray.map((curso) => curso.idCurso);
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
        const consulta = yield database_1.default.query(consultaSQL, [alumnoId]);
        const notaArray = Object.values(consulta)[0]; // Aquí tipamos notaArray como un objeto con claves de tipo string y valores de cualquier tipo.
        // Sumar las notas y calcular el promedio
        const sumaNotas = idCursos.reduce((sum, _, index) => sum + notaArray[`curso${index + 1}`], 0);
        const promedio = Math.round(sumaNotas / cantidadCursos);
        // Crear el objeto con los resultados
        const alumnoNotas = Object.assign({ alumno: notaArray.alumno, promedio }, idCursos.reduce((acc, _, index) => (Object.assign(Object.assign({}, acc), { [`curso${index + 1}`]: notaArray[`curso${index + 1}`] })), {}));
        temp.push(alumnoNotas);
    }
    return temp;
});
exports.notasalumnosFinalService = notasalumnosFinalService;

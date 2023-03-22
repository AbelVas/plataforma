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
exports.alumnoNotasBoletaService = exports.alumnosGradoService = void 0;
const database_1 = __importDefault(require("../config/database"));
const alumnosGradoService = (idGrado, idAlumno) => __awaiter(void 0, void 0, void 0, function* () {
    const dataAlumnos = yield database_1.default.query("SELECT al.idAlumno,CONCAT(al.nombres_alumno,' ',al.apellidos_alumno)as alumno,g.nombre_grado,s.seccion FROM (tbAlumno al INNER JOIN tbGrado g ON al.idGrado=g.idGrado)INNER JOIN tbSeccion s ON s.idSeccion=g.idSeccion WHERE g.idGrado=? and al.idAlumno=? order by apellidos_alumno", [idGrado, idAlumno]);
    return dataAlumnos;
});
exports.alumnosGradoService = alumnosGradoService;
const alumnoNotasBoletaService = (idGrado, idAlumno) => __awaiter(void 0, void 0, void 0, function* () {
    var temp = [];
    //const dataAlumnos=await conexion.query("SELECT al.idAlumno,CONCAT(al.nombres_alumno,' ',al.apellidos_alumno)as alumno,g.nombre_grado,s.seccion FROM (tbAlumno al INNER JOIN tbGrado g ON al.idGrado=g.idGrado)INNER JOIN tbSeccion s ON s.idSeccion=g.idSeccion WHERE g.idGrado=? and al.idAlumno=? order by apellidos_alumno",[idGrado,idAlumno]);
    //QUERY fINAL
    const cursosNotas = yield database_1.default.query("select c.nombre_curso,fTNOTA(1,c.idCurso," + idAlumno + ") as I,fTNOTA(2,c.idCurso," + idAlumno + ") as II,fTNOTA(3,c.idCurso," + idAlumno + ") as III, fTNOTA(4,c.idCurso," + idAlumno + ") as IV FROM tbCurso c where c.idGrado=" + idGrado + " and c.boletas=1");
    const notaArray = Object.values(cursosNotas);
    for (let i = 0; i < notaArray.length; i++) {
        temp[i] = {
            curso: notaArray[i].nombre_curso,
            uno: notaArray[i].I,
            dos: notaArray[i].II,
            tres: notaArray[i].III,
            cuatro: notaArray[i].IV,
            promedio: Math.round((notaArray[i].I + notaArray[i].II + notaArray[i].III + notaArray[i].IV) / 4)
        };
    }
    return temp;
});
exports.alumnoNotasBoletaService = alumnoNotasBoletaService;

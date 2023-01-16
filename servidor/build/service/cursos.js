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
exports.obtenerProfePorCurso = exports.obtenerCursosPorAlumnoService = exports.obtenerCursosPorProfesorGradoSeccionService = exports.obtenerCursosPorGradoProfesorService = exports.obtenerCursosPorProfesorService = exports.obtenerCursosPorGradoService = exports.insertCursosService = exports.deleteCursosService = exports.updateCursosService = exports.obtenerCursoService = exports.obtenerCursosService = exports.obtenerCursosPorGradoProfesorAdminService = void 0;
const database_1 = __importDefault(require("../config/database"));
const obtenerCursosService = () => __awaiter(void 0, void 0, void 0, function* () {
    const responseGet = yield database_1.default.query('SELECT `idCurso`, `nombre_curso`, `abreviatura`, `creado`, `consolidado_bimestre`, `consolidado_anual`, `boletas`  FROM tbCurso');
    return responseGet;
});
exports.obtenerCursosService = obtenerCursosService;
const obtenerCursoService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const responseGet = yield database_1.default.query('SELECT c.idCurso, g.nombre_grado, c.nombre_curso, c.abreviatura, c.creado, c.consolidado_bimestre, c.consolidado_anual, c.boletas, c.idGrado, s.seccion, p.nombre_profesor, p.apellido_profesor, p.idProfesor FROM tbCurso c INNER JOIN tbGrado g ON c.idGrado=g.idGrado INNER JOIN tbSeccion s ON g.idSeccion=s.idSeccion INNER JOIN tbProfesor p ON c.idProfesor=p.idProfesor WHERE idCurso=?', [id]);
    return responseGet;
});
exports.obtenerCursoService = obtenerCursoService;
const updateCursosService = (data, id) => __awaiter(void 0, void 0, void 0, function* () {
    const responseUpdate = yield database_1.default.query('UPDATE tbCurso SET ? WHERE idCurso=?', [data, id]);
    return responseUpdate;
});
exports.updateCursosService = updateCursosService;
const deleteCursosService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const responseDelete = yield database_1.default.query('DELETE FROM tbCurso WHERE idCurso=?', [id]);
    return responseDelete;
});
exports.deleteCursosService = deleteCursosService;
const insertCursosService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const responseInsert = yield database_1.default.query('INSERT INTO tbCurso set ?', [data]);
    return responseInsert;
});
exports.insertCursosService = insertCursosService;
const obtenerCursosPorGradoService = (idGrado) => __awaiter(void 0, void 0, void 0, function* () {
    const responseGet = yield database_1.default.query('SELECT `idCurso`, `nombre_curso`, `abreviatura`, `creado`, `consolidado_bimestre`, `consolidado_anual`, `boletas` FROM tbCurso WHERE idGrado=?', idGrado);
    return responseGet;
});
exports.obtenerCursosPorGradoService = obtenerCursosPorGradoService;
const obtenerCursosPorProfesorService = (idProfesor) => __awaiter(void 0, void 0, void 0, function* () {
    const responseGet = yield database_1.default.query('SELECT c.idCurso, g.nombre_grado, n.nivel, n.idJornada, s.seccion, j.jornada, c.nombre_curso, c.idProfesor, c.abreviatura, c.creado, c.consolidado_bimestre, c.consolidado_anual, c.boletas, c.idGrado, c.color_curso FROM tbCurso c INNER JOIN tbGrado g ON c.idGrado=g.idGrado INNER JOIN tbNivel n ON g.idNivel=n.idNivel INNER JOIN tbSeccion s ON g.idSeccion=s.idSeccion INNER JOIN tbJornada j ON n.idJornada=j.idJornada WHERE idProfesor=?', idProfesor);
    return responseGet;
});
exports.obtenerCursosPorProfesorService = obtenerCursosPorProfesorService;
const obtenerCursosPorGradoProfesorService = (idGrado) => __awaiter(void 0, void 0, void 0, function* () {
    const responseGet = yield database_1.default.query('SELECT c.idCurso,c.nombre_curso,CONCAT(p.nombre_profesor," ",p.apellido_profesor) as profesor,p.idProfesor,c.consolidado_bimestre,c.consolidado_anual,c.boletas,c.abreviatura FROM (tbCurso c INNER JOIN tbGrado g ON c.idGrado=g.idGrado)INNER JOIN tbProfesor p ON p.idProfesor=c.idProfesor where g.idGrado=?', [idGrado]);
    return responseGet;
});
exports.obtenerCursosPorGradoProfesorService = obtenerCursosPorGradoProfesorService;
const obtenerCursosPorProfesorGradoSeccionService = (idProfesor, idCurso) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield database_1.default.query('SELECT c.idCurso,c.nombre_curso,c.abreviatura,c.creado,c.consolidado_bimestre,c.consolidado_anual,c.boletas,CONCAT(g.nombre_grado,", Sección: ",s.seccion) AS grado FROM (tbCurso c INNER JOIN tbGrado g ON g.idGrado=c.idGrado)INNER JOIN tbSeccion s ON s.idSeccion=g.idSeccion WHERE idProfesor=? and c.idCurso!=?', [idProfesor, idCurso.idCurso]);
    return response;
});
exports.obtenerCursosPorProfesorGradoSeccionService = obtenerCursosPorProfesorGradoSeccionService;
const obtenerCursosPorAlumnoService = (idAlumno) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield database_1.default.query('SELECT c.idCurso,g.idGrado,p.idProfesor,c.nombre_curso,al.idAlumno,CONCAT(g.nombre_grado,", ",s.seccion) AS grado, CONCAT(p.nombre_profesor," ",p.apellido_profesor) as profesor, c.color_curso FROM (((tbGrado g INNER JOIN tbCurso c ON c.idGrado=g.idGrado)INNER JOIN tbAlumno al ON al.idGrado=g.idGrado)INNER JOIN tbSeccion s ON s.idSeccion=g.idSeccion)INNER JOIN tbProfesor p ON p.idProfesor=c.idProfesor WHERE al.idAlumno=?', [idAlumno]);
    return response;
});
exports.obtenerCursosPorAlumnoService = obtenerCursosPorAlumnoService;
const obtenerProfePorCurso = (idCurso) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield database_1.default.query('SELECT CONCAT(tp.nombre_profesor," ",tp.apellido_profesor) as NombreProfesor FROM tbCurso tc INNER JOIN tbProfesor tp ON tc.idProfesor=tp.idProfesor where tc.idCurso=? ', [idCurso]);
    return response;
});
exports.obtenerProfePorCurso = obtenerProfePorCurso;
const obtenerCursosPorGradoProfesorAdminService = (idGrado) => __awaiter(void 0, void 0, void 0, function* () {
    const responseGet = yield database_1.default.query('SELECT c.idCurso,c.nombre_curso,CONCAT(p.nombre_profesor," ",p.apellido_profesor) as profesor,p.idProfesor,c.consolidado_bimestre,c.consolidado_anual,c.boletas,c.abreviatura FROM (tbCurso c INNER JOIN tbGrado g ON c.idGrado=g.idGrado)INNER JOIN tbProfesor p ON p.idProfesor=c.idProfesor where g.idGrado=?', [idGrado]);
    return responseGet;
});
exports.obtenerCursosPorGradoProfesorAdminService = obtenerCursosPorGradoProfesorAdminService;

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
exports.GetGradoSeccionService = exports.getGradoProfesorService = exports.getGradoxJornada = exports.getGradoNivelService = exports.insertGradoService = exports.deleteGradoService = exports.updateGradoService = exports.GetGradoService = exports.GetGradosService = void 0;
const database_1 = __importDefault(require("../config/database"));
// Mi primer Appi Queza
const GetGradosService = () => __awaiter(void 0, void 0, void 0, function* () {
    const responseGet = yield database_1.default.query('SELECT g.`idGrado`,g.`nombre_grado`, s.seccion,n.nivel, g.`estatus` FROM (tbGrado g INNER JOIN tbSeccion s ON s.idSeccion=g.idSeccion) INNER JOIN tbNivel n ON n.idNivel=g.idNivel INNER JOIN tbJornada j ON j.idJornada=n.idJornada ORDER BY g.idGrado');
    return responseGet;
});
exports.GetGradosService = GetGradosService;
const GetGradoService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const responseGet = yield database_1.default.query('SELECT `idGrado`, `idSeccion`, `nombre_grado`, `estatus` FROM tbGrado WHERE idGrado=?', [id]);
    return responseGet;
});
exports.GetGradoService = GetGradoService;
const updateGradoService = (data, id) => __awaiter(void 0, void 0, void 0, function* () {
    const responseUpdate = yield database_1.default.query('UPDATE tbGrado SET ? WHERE idGrado=?', [data, id]);
    return responseUpdate;
});
exports.updateGradoService = updateGradoService;
const deleteGradoService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const responseDelete = yield database_1.default.query('DELETE FROM tbGrado WHERE idGrado=?', [id]);
    return responseDelete;
});
exports.deleteGradoService = deleteGradoService;
const insertGradoService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const responseInsert = yield database_1.default.query('INSERT INTO tbGrado set ?', [data]);
    return responseInsert;
});
exports.insertGradoService = insertGradoService;
const getGradoNivelService = (idNivel) => __awaiter(void 0, void 0, void 0, function* () {
    const responseGetNivel = yield database_1.default.query('SELECT g.idGrado,g.idNivel,g.idSeccion,n.idJornada,g.nombre_grado,s.seccion,n.nivel,g.estatus,count(al.idAlumno) as Alumnos,j.jornada FROM (((tbGrado g INNER JOIN tbNivel n ON n.idNivel=g.idNivel)INNER JOIN tbJornada j ON j.idJornada=n.idJornada)INNER JOIN tbSeccion s ON s.idSeccion=g.idSeccion)LEFT JOIN tbAlumno al ON al.idGrado=g.idGrado WHERE n.idNivel=?  group by g.idGrado ORDER BY n.idNivel,g.idGrado', [idNivel]);
    return responseGetNivel;
});
exports.getGradoNivelService = getGradoNivelService;
const getGradoProfesorService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const responseGetGradoProfesor = yield database_1.default.query('SELECT c.idGrado, g.idNivel, g.idSeccion, g.nombre_grado, g.estatus FROM tbGrado g INNER JOIN tbCurso c ON c.idGrado=g.idGrado WHERE idProfesor=? GROUP BY idGrado', [id]);
    return responseGetGradoProfesor;
});
exports.getGradoProfesorService = getGradoProfesorService;
const getGradoxJornada = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const responseGradoJornada = yield database_1.default.query('SELECT g.idGrado,g.idNivel,g.idSeccion,g.nombre_grado,s.seccion,n.nivel,g.estatus,count(al.idAlumno) as Alumnos FROM (((tbGrado g INNER JOIN tbNivel n ON n.idNivel=g.idNivel)INNER JOIN tbJornada j ON j.idJornada=n.idJornada)INNER JOIN tbSeccion s ON s.idSeccion=g.idSeccion)LEFT JOIN tbAlumno al ON al.idGrado=g.idGrado WHERE j.idJornada=?  group by g.nombre_grado ORDER BY n.idNivel,g.idGrado', [id]);
    return responseGradoJornada;
});
exports.getGradoxJornada = getGradoxJornada;
const GetGradoSeccionService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const responseGet = yield database_1.default.query('SELECT g.idGrado, s.seccion, n.nivel, g.nombre_grado, j.jornada FROM ((tbGrado g INNER JOIN tbSeccion s ON s.idSeccion=g.idSeccion)INNER JOIN tbNivel n ON n.idNivel=g.idNivel)INNER JOIN tbJornada j ON j.idJornada=n.idJornada WHERE idGrado=?', [id]);
    return responseGet;
});
exports.GetGradoSeccionService = GetGradoSeccionService;

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
exports.GetCantidadDocentesService = exports.GetCantidadGradosService = exports.GetContrasenaProfesorCambiada = exports.GetCodigosEnDesuso = exports.GetCodigosEnUso = exports.GetAlumnosMujeres = exports.GetAlumnosHombres = exports.GetAlumnosTotalPorGrado = exports.GetAlumnosTotal = exports.getAlmacenamientoGigasService = void 0;
const database_1 = __importDefault(require("../config/database"));
const GetAlumnosTotal = () => __awaiter(void 0, void 0, void 0, function* () {
    const responseGet = yield database_1.default.query('SELECT COUNT(idAlumno) AS CantidadAlumnos FROM tbAlumno');
    return responseGet;
});
exports.GetAlumnosTotal = GetAlumnosTotal;
const GetAlumnosTotalPorGrado = () => __awaiter(void 0, void 0, void 0, function* () {
    const responseGet = yield database_1.default.query('SELECT sexo, COUNT(idAlumno) CantidadAlumno FROM tbAlumno group by sexo');
    return responseGet;
});
exports.GetAlumnosTotalPorGrado = GetAlumnosTotalPorGrado;
const GetAlumnosHombres = () => __awaiter(void 0, void 0, void 0, function* () {
    const responseGet = yield database_1.default.query('SELECT COUNT(idAlumno) AS nino FROM tbAlumno WHERE sexo=1');
    return responseGet;
});
exports.GetAlumnosHombres = GetAlumnosHombres;
const GetAlumnosMujeres = () => __awaiter(void 0, void 0, void 0, function* () {
    const responseGet = yield database_1.default.query('SELECT COUNT(idAlumno) AS nina FROM tbAlumno WHERE sexo=0');
    return responseGet;
});
exports.GetAlumnosMujeres = GetAlumnosMujeres;
const GetCodigosEnUso = () => __awaiter(void 0, void 0, void 0, function* () {
    const responseGet = yield database_1.default.query('SELECT COUNT(activo) as activo FROM tbCodigo WHERE activo=1 group by activo');
    return responseGet;
});
exports.GetCodigosEnUso = GetCodigosEnUso;
const GetCodigosEnDesuso = () => __awaiter(void 0, void 0, void 0, function* () {
    const responseGet = yield database_1.default.query('SELECT COUNT(activo) as noActivo FROM tbCodigo WHERE activo=0');
    return responseGet;
});
exports.GetCodigosEnDesuso = GetCodigosEnDesuso;
const GetContrasenaProfesorCambiada = () => __awaiter(void 0, void 0, void 0, function* () {
    const responseGet = yield database_1.default.query('SELECT SUM(CASE WHEN cambio_contrasena = 1 THEN 1 ELSE 0 END) AS sicambio,SUM(CASE WHEN `cambio_contrasena` = 0 THEN 1 ELSE 0 END) AS nocambio FROM tbProfesor');
    return responseGet;
});
exports.GetContrasenaProfesorCambiada = GetContrasenaProfesorCambiada;
const GetCantidadGradosService = () => __awaiter(void 0, void 0, void 0, function* () {
    const responseGet = yield database_1.default.query('SELECT COUNT(idGrado) AS CantidadGrados FROM tbGrado');
    return responseGet;
});
exports.GetCantidadGradosService = GetCantidadGradosService;
const GetCantidadDocentesService = () => __awaiter(void 0, void 0, void 0, function* () {
    const responseGet = yield database_1.default.query('SELECT COUNT(idProfesor) AS CantidadProfesores FROM tbProfesor WHERE idRol>1');
    return responseGet;
});
exports.GetCantidadDocentesService = GetCantidadDocentesService;
const getAlmacenamientoGigasService = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield database_1.default.query('SELECT SUM(peso_archivo) AS almacenamiento_ocupado FROM (SELECT peso_archivo FROM tbImagenPerfilProfesor UNION ALL SELECT peso_archivo FROM tbImagenPerfilAlumno UNION ALL SELECT peso_archivo FROM tbImagenCurso UNION ALL SELECT peso_archivo FROM tbRenasPenalesPoliciales) AS subquery;');
    return data;
});
exports.getAlmacenamientoGigasService = getAlmacenamientoGigasService;

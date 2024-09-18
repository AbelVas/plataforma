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
exports.GetCantidadDocentesService = exports.GetCantidadGradosService = exports.GetContrasenaProfesorCambiada = exports.GetCodigosEnDesuso = exports.GetCodigosEnUso = exports.GetAlumnosMujeres = exports.GetAlumnosHombres = exports.GetAlumnosTotalPorSexo = exports.GetAlumnosTotal = exports.getAlmacenamientoGigasService = void 0;
const database_1 = __importDefault(require("../config/database"));
// Obtener el total de alumnos
const GetAlumnosTotal = () => __awaiter(void 0, void 0, void 0, function* () {
    const responseGet = yield database_1.default.query('SELECT COUNT(idAlumno) AS CantidadAlumnos FROM tbAlumno');
    return responseGet;
});
exports.GetAlumnosTotal = GetAlumnosTotal;
// Obtener el total de alumnos según el sexo
const GetAlumnosTotalPorSexo = () => __awaiter(void 0, void 0, void 0, function* () {
    const responseGet = yield database_1.default.query('SELECT sexo, COUNT(idAlumno) AS CantidadAlumno FROM tbAlumno GROUP BY sexo');
    return responseGet;
});
exports.GetAlumnosTotalPorSexo = GetAlumnosTotalPorSexo;
// Obtener la cantidad de alumnos hombres
const GetAlumnosHombres = () => __awaiter(void 0, void 0, void 0, function* () {
    const responseGet = yield database_1.default.query("SELECT COUNT(idAlumno) AS nino FROM tbAlumno WHERE sexo = '1'");
    return responseGet;
});
exports.GetAlumnosHombres = GetAlumnosHombres;
// Obtener la cantidad de alumnos mujeres
const GetAlumnosMujeres = () => __awaiter(void 0, void 0, void 0, function* () {
    const responseGet = yield database_1.default.query("SELECT COUNT(idAlumno) AS nina FROM tbAlumno WHERE sexo = '0'");
    return responseGet;
});
exports.GetAlumnosMujeres = GetAlumnosMujeres;
// Obtener la cantidad de códigos en uso (activos)
const GetCodigosEnUso = () => __awaiter(void 0, void 0, void 0, function* () {
    const responseGet = yield database_1.default.query('SELECT COUNT(*) AS activo FROM tbCodigo WHERE activo = 1');
    return responseGet;
});
exports.GetCodigosEnUso = GetCodigosEnUso;
// Obtener la cantidad de códigos en desuso (inactivos)
const GetCodigosEnDesuso = () => __awaiter(void 0, void 0, void 0, function* () {
    const responseGet = yield database_1.default.query('SELECT COUNT(*) AS noActivo FROM tbCodigo WHERE activo = 0');
    return responseGet;
});
exports.GetCodigosEnDesuso = GetCodigosEnDesuso;
// Obtener el número de profesores que han cambiado su contraseña
const GetContrasenaProfesorCambiada = () => __awaiter(void 0, void 0, void 0, function* () {
    const responseGet = yield database_1.default.query(`
        SELECT 
            SUM(CASE WHEN cambio_contrasena = '1' THEN 1 ELSE 0 END) AS sicambio,
            SUM(CASE WHEN cambio_contrasena = '0' THEN 1 ELSE 0 END) AS nocambio
        FROM tbProfesor
    `);
    return responseGet;
});
exports.GetContrasenaProfesorCambiada = GetContrasenaProfesorCambiada;
// Obtener la cantidad de grados en la escuela
const GetCantidadGradosService = () => __awaiter(void 0, void 0, void 0, function* () {
    const responseGet = yield database_1.default.query('SELECT COUNT(idGrado) AS CantidadGrados FROM tbGrado');
    return responseGet;
});
exports.GetCantidadGradosService = GetCantidadGradosService;
// Obtener la cantidad de docentes (diferentes de admin)
const GetCantidadDocentesService = () => __awaiter(void 0, void 0, void 0, function* () {
    const responseGet = yield database_1.default.query('SELECT COUNT(idProfesor) AS CantidadProfesores FROM tbProfesor WHERE idRol > 1');
    return responseGet;
});
exports.GetCantidadDocentesService = GetCantidadDocentesService;
// Obtener el almacenamiento total utilizado en gigas
const getAlmacenamientoGigasService = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield database_1.default.query(`
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
});
exports.getAlmacenamientoGigasService = getAlmacenamientoGigasService;

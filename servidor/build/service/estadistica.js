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
exports.GetCantidadDocentesService = exports.GetCantidadGradosService = exports.GetContrasenaProfesorNoCambiada = exports.GetContrasenaProfesorCambiada = exports.GetCodigosEnDesuso = exports.GetCodigosEnUso = exports.GetAlumnosMujeres = exports.GetAlumnosHombres = exports.GetAlumnosTotalPorGrado = exports.GetAlumnosTotal = void 0;
const database_1 = __importDefault(require("../config/database"));
const GetAlumnosTotal = () => __awaiter(void 0, void 0, void 0, function* () {
    const responseGet = yield database_1.default.query('SELECT COUNT(idAlumno) AS CantidadAlumnos FROM tbAlumno');
    return responseGet;
});
exports.GetAlumnosTotal = GetAlumnosTotal;
const GetAlumnosTotalPorGrado = () => __awaiter(void 0, void 0, void 0, function* () {
    const responseGet = yield database_1.default.query('SELECT idGrado, COUNT(idAlumno) CantidadAlumno FROM tbAlumno group by idGrado');
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
    const responseGet = yield database_1.default.query('SELECT COUNT(activo) as activo FROM tbCodigo WHERE activo=1');
    return responseGet;
});
exports.GetCodigosEnUso = GetCodigosEnUso;
const GetCodigosEnDesuso = () => __awaiter(void 0, void 0, void 0, function* () {
    const responseGet = yield database_1.default.query('SELECT COUNT(activo) as noActivo FROM tbCodigo WHERE activo=0');
    return responseGet;
});
exports.GetCodigosEnDesuso = GetCodigosEnDesuso;
const GetContrasenaProfesorCambiada = () => __awaiter(void 0, void 0, void 0, function* () {
    const responseGet = yield database_1.default.query('SELECT COUNT(cambio_contrasena) AS siCambioContra FROM tbProfesor WHERE cambio_contrasena=1');
    return responseGet;
});
exports.GetContrasenaProfesorCambiada = GetContrasenaProfesorCambiada;
const GetContrasenaProfesorNoCambiada = () => __awaiter(void 0, void 0, void 0, function* () {
    const responseGet = yield database_1.default.query('SELECT COUNT(cambio_contrasena) AS noCambioContra FROM tbProfesor WHERE cambio_contrasena=0');
    return responseGet;
});
exports.GetContrasenaProfesorNoCambiada = GetContrasenaProfesorNoCambiada;
const GetCantidadGradosService = () => __awaiter(void 0, void 0, void 0, function* () {
    const responseGet = yield database_1.default.query('SELECT COUNT(idGrado) AS CantidadGrados FROM tbGrado');
    return responseGet;
});
exports.GetCantidadGradosService = GetCantidadGradosService;
const GetCantidadDocentesService = () => __awaiter(void 0, void 0, void 0, function* () {
    const responseGet = yield database_1.default.query('SELECT COUNT(idProfesor) AS CantidadProfesores FROM tbProfesor');
    return responseGet;
});
exports.GetCantidadDocentesService = GetCantidadDocentesService;

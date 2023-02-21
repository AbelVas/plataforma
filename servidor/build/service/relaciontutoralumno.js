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
exports.getTutorAlumnoService = void 0;
const database_1 = __importDefault(require("../config/database"));
const getTutorAlumnoService = (idTutor) => __awaiter(void 0, void 0, void 0, function* () {
    const responseGetTutorAlumno = yield database_1.default.query('SELECT r.idAlumno, r.idTutor, a.nombres_alumno, a.apellidos_alumno, a.sexo, a.usuario, g.idGrado, g.nombre_grado, s.idSeccion, s.seccion, c.codigo FROM tbReacionAlumnoTutor r INNER JOIN tbAlumno a ON r.idAlumno=a.idAlumno INNER JOIN tbGrado g ON a.idGrado=g.idGrado INNER JOIN tbSeccion s ON g.idSeccion=s.idSeccion INNER JOIN tbCodigo c ON a.idCodigo=c.idCodigo WHERE r.idTutor=?', [idTutor]);
    return responseGetTutorAlumno;
});
exports.getTutorAlumnoService = getTutorAlumnoService;

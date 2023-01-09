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
exports.obtenerAdminService = exports.obtenerAdminsService = exports.obtenerProfesorService = exports.obtenerProfesoresService = exports.obtenerAlumnoService = exports.obtenerAlumnosService = void 0;
const database_1 = __importDefault(require("../config/database"));
const obtenerAdminService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const respuesta = yield database_1.default.query("SELECT * FROM tbProfesor WHERE idProfesor=? and idRol=1", [id]);
    return respuesta;
});
exports.obtenerAdminService = obtenerAdminService;
const obtenerAdminsService = () => __awaiter(void 0, void 0, void 0, function* () {
    const respuesta = yield database_1.default.query("SELECT * FROM tbProfesor WHERE idRol=1");
    return respuesta;
});
exports.obtenerAdminsService = obtenerAdminsService;
const obtenerProfesorService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const respuesta = yield database_1.default.query("SELECT * FROM tbProfesor WHERE idProfesor=? and idRol=2", [id]);
    return respuesta;
});
exports.obtenerProfesorService = obtenerProfesorService;
const obtenerProfesoresService = () => __awaiter(void 0, void 0, void 0, function* () {
    const respuesta = yield database_1.default.query("SELECT * FROM tbProfesor WHERE idRol=2");
    return respuesta;
});
exports.obtenerProfesoresService = obtenerProfesoresService;
const obtenerAlumnoService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const respuesta = yield database_1.default.query("SELECT * FROM tbAlumno WHERE idAlumno=?", [id]);
    return respuesta;
});
exports.obtenerAlumnoService = obtenerAlumnoService;
const obtenerAlumnosService = () => __awaiter(void 0, void 0, void 0, function* () {
    const respuesta = yield database_1.default.query("SELECT * FROM tbAlumno");
    return respuesta;
});
exports.obtenerAlumnosService = obtenerAlumnosService;

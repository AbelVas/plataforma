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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAlumnos = exports.getAlumno = exports.getProfesores = exports.getProfesor = exports.getAdmins = exports.getAdmin = void 0;
const error_handle_1 = require("../utils/error.handle");
const listarUsuarios_1 = require("../service/listarUsuarios");
const getAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultadoUnidades = yield (0, listarUsuarios_1.obtenerAdminService)(id);
        res.send(resultadoUnidades);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.getAdmin = getAdmin;
const getAdmins = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultadoUnidades = yield (0, listarUsuarios_1.obtenerAdminsService)();
        res.send(resultadoUnidades);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.getAdmins = getAdmins;
const getProfesor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultadoUnidades = yield (0, listarUsuarios_1.obtenerProfesorService)(id);
        res.send(resultadoUnidades);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.getProfesor = getProfesor;
const getProfesores = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultadoUnidades = yield (0, listarUsuarios_1.obtenerProfesoresService)();
        res.send(resultadoUnidades);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.getProfesores = getProfesores;
const getAlumno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultadoUnidades = yield (0, listarUsuarios_1.obtenerAlumnoService)(id);
        res.send(resultadoUnidades);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.getAlumno = getAlumno;
const getAlumnos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultadoUnidades = yield (0, listarUsuarios_1.obtenerAlumnosService)();
        res.send(resultadoUnidades);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.getAlumnos = getAlumnos;

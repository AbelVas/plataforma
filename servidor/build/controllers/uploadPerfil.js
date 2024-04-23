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
exports.actualizaraPerfilProfesor = exports.actualizaraPerfilAlumno = exports.actualizaraPerfilTutor = exports.actualizaraPerfilAdmin = void 0;
const error_handle_1 = require("../utils/error.handle");
const uploadPerfil_1 = require("../service/uploadPerfil");
const actualizaraPerfilAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const response = yield (0, uploadPerfil_1.actualizaraPerfilAdminService)(id, req.body);
        res.send(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.actualizaraPerfilAdmin = actualizaraPerfilAdmin;
const actualizaraPerfilTutor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const response = yield (0, uploadPerfil_1.actualizaraPerfilTutorService)(id, req.body);
        res.send(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.actualizaraPerfilTutor = actualizaraPerfilTutor;
const actualizaraPerfilAlumno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const response = yield (0, uploadPerfil_1.actualizaraPerfilAlumnoService)(id, req.body);
        res.send(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.actualizaraPerfilAlumno = actualizaraPerfilAlumno;
const actualizaraPerfilProfesor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const response = yield (0, uploadPerfil_1.actualizaraPerfilProfesorService)(id, req.body);
        res.send(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.actualizaraPerfilProfesor = actualizaraPerfilProfesor;

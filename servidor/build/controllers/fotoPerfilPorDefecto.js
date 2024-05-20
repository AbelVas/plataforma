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
exports.obtenerCategoriaImagen = exports.obtenerImagenCategoria = exports.obtenerImagenSubidUsuarioProfesorController = exports.obtenerImagenSubidUsuarioAlumnoController = exports.actualizarPefilAlumnoController = exports.actualizarPefilProfesorController = exports.getImagenesSubidasPorProfesorCursoController = void 0;
const fotoPerfilPorDefecto_1 = require("../service/fotoPerfilPorDefecto");
const error_handle_1 = require("../utils/error.handle");
const app_1 = require("../app"); // Importa el objeto de Socket.io
const obtenerImagenCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const response = yield (0, fotoPerfilPorDefecto_1.obtenerImagenCategoriaService)(id);
        res.send(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.obtenerImagenCategoria = obtenerImagenCategoria;
const obtenerCategoriaImagen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, fotoPerfilPorDefecto_1.obtenerCatecoriaImagenService)();
        res.send(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.obtenerCategoriaImagen = obtenerCategoriaImagen;
const obtenerImagenSubidUsuarioAlumnoController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const response = yield (0, fotoPerfilPorDefecto_1.obtenerImagenSubidUsuarioAlumno)(id);
        res.send(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.obtenerImagenSubidUsuarioAlumnoController = obtenerImagenSubidUsuarioAlumnoController;
const obtenerImagenSubidUsuarioProfesorController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const response = yield (0, fotoPerfilPorDefecto_1.obtenerImagenSubidUsuarioProfesor)(id);
        res.send(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.obtenerImagenSubidUsuarioProfesorController = obtenerImagenSubidUsuarioProfesorController;
const actualizarPefilProfesorController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { ruta_imagen } = req.body;
        const { subida } = req.body;
        const { idRol } = req.body;
        const response = yield (0, fotoPerfilPorDefecto_1.ActualizarImagenPerfilProfesor)(id, ruta_imagen, subida);
        if (idRol == "1") {
            app_1.io.emit('actualizar-foto-perfil-admin', { usuario: id, idRol: idRol });
        }
        else if (idRol == "2") {
            app_1.io.emit('actualizar-foto-ferfil-docente', { usuario: id, idRol: idRol });
        }
        res.send(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.actualizarPefilProfesorController = actualizarPefilProfesorController;
const actualizarPefilAlumnoController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { ruta_imagen } = req.body;
        const { subida } = req.body;
        const { idRol } = req.body;
        const response = yield (0, fotoPerfilPorDefecto_1.ActualizarImagenPerfilAlumno)(id, ruta_imagen, subida);
        app_1.io.emit('actualizar-foto-ferfil-alumno', { usuario: id, idRol: idRol });
        res.send(response);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.actualizarPefilAlumnoController = actualizarPefilAlumnoController;
const getImagenesSubidasPorProfesorCursoController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const respuesta = yield (0, fotoPerfilPorDefecto_1.getImagenesSubidasPorProfesorCursoService)(id);
        res.send(respuesta);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.getImagenesSubidasPorProfesorCursoController = getImagenesSubidasPorProfesorCursoController;

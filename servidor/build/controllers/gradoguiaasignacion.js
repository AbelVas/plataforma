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
exports.actualizarGradoGuia = exports.eliminarGradoGuia = exports.insertGradosGuias = exports.getGradosSinGuias = exports.getObtenerGuiasExistentes = void 0;
const gradoguiaasignacion_1 = require("../service/gradoguiaasignacion");
const error_handle_1 = require("../utils/error.handle");
const app_1 = require("../app"); // Importa el objeto de Socket.io
const notificacionesGenerales_1 = require("../service/notificacionesGenerales");
const getObtenerGuiasExistentes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultadoGrados = yield (0, gradoguiaasignacion_1.obtenerGuiasExistente)();
        res.send(resultadoGrados);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.getObtenerGuiasExistentes = getObtenerGuiasExistentes;
const getGradosSinGuias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultadoGrados = yield (0, gradoguiaasignacion_1.obtenerGradosSinGuias)();
        res.send(resultadoGrados);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.getGradosSinGuias = getGradosSinGuias;
const insertGradosGuias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var idUsuario = req.body.idProfesor;
        var idGradoGuia = req.body.idGrado;
        delete req.body.idProfesor;
        delete req.body.idGrado;
        const insert = yield (0, gradoguiaasignacion_1.insertarGradoGuia)(idUsuario, idGradoGuia);
        if (insert) {
            const insertNoti = yield (0, notificacionesGenerales_1.insertNotificacion)(req.body);
            app_1.io.emit("nueva-notificacion-usuario-recibida", { idUsuario: req.body.idUsuarioRecibe, idRol: req.body.idRolRecibe, mensaje: req.body.mensaje, titulo_notificacion: req.body.titulo_notificacion });
        }
        res.send(insert);
    }
    catch (e) {
        console.log(e);
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.insertGradosGuias = insertGradosGuias;
const eliminarGradoGuia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultadoGrados = yield (0, gradoguiaasignacion_1.deleteGradoGuia)(id);
        res.send(resultadoGrados);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.eliminarGradoGuia = eliminarGradoGuia;
const actualizarGradoGuia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body.idGuias);
        const insert = yield (0, gradoguiaasignacion_1.updateGradoGuia)(req.body, req.body.idGuias);
        res.send(insert);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.actualizarGradoGuia = actualizarGradoGuia;

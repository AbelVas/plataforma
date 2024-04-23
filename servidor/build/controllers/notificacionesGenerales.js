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
exports.vistoNotificacionesDocente = exports.getNotificacionesVistasDocentes = void 0;
const error_handle_1 = require("../utils/error.handle");
const app_1 = require("../app"); // Importa el objeto de Socket.io
const notificacionesGenerales_1 = require("../service/notificacionesGenerales");
const vistoNotificacionesDocente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { idRol } = req.params;
        const { idNotificacion } = req.params;
        const responseNotificaciones = yield (0, notificacionesGenerales_1.editarVistaRecibeDocente)(id, idRol, idNotificacion);
        app_1.io.emit("nueva-notificacion-usuario-recibida", { idUsuario: id, idRol: idRol });
        res.send(responseNotificaciones);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.vistoNotificacionesDocente = vistoNotificacionesDocente;
const getNotificacionesVistasDocentes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { idRol } = req.params;
        const responseNotificaciones = yield (0, notificacionesGenerales_1.getNotificaciones)(id, idRol);
        res.send(responseNotificaciones);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.getNotificacionesVistasDocentes = getNotificacionesVistasDocentes;
const insertNotificaciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});

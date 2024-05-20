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
exports.getCalificacionesAlumnoActividad = exports.calificarActividad = exports.getAlumnosCalificacionActividadCursUnidad = void 0;
const calificacion_1 = require("../service/calificacion");
const error_handle_1 = require("../utils/error.handle");
const notificacionesGenerales_1 = require("../service/notificacionesGenerales");
const app_1 = require("../app"); // Importa el objeto de Socket.io
const getAlumnosCalificacionActividadCursUnidad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idCurso } = req.params;
        const idActividad = req.body.idDetalleActividad;
        const Unidad = req.body.idUnidad;
        const resultado = yield (0, calificacion_1.getAlumnosCalificacionActividadCursUnidadService)(idActividad, Unidad, idCurso);
        res.send(resultado);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.getAlumnosCalificacionActividadCursUnidad = getAlumnosCalificacionActividadCursUnidad;
const calificarActividad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idDetalleActividad } = req.params;
        const calificacion = req.body.calificacion;
        const idAlumno = req.body.idAlumno;
        const nota = req.body.verNota;
        const disponible = req.body.disponible;
        delete req.body.calificacion;
        delete req.body.idAlumno;
        delete req.body.verNota;
        delete req.body.disponible;
        const resultado = yield (0, calificacion_1.calificarActividadService)(idAlumno, idDetalleActividad, calificacion);
        if (resultado) {
            if (nota == "1" && disponible == "1") {
                const insertNoti = yield (0, notificacionesGenerales_1.insertNotificacion)(req.body);
                app_1.io.emit("nueva-notificacion-usuario-recibida", { idUsuario: req.body.idUsuarioRecibe, idRol: req.body.idRolRecibe, mensaje: req.body.mensaje, titulo_notificacion: req.body.titulo_notificacion });
            }
        }
        res.send(resultado);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.calificarActividad = calificarActividad;
const getCalificacionesAlumnoActividad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idAlumno } = req.params;
        const { idCurso } = req.body;
        const resultadoCalificaciones = yield (0, calificacion_1.getCalificacionesAlumnoActividadService)(idCurso, idAlumno);
        res.send(resultadoCalificaciones);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.getCalificacionesAlumnoActividad = getCalificacionesAlumnoActividad;

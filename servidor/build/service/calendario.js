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
exports.getActividadesCalificacionAlumnoTotal = exports.getActividadesCalificacionAlumno = exports.getActividadesPorTipoForo = exports.getActividadesPorTipoTarea = exports.getActividadesPorTipoExamen = exports.getActividadesPorProfesor = exports.getActividadesPorTutor = exports.getActividadesPorAlumno = void 0;
const database_1 = __importDefault(require("../config/database"));
const getActividadesPorAlumno = (idUsuario) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield database_1.default.query('SELECT da.detalle,da.nombre_actividad, DATE_FORMAT(da.fecha_entrega, "%Y-%m-%d") as fecha_entrega FROM(tbAlumno al INNER JOIN tbCurso tc ON al.idGrado=tc.idGrado)INNER JOIN tbDetalleActividad da ON tc.idCurso=da.idCurso WHERE al.idAlumno=? ORDER BY da.fecha_entrega DESC;', [idUsuario]);
    return response;
});
exports.getActividadesPorAlumno = getActividadesPorAlumno;
const getActividadesPorTutor = (idUsuario) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield database_1.default.query('SELECT da.detalle,da.nombre_actividad, DATE_FORMAT(da.fecha_entrega, "%Y-%m-%d") as fecha_entrega FROM tbCurso tc INNER JOIN tbDetalleActividad da ON tc.idCurso=da.idCurso WHERE tc.idProfesor=? ORDER BY da.fecha_entrega DESC;', [idUsuario]);
    return response;
});
exports.getActividadesPorTutor = getActividadesPorTutor;
const getActividadesPorProfesor = (idUsuario) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield database_1.default.query('SELECT da.detalle,da.nombre_actividad, DATE_FORMAT(da.fecha_entrega, "%Y-%m-%d") as fecha_entrega FROM(tbAlumno al INNER JOIN tbCurso tc ON al.idGrado=tc.idGrado)INNER JOIN tbDetalleActividad da ON tc.idCurso=da.idCurso WHERE al.idTutor=? and al.idAlumno=? ORDER BY da.fecha_entrega DESC', [idUsuario]);
    return response;
});
exports.getActividadesPorProfesor = getActividadesPorProfesor;
//para el curso
const getActividadesPorTipoExamen = (idUsuario, idAlum) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield database_1.default.query('SELECT ac.nombre_actividad,ac.detalle,ta.idExamen,ac.valor,ca.calificacion FROM(tbDetalleActividad ac INNER JOIN tbExamen ta ON ta.idDetalleActividad=ac.idDetalleActividad) INNER JOIN tbCalificacion ca ON ac.idDetalleActividad=ca.idDetalleActividad WHERE ac.idCurso=? AND ca.idAlumno=?', [idUsuario, idAlum]);
    return response;
});
exports.getActividadesPorTipoExamen = getActividadesPorTipoExamen;
const getActividadesPorTipoTarea = (idUsuario, idAlum) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield database_1.default.query('SELECT ac.nombre_actividad,ac.detalle,ta.idTarea,ac.valor,ca.calificacion FROM(tbDetalleActividad ac INNER JOIN tbTarea ta ON ta.idDetalleActividad=ac.idDetalleActividad) INNER JOIN tbCalificacion ca ON ac.idDetalleActividad=ca.idDetalleActividad WHERE ac.idCurso=? AND ca.idAlumno=?', [idUsuario, idAlum]);
    return response;
});
exports.getActividadesPorTipoTarea = getActividadesPorTipoTarea;
const getActividadesPorTipoForo = (idUsuario, idAlum) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield database_1.default.query('SELECT ac.nombre_actividad,ac.detalle,ta.idForo,ac.valor,ca.calificacion FROM(tbDetalleActividad ac INNER JOIN tbForo ta ON ta.idDetalleActividad=ac.idDetalleActividad) INNER JOIN tbCalificacion ca ON ac.idDetalleActividad=ca.idDetalleActividad WHERE ac.idCurso=? AND ca.idAlumno=?', [idUsuario, idAlum]);
    return response;
});
exports.getActividadesPorTipoForo = getActividadesPorTipoForo;
const getActividadesCalificacionAlumno = (idUsuario, idAlum) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield database_1.default.query('SELECT da.nombre_actividad,ca.calificacion,ta.tipoActividad,da.valor FROM(tbDetalleActividad da INNER JOIN tbTipoActividad ta ON da.idTipoActividad=ta.idTipoActividad)INNER JOIN tbCalificacion ca ON da.idDetalleActividad=ca.idDetalleActividad WHERE da.idCurso=? AND ca.idAlumno=?', [idUsuario, idAlum]);
    return response;
});
exports.getActividadesCalificacionAlumno = getActividadesCalificacionAlumno;
const getActividadesCalificacionAlumnoTotal = (idUsuario, idAlum) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield database_1.default.query('SELECT SUM(ca.calificacion) as califitotal FROM(tbDetalleActividad da INNER JOIN tbTipoActividad ta ON da.idTipoActividad=ta.idTipoActividad)INNER JOIN tbCalificacion ca ON da.idDetalleActividad=ca.idDetalleActividad WHERE da.idCurso=? AND ca.idAlumno=?', [idUsuario, idAlum]);
    return response;
});
exports.getActividadesCalificacionAlumnoTotal = getActividadesCalificacionAlumnoTotal;

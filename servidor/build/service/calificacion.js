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
exports.getCalificacionesAlumnoActividadService = exports.calificarActividadService = exports.getAlumnosCalificacionActividadCursUnidadService = void 0;
const database_1 = __importDefault(require("../config/database"));
const getAlumnosCalificacionActividadCursUnidadService = (idActividad, idUnidad, idCurso) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield database_1.default.query('SELECT al.idAlumno,CONCAT(al.apellidos_alumno,", ",al.nombres_alumno) as alumno,NotasActividades(d.idCurso,al.idAlumno,d.idDetalleActividad,d.idUnidad) as nota,d.valor FROM ((((tbCalificacion c RIGHT JOIN tbDetalleActividad d ON d.idDetalleActividad=c.idDetalleActividad)INNER JOIN tbUnidad u ON u.idUnidad=d.idUnidad)INNER JOIN tbCurso cur ON cur.idCurso=d.idCurso)INNER JOIN tbGrado g ON g.idGrado=cur.idGrado)INNER JOIN tbAlumno al ON al.idGrado=g.idGrado WHERE d.idDetalleActividad=? and d.idUnidad=? and d.idCurso=? GROUP BY al.idAlumno ORDER BY al.apellidos_alumno', [idActividad, idUnidad, idCurso]);
    return response;
});
exports.getAlumnosCalificacionActividadCursUnidadService = getAlumnosCalificacionActividadCursUnidadService;
const calificarActividadService = (idAlumno, idDetalleActividad, calificacion) => __awaiter(void 0, void 0, void 0, function* () {
    const selectCalificacion = yield database_1.default.query('SELECT idCalificacion FROM tbCalificacion WHERE idAlumno=? and idDetalleActividad=?', [idAlumno, idDetalleActividad]);
    if (selectCalificacion != '') {
        const updateNota = yield database_1.default.query('UPDATE tbCalificacion SET calificacion=? WHERE idAlumno=? and idDetalleActividad=?', [calificacion, idAlumno, idDetalleActividad]);
        return true;
    }
    else {
        const insertNota = yield database_1.default.query('INSERT INTO tbCalificacion(idAlumno,idDetalleActividad,calificacion) VALUES(?, ?, ?)', [idAlumno, idDetalleActividad, calificacion]);
        return true;
    }
});
exports.calificarActividadService = calificarActividadService;
const getCalificacionesAlumnoActividadService = (idCurso, idAlumno) => __awaiter(void 0, void 0, void 0, function* () {
    const selectCalificacionAlumno = yield database_1.default.query('SELECT d.idDetalleActividad,d.nombre_actividad,d.idTipoActividad,d.valor,d.disponible,u.unidad,d.detalle,t.tipoActividad,al.idAlumno,CONCAT(al.apellidos_alumno,", ",al.nombres_alumno) as alumno,NotasActividades(d.idCurso,al.idAlumno,d.idDetalleActividad,d.idUnidad) as nota,d.valor,d.fecha_entrega,d.entrega_fuera_fecha FROM ((((tbCalificacion c RIGHT JOIN tbDetalleActividad d ON d.idDetalleActividad=c.idDetalleActividad)INNER JOIN tbUnidad u ON u.idUnidad=d.idUnidad)INNER JOIN tbCurso cur ON cur.idCurso=d.idCurso)INNER JOIN tbGrado g ON g.idGrado=cur.idGrado)INNER JOIN tbAlumno al ON al.idGrado=g.idGrado INNER JOIN tbTipoActividad t ON t.idTipoActividad=d.idTipoActividad WHERE d.idCurso=? and al.idAlumno=? GROUP BY d.idDetalleActividad', [idCurso, idAlumno]);
    return selectCalificacionAlumno;
});
exports.getCalificacionesAlumnoActividadService = getCalificacionesAlumnoActividadService;

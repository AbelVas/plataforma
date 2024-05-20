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
exports.getNotificacionesEnviadas = exports.editarVistaRecibeDocente = exports.insertNotificacion = exports.getNotificaciones = void 0;
const database_1 = __importDefault(require("../config/database"));
const insertNotificacion = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const insertNotificacionDocente = yield database_1.default.query("INSERT INTO tbNotificaciones set ?", [data]);
    return insertNotificacionDocente;
});
exports.insertNotificacion = insertNotificacion;
const getNotificaciones = (idUsuarioRecibe, idRolRecibe) => __awaiter(void 0, void 0, void 0, function* () {
    const getnotificaciones = yield database_1.default.query('SELECT noti.idNotificacionProfesor as "idNotificacion",noti.titulo_notificacion,noti.mensaje, rolEnvia.rol as "RolEnvia", IFNULL(CONCAT(profeEnvia.nombre_profesor," ",profeEnvia.apellido_profesor), CONCAT(alumnoEnvia.nombres_alumno," ", alumnoEnvia.apellidos_alumno)) as "UsuarioEnvia",rolRecibe.rol as "RolRecibe",IFNULL(CONCAT(profeRecibe.nombre_profesor," ",profeRecibe.apellido_profesor), CONCAT(alumnoRecibe.nombres_alumno," ", alumnoRecibe.apellidos_alumno)) as "UsuarioRecibe", noti.visto_recibe,noti.fecha_creacion FROM tbNotificaciones noti inner join tbRol rolEnvia ON rolEnvia.idRol=noti.idRolEnvia inner join tbRol rolRecibe ON rolRecibe.idRol=noti.idRolRecibe LEFT JOIN tbProfesor profeEnvia ON profeEnvia.idProfesor=noti.idUsuarioEnvia and profeEnvia.idRol=noti.idRolEnvia LEFT JOIN tbProfesor profeRecibe ON profeRecibe.idProfesor=noti.idUsuarioRecibe and profeRecibe.idRol=noti.idRolRecibe LEFT JOIN tbAlumno alumnoRecibe ON alumnoRecibe.idAlumno=noti.idUsuarioRecibe and alumnoRecibe.idRol=noti.idRolRecibe LEFT JOIN tbAlumno alumnoEnvia ON alumnoEnvia.idAlumno=noti.idUsuarioEnvia and alumnoEnvia.idRol=noti.idRolEnvia WHERE noti.idUsuarioRecibe=? and noti.idRolRecibe=? ORDER BY noti.idNotificacionProfesor DESC', [idUsuarioRecibe, idRolRecibe]);
    return getnotificaciones;
});
exports.getNotificaciones = getNotificaciones;
const getNotificacionesEnviadas = (idUsuarioEnvia, idRolEnvia) => __awaiter(void 0, void 0, void 0, function* () {
    const getnotificaciones = yield database_1.default.query('SELECT noti.idNotificacionProfesor as "idNotificacion",noti.titulo_notificacion,noti.mensaje, rolEnvia.rol as "RolEnvia", IFNULL(CONCAT(profeEnvia.nombre_profesor," ",profeEnvia.apellido_profesor), CONCAT(alumnoEnvia.nombres_alumno," ", alumnoEnvia.apellidos_alumno)) as "UsuarioEnvia",rolRecibe.rol as "RolRecibe",IFNULL(CONCAT(profeRecibe.nombre_profesor," ",profeRecibe.apellido_profesor), CONCAT(alumnoRecibe.nombres_alumno," ", alumnoRecibe.apellidos_alumno)) as "UsuarioRecibe", noti.visto_recibe, noti.visto_envia,noti.fecha_creacion FROM tbNotificaciones noti inner join tbRol rolEnvia ON rolEnvia.idRol=noti.idRolEnvia inner join tbRol rolRecibe ON rolRecibe.idRol=noti.idRolRecibe LEFT JOIN tbProfesor profeEnvia ON profeEnvia.idProfesor=noti.idUsuarioEnvia and profeEnvia.idRol=noti.idRolEnvia LEFT JOIN tbProfesor profeRecibe ON profeRecibe.idProfesor=noti.idUsuarioRecibe and profeRecibe.idRol=noti.idRolRecibe LEFT JOIN tbAlumno alumnoRecibe ON alumnoRecibe.idAlumno=noti.idUsuarioRecibe and alumnoRecibe.idRol=noti.idRolRecibe LEFT JOIN tbAlumno alumnoEnvia ON alumnoEnvia.idAlumno=noti.idUsuarioEnvia and alumnoEnvia.idRol=noti.idRolEnvia WHERE noti.idUsuarioEnvia=? and noti.idRolEnvia=? ORDER BY noti.idNotificacionProfesor DESC', [idUsuarioEnvia, idRolEnvia]);
    return getnotificaciones;
});
exports.getNotificacionesEnviadas = getNotificacionesEnviadas;
const editarVistaRecibeDocente = (idUsuarioRecibe, idRolRecibe, idNotificacion) => __awaiter(void 0, void 0, void 0, function* () {
    const vistaNotificacionesDocente = yield database_1.default.query("UPDATE tbNotificaciones SET visto_recibe=1 WHERE idUsuarioRecibe=? and idRolRecibe=? and idNotificacionProfesor=?", [idUsuarioRecibe, idRolRecibe, idNotificacion]);
    return vistaNotificacionesDocente;
});
exports.editarVistaRecibeDocente = editarVistaRecibeDocente;

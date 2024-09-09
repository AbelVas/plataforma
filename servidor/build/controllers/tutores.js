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
exports.GetNotasTutor = exports.getAlumnoporTutor = exports.compararPass = exports.getTutorconAlumno = exports.insertarTutor = exports.deleteTutor = exports.updateTutor = exports.getTutor = exports.getTutores = exports.tutoresAlumno = exports.insertTutorAlumno = exports.deleteTutorAlumno = void 0;
const tutores_1 = require("../service/tutores");
const error_handle_1 = require("../utils/error.handle");
const passwordFunction_1 = require("../utils/passwordFunction");
const app_1 = require("../app"); // Importa el objeto de Socket.io
const deleteTutorAlumno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idTutor } = req.params;
        const { idAlumno } = req.params;
        const consulta = yield (0, tutores_1.deleteTutorAlumnoService)(idTutor, idAlumno);
        res.send(consulta);
        app_1.io.emit('acciones-vinculacion', { mensaje: 'Se ha Eliminado un vinculo de Alumno - Tutor', titulo: 'Vinculo Eliminado' });
        app_1.io.emit('acciones-vinculacion-tutor', { mensaje: 'Se le Desasigno un Alumno', titulo: 'Vinculo Eliminado' });
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.deleteTutorAlumno = deleteTutorAlumno;
const insertTutorAlumno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const consulta = yield (0, tutores_1.insertTutorAlumnoService)(req.body);
        res.send(consulta);
        app_1.io.emit('acciones-vinculacion', { mensaje: 'Se ha Insertado un vinculo de Alumno - Tutor', titulo: 'Vinculo Creado' });
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.insertTutorAlumno = insertTutorAlumno;
const tutoresAlumno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const consulta = yield (0, tutores_1.tutoresAlumnoService)(id);
        res.send(consulta);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.tutoresAlumno = tutoresAlumno;
const getTutores = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultadoTutores = yield (0, tutores_1.obtenerTutoresService)();
        res.send(resultadoTutores);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.getTutores = getTutores;
const getTutor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultadoTutores = yield (0, tutores_1.obtenerTutorService)(id);
        res.send(resultadoTutores);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.getTutor = getTutor;
const GetNotasTutor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultadoTutores = yield (0, tutores_1.obtenerTutorNotasService)(id);
        res.send(resultadoTutores);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.GetNotasTutor = GetNotasTutor;
const updateTutor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { pass } = req.body;
        if (pass == null) {
            const resultado = yield (0, tutores_1.updateTutorService)(req.body, id);
            res.send(resultado);
            app_1.io.emit('actualizar-lista-tutores', { mensaje: 'Se ha Editado a un Tutor', titulo: 'Tutor Editado' });
        }
        else {
            const passEncrypt = yield (0, passwordFunction_1.encrypt)(pass);
            req.body.pass = passEncrypt;
            const resultado = yield (0, tutores_1.updateTutorService)(req.body, id);
            res.send(resultado);
            app_1.io.emit('actualizar-lista-tutores', { mensaje: 'Se ha Editado a un Tutor', titulo: 'Tutor Editado' });
        }
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.updateTutor = updateTutor;
const deleteTutor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultadoTutores = yield (0, tutores_1.deleteTutoresService)(id);
        res.send(resultadoTutores);
        app_1.io.emit('actualizar-lista-tutores', { mensaje: 'Se ha Eliminado a un Tutor', titulo: 'Tutor Eliminado' });
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.deleteTutor = deleteTutor;
const insertarTutor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validar = yield (0, tutores_1.validarTutoresExisteSi)(req.body.usuario, req.body.telefono1);
        if (validar != '') {
            res.send("Error, el Tutor ya existe");
        }
        else {
            const passEncrypt = yield (0, passwordFunction_1.encrypt)(req.body.pass);
            req.body.pass = passEncrypt;
            const resultadoAlumno = yield (0, tutores_1.insertTutoresService)(req.body);
            res.send(resultadoAlumno);
            app_1.io.emit('actualizar-lista-tutores', { mensaje: 'Se ha agregado un nuevo Tutor', titulo: 'Tutor Creado' });
        }
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.insertarTutor = insertarTutor;
const compararPass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { pass } = req.body;
        const resultadoDelete = yield (0, tutores_1.verifyPassword)(id, pass);
        res.send(resultadoDelete);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.compararPass = compararPass;
const getTutorconAlumno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultTutorConAlimn = yield (0, tutores_1.getTutorconAlumnoService)(id);
        res.send(resultTutorConAlimn);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.getTutorconAlumno = getTutorconAlumno;
const getAlumnoporTutor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultAlumnosporTutor = yield (0, tutores_1.getAlumnoporTutorService)(id);
        res.send(resultAlumnosporTutor);
    }
    catch (e) {
        (0, error_handle_1.handleHttp)(e, req, res);
    }
});
exports.getAlumnoporTutor = getAlumnoporTutor;

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
exports.obtenerCatecoriaImagenService = exports.obtenerImagenCategoriaService = exports.obtenerImagenSubidUsuarioAlumno = exports.obtenerImagenSubidUsuarioProfesor = exports.ActualizarImagenPerfilAlumno = exports.ActualizarImagenPerfilProfesor = exports.getImagenesSubidasPorProfesorCursoService = void 0;
const database_1 = __importDefault(require("../config/database"));
const obtenerImagenCategoriaService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const responseGet = yield database_1.default.query('SELECT ruta FROM tbImagenPerfil WHERE idCategoriaImagenPerfil=?', [id]);
    return responseGet;
});
exports.obtenerImagenCategoriaService = obtenerImagenCategoriaService;
const obtenerCatecoriaImagenService = () => __awaiter(void 0, void 0, void 0, function* () {
    const responseGet = yield database_1.default.query('SELECT `idCategoriaImagenPerfil`, `categoria` FROM `tbCategoriaImagenPerfil`');
    return responseGet;
});
exports.obtenerCatecoriaImagenService = obtenerCatecoriaImagenService;
const obtenerImagenSubidUsuarioAlumno = (idUsuario) => __awaiter(void 0, void 0, void 0, function* () {
    const consulta = yield database_1.default.query('SELECT ruta_imagen FROM tbImagenPerfilAlumno WHERE idAlumno=? and subida=1', [idUsuario]);
    return consulta;
});
exports.obtenerImagenSubidUsuarioAlumno = obtenerImagenSubidUsuarioAlumno;
const obtenerImagenSubidUsuarioProfesor = (idUsuario) => __awaiter(void 0, void 0, void 0, function* () {
    const consulta = yield database_1.default.query('SELECT ruta_imagen FROM tbImagenPerfilProfesor WHERE idProfesor=? and subida=1', [idUsuario]);
    return consulta;
});
exports.obtenerImagenSubidUsuarioProfesor = obtenerImagenSubidUsuarioProfesor;
const ActualizarImagenPerfilAlumno = (id, ruta, subida) => __awaiter(void 0, void 0, void 0, function* () {
    const verificar = yield database_1.default.query("SELECT ruta_imagen,subida FROM tbImagenPerfilAlumno WHERE idAlumno=? and subida=?", [id, subida]);
    if (verificar != '') {
        if (subida != '1') {
            const update = yield database_1.default.query("UPDATE tbImagenPerfilAlumno SET activa=0 WHERE idAlumno=?", [id]);
            const update2 = yield database_1.default.query("UPDATE tbImagenPerfilAlumno SET activa=1, peso_archivo=0, subida=0, ruta_imagen=? WHERE idAlumno=? and subida=0", [ruta, id]);
            return update2;
        }
        else {
            const update = yield database_1.default.query("UPDATE tbImagenPerfilAlumno SET activa=0 WHERE idAlumno=?", [id]);
            const update2 = yield database_1.default.query("UPDATE tbImagenPerfilAlumno SET activa=1 WHERE idAlumno=? and subida=1 and ruta_imagen=?", [id, ruta]);
            return update2;
        }
    }
    else {
        const update = yield database_1.default.query("UPDATE tbImagenPerfilAlumno SET activa=0 WHERE idAlumno=?", [id]);
        const consulta = yield database_1.default.query("INSERT INTO tbImagenPerfilAlumno(idAlumno,ruta_imagen,peso_archivo,activa,subida) values(?,?,0,1,0)", [id, ruta]);
        return consulta;
    }
});
exports.ActualizarImagenPerfilAlumno = ActualizarImagenPerfilAlumno;
const ActualizarImagenPerfilProfesor = (id, ruta, subida) => __awaiter(void 0, void 0, void 0, function* () {
    const verificar = yield database_1.default.query("SELECT ruta_imagen,subida FROM tbImagenPerfilProfesor WHERE idProfesor=? and subida=? ", [id, subida]);
    if (verificar != '') {
        if (subida != '1') {
            const update = yield database_1.default.query("UPDATE tbImagenPerfilProfesor SET activa=0 WHERE idProfesor=?", [id]);
            const update2 = yield database_1.default.query("UPDATE tbImagenPerfilProfesor SET activa=1, peso_archivo=0, subida=0, ruta_imagen=? WHERE idProfesor=? and subida=0", [ruta, id]);
            return update2;
        }
        else {
            const update = yield database_1.default.query("UPDATE tbImagenPerfilProfesor SET activa=0 WHERE idProfesor=?", [id]);
            const update2 = yield database_1.default.query("UPDATE tbImagenPerfilProfesor SET activa=1 WHERE idProfesor=? and subida=1 and ruta_imagen=?", [id, ruta]);
            return update2;
        }
    }
    else {
        const update = yield database_1.default.query("UPDATE tbImagenPerfilProfesor SET activa=0 WHERE idProfesor=?", [id]);
        const consulta = yield database_1.default.query("INSERT INTO tbImagenPerfilProfesor(idProfesor,ruta_imagen,peso_archivo,activa,subida) values(?,?,0,1,0)", [id, ruta]);
        return consulta;
    }
});
exports.ActualizarImagenPerfilProfesor = ActualizarImagenPerfilProfesor;
const getImagenesSubidasPorProfesorCursoService = (idCurso) => __awaiter(void 0, void 0, void 0, function* () {
    const consulta = yield database_1.default.query('SELECT ruta_imagen FROM tbImagenCurso WHERE idCurso=? and subida=1', [idCurso]);
    return consulta;
});
exports.getImagenesSubidasPorProfesorCursoService = getImagenesSubidasPorProfesorCursoService;

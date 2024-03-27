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
exports.getUnidadesActivasService = exports.deleteUnidadService = exports.updateUnidadService = exports.obtenerUnidadService = exports.obtenerUnidadesService = exports.insertUnidadService = void 0;
const database_1 = __importDefault(require("../config/database"));
const insertUnidadService = (dato) => __awaiter(void 0, void 0, void 0, function* () {
    const responseInsert = yield database_1.default.query('INSERT INTO tbUnidad set ?', [dato]);
    return responseInsert;
});
exports.insertUnidadService = insertUnidadService;
const obtenerUnidadesService = () => __awaiter(void 0, void 0, void 0, function* () {
    const responseGet = yield database_1.default.query('SELECT `idUnidad`, `unidad`, `fecha_inicio`, `fecha_final`, `estado` FROM tbUnidad');
    return responseGet;
});
exports.obtenerUnidadesService = obtenerUnidadesService;
const obtenerUnidadService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const responseGet = yield database_1.default.query('SELECT `idUnidad`, `unidad`, `fecha_inicio`, `fecha_final`, `estado` FROM tbUnidad WHERE idUnidad=?', [id]);
    return responseGet;
});
exports.obtenerUnidadService = obtenerUnidadService;
const updateUnidadService = (dato, id) => __awaiter(void 0, void 0, void 0, function* () {
    const responseUpdate = yield database_1.default.query('UPDATE tbUnidad SET ? WHERE idUnidad=?', [dato, id]);
    return responseUpdate;
});
exports.updateUnidadService = updateUnidadService;
const deleteUnidadService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const responseDelete = yield database_1.default.query('DELETE FROM tbUnidad WHERE idUnidad=?', [id]);
    return responseDelete;
});
exports.deleteUnidadService = deleteUnidadService;
const getUnidadesActivasService = () => __awaiter(void 0, void 0, void 0, function* () {
    const responseGet = yield database_1.default.query('SELECT `idUnidad`, `unidad` FROM tbUnidad WHERE estado=1');
    return responseGet;
});
exports.getUnidadesActivasService = getUnidadesActivasService;

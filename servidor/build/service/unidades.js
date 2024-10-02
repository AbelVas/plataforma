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
// Insertar una nueva unidad
const insertUnidadService = (dato) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseInsert = yield database_1.default.query('INSERT INTO tbUnidad SET ?', [dato]);
        return responseInsert;
    }
    catch (error) {
        throw new Error("Error al insertar la unidad");
    }
});
exports.insertUnidadService = insertUnidadService;
// Obtener todas las unidades
const obtenerUnidadesService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseGet = yield database_1.default.query('SELECT idUnidad, unidad, fecha_inicio, fecha_final, estado FROM tbUnidad');
        return responseGet;
    }
    catch (error) {
        throw new Error("Error al obtener las unidades");
    }
});
exports.obtenerUnidadesService = obtenerUnidadesService;
// Obtener una unidad por su ID
const obtenerUnidadService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseGet = yield database_1.default.query('SELECT idUnidad, unidad, fecha_inicio, fecha_final, estado FROM tbUnidad WHERE idUnidad = ?', [id]);
        return responseGet.length ? responseGet[0] : null;
    }
    catch (error) {
        throw new Error(`Error al obtener la unidad con ID: ${id}`);
    }
});
exports.obtenerUnidadService = obtenerUnidadService;
// Actualizar una unidad por su ID
const updateUnidadService = (dato, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseUpdate = yield database_1.default.query('UPDATE tbUnidad SET ? WHERE idUnidad = ?', [dato, id]);
        return responseUpdate;
    }
    catch (error) {
        throw new Error(`Error al actualizar la unidad con ID: ${id}`);
    }
});
exports.updateUnidadService = updateUnidadService;
// Eliminar una unidad por su ID
const deleteUnidadService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseDelete = yield database_1.default.query('DELETE FROM tbUnidad WHERE idUnidad = ?', [id]);
        return responseDelete;
    }
    catch (error) {
        throw new Error(`Error al eliminar la unidad con ID: ${id}`);
    }
});
exports.deleteUnidadService = deleteUnidadService;
// Obtener todas las unidades activas
const getUnidadesActivasService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseGet = yield database_1.default.query('SELECT idUnidad, unidad FROM tbUnidad WHERE estado = 1');
        return responseGet;
    }
    catch (error) {
        throw new Error("Error al obtener las unidades activas");
    }
});
exports.getUnidadesActivasService = getUnidadesActivasService;

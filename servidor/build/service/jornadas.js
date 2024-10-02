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
exports.insertJornadaService = exports.deleteJornadaService = exports.updateJornadaService = exports.obtenerJornadaService = exports.obtenerJornadasService = void 0;
const database_1 = __importDefault(require("../config/database"));
// Obtener todas las jornadas
const obtenerJornadasService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseGet = yield database_1.default.query('SELECT idJornada, jornada, creada, activo FROM tbJornada');
        return responseGet;
    }
    catch (error) {
        throw new Error('Error al obtener las jornadas');
    }
});
exports.obtenerJornadasService = obtenerJornadasService;
// Obtener una jornada por su ID
const obtenerJornadaService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseGet = yield database_1.default.query('SELECT idJornada, jornada, creada, activo FROM tbJornada WHERE idJornada = ?', [id]);
        return responseGet.length ? responseGet[0] : null;
    }
    catch (error) {
        throw new Error(`Error al obtener la jornada con ID: ${id}`);
    }
});
exports.obtenerJornadaService = obtenerJornadaService;
// Actualizar una jornada
const updateJornadaService = (data, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseUpdate = yield database_1.default.query('UPDATE tbJornada SET ? WHERE idJornada = ?', [data, id]);
        return responseUpdate;
    }
    catch (error) {
        throw new Error(`Error al actualizar la jornada con ID: ${id}`);
    }
});
exports.updateJornadaService = updateJornadaService;
// Eliminar una jornada
const deleteJornadaService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseDelete = yield database_1.default.query('DELETE FROM tbJornada WHERE idJornada = ?', [id]);
        return responseDelete;
    }
    catch (error) {
        throw new Error(`Error al eliminar la jornada con ID: ${id}`);
    }
});
exports.deleteJornadaService = deleteJornadaService;
// Insertar una nueva jornada
const insertJornadaService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseInsert = yield database_1.default.query('INSERT INTO tbJornada SET ?', [data]);
        return responseInsert;
    }
    catch (error) {
        throw new Error('Error al insertar una nueva jornada');
    }
});
exports.insertJornadaService = insertJornadaService;

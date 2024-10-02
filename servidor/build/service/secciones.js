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
exports.deleteSeccionService = exports.updateSeccionService = exports.insertarSeccionService = exports.getSeccionesService = exports.getSeccionService = void 0;
const database_1 = __importDefault(require("../config/database"));
// Obtener una sección por su ID
const getSeccionService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.default.query("SELECT idSeccion, seccion FROM tbSeccion WHERE idSeccion = ?", [id]);
        return response.length ? response[0] : null;
    }
    catch (error) {
        throw new Error(`Error al obtener la sección con ID: ${id}`);
    }
});
exports.getSeccionService = getSeccionService;
// Obtener todas las secciones
const getSeccionesService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.default.query("SELECT idSeccion, seccion FROM tbSeccion");
        return response;
    }
    catch (error) {
        throw new Error("Error al obtener las secciones");
    }
});
exports.getSeccionesService = getSeccionesService;
// Insertar una nueva sección
const insertarSeccionService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.default.query("INSERT INTO tbSeccion SET ?", [data]);
        return response;
    }
    catch (error) {
        throw new Error("Error al insertar la nueva sección");
    }
});
exports.insertarSeccionService = insertarSeccionService;
// Actualizar una sección por su ID
const updateSeccionService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.default.query("UPDATE tbSeccion SET ? WHERE idSeccion = ?", [data, id]);
        return response;
    }
    catch (error) {
        throw new Error(`Error al actualizar la sección con ID: ${id}`);
    }
});
exports.updateSeccionService = updateSeccionService;
// Eliminar una sección por su ID
const deleteSeccionService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.default.query("DELETE FROM tbSeccion WHERE idSeccion = ?", [id]);
        return response;
    }
    catch (error) {
        throw new Error(`Error al eliminar la sección con ID: ${id}`);
    }
});
exports.deleteSeccionService = deleteSeccionService;

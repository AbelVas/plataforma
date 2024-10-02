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
exports.insertCodigoService = exports.deleteCodigoService = exports.updateCodigoService = exports.obtenerCodigosService = exports.obtenerCodigoService = void 0;
const database_1 = __importDefault(require("../config/database"));
// Obtener todos los códigos
const obtenerCodigosService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseGet = yield database_1.default.query(`
            SELECT c.idCodigo, c.codigo, t.tipo, c.fecha_creado, c.activo 
            FROM tbCodigo c 
            INNER JOIN tbTipoCodigo t ON t.idTipoCodigo = c.idTipoCodigo 
            ORDER BY t.tipo, c.codigo
        `);
        return responseGet;
    }
    catch (error) {
        throw new Error("Error al obtener los códigos");
    }
});
exports.obtenerCodigosService = obtenerCodigosService;
// Obtener un código específico por su valor y tipo
const obtenerCodigoService = (codigo, idTipoCodigo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseGet = yield database_1.default.query('SELECT idCodigo FROM tbCodigo WHERE codigo = ? AND activo = 1 AND idTipoCodigo = ?', [codigo, idTipoCodigo]);
        return responseGet.length ? responseGet[0] : false;
    }
    catch (error) {
        throw new Error("Error al obtener el código");
    }
});
exports.obtenerCodigoService = obtenerCodigoService;
// Actualizar un código por su ID
const updateCodigoService = (data, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseUpdate = yield database_1.default.query('UPDATE tbCodigo SET ? WHERE idCodigo = ?', [data, id]);
        return responseUpdate;
    }
    catch (error) {
        throw new Error(`Error al actualizar el código con ID: ${id}`);
    }
});
exports.updateCodigoService = updateCodigoService;
// Eliminar un código por su ID
const deleteCodigoService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseDelete = yield database_1.default.query('DELETE FROM tbCodigo WHERE idCodigo = ?', [id]);
        return responseDelete;
    }
    catch (error) {
        throw new Error(`Error al eliminar el código con ID: ${id}`);
    }
});
exports.deleteCodigoService = deleteCodigoService;
// Insertar un nuevo código
const insertCodigoService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseInsert = yield database_1.default.query('INSERT INTO tbCodigo SET ?', [data]);
        return responseInsert;
    }
    catch (error) {
        throw new Error("Error al insertar el código");
    }
});
exports.insertCodigoService = insertCodigoService;

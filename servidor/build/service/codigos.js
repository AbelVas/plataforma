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
const obtenerCodigosService = () => __awaiter(void 0, void 0, void 0, function* () {
    const responseGet = yield database_1.default.query('SELECT c.idCodigo,c.codigo,t.tipo,c.fecha_creado,c.activo FROM tbCodigo c INNER JOIN tbTipoCodigo t ON t.idTipoCodigo=c.idTipoCodigo Order BY t.tipo, c.codigo');
    return responseGet;
});
exports.obtenerCodigosService = obtenerCodigosService;
const obtenerCodigoService = (codigo, idTipoCodigo) => __awaiter(void 0, void 0, void 0, function* () {
    const responseGet = yield database_1.default.query('SELECT `idCodigo` FROM tbCodigo WHERE codigo=? and activo=1 and idTipoCodigo=?', [codigo, idTipoCodigo]);
    if (responseGet == '') {
        return false;
    }
    else {
        return responseGet;
    }
});
exports.obtenerCodigoService = obtenerCodigoService;
const updateCodigoService = (data, id) => __awaiter(void 0, void 0, void 0, function* () {
    const responseUpdate = yield database_1.default.query('UPDATE tbCodigo SET ? WHERE idCodigo=?', [data, id]);
    return responseUpdate;
});
exports.updateCodigoService = updateCodigoService;
const deleteCodigoService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const responseDelete = yield database_1.default.query('DELETE FROM tbCodigo WHERE idCodigo=?', [id]);
    return responseDelete;
});
exports.deleteCodigoService = deleteCodigoService;
const insertCodigoService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const responseInsert = yield database_1.default.query('INSERT INTO tbCodigo set ?', [data]);
    return responseInsert;
});
exports.insertCodigoService = insertCodigoService;

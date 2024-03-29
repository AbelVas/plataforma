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
const obtenerJornadasService = () => __awaiter(void 0, void 0, void 0, function* () {
    const responseGet = yield database_1.default.query('SELECT idJornada, jornada, creada, activo FROM tbJornada');
    return responseGet;
});
exports.obtenerJornadasService = obtenerJornadasService;
const obtenerJornadaService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const responseGet = yield database_1.default.query('SELECT idJornada, jornada, creada, activo FROM tbJornada WHERE idJornada=?', [id]);
    return responseGet;
});
exports.obtenerJornadaService = obtenerJornadaService;
const updateJornadaService = (data, id) => __awaiter(void 0, void 0, void 0, function* () {
    const responseUpdate = yield database_1.default.query('UPDATE tbJornada SET ? WHERE idJornada=?', [data, id]);
    return responseUpdate;
});
exports.updateJornadaService = updateJornadaService;
const deleteJornadaService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const responseDelete = yield database_1.default.query('DELETE FROM tbJornada WHERE idJornada=?', [id]);
    return responseDelete;
});
exports.deleteJornadaService = deleteJornadaService;
const insertJornadaService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const responseInsert = yield database_1.default.query('INSERT INTO tbJornada set ?', [data]);
    return responseInsert;
});
exports.insertJornadaService = insertJornadaService;

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
exports.getNivelesporJornadaService = exports.editarNivelService = exports.eliminarNivelService = exports.obtenerNivelService = exports.obtenerNivelesService = exports.insertNivelService = void 0;
const database_1 = __importDefault(require("../config/database"));
const insertNivelService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield database_1.default.query("INSERT INTO tbNivel set ?", [data]);
    return response;
});
exports.insertNivelService = insertNivelService;
const obtenerNivelesService = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield database_1.default.query("SELECT n.idNivel,j.idJornada,j.jornada,n.nivel FROM tbNivel n INNER JOIN tbJornada j on j.idJornada=n.idJornada");
    return response;
});
exports.obtenerNivelesService = obtenerNivelesService;
const obtenerNivelService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield database_1.default.query("SELECT n.idNivel,j.idJornada,j.jornada,n.nivel FROM tbNivel n INNER JOIN tbJornada j on j.idJornada=n.idJornada WHERE n.idNivel=?", [id]);
    return response;
});
exports.obtenerNivelService = obtenerNivelService;
const eliminarNivelService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield database_1.default.query("DELETE FROM tbNivel WHERE idNivel=?", [id]);
    return response;
});
exports.eliminarNivelService = eliminarNivelService;
const editarNivelService = (data, id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield database_1.default.query("UPDATE tbNivel SET ? WHERE idNivel=?", [data, id]);
    return response;
});
exports.editarNivelService = editarNivelService;
const getNivelesporJornadaService = (idJornada) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield database_1.default.query("SELECT n.idNivel,j.idJornada,j.jornada,n.nivel FROM tbNivel n INNER JOIN tbJornada j on j.idJornada=n.idJornada WHERE j.idJornada = ?", [idJornada]);
    return response;
});
exports.getNivelesporJornadaService = getNivelesporJornadaService;

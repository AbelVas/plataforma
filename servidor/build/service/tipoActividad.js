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
exports.getTipoActividadService = void 0;
const database_1 = __importDefault(require("../config/database"));
const getTipoActividadService = () => __awaiter(void 0, void 0, void 0, function* () {
    var TipoActi = [];
    const response = yield database_1.default.query('SELECT idTipoActividad,tipoActividad,ruta_icono_activo,ruta_icono_inactivo,estado,modal FROM tbTipoActividad');
    const cantidadElementos = response.length;
    //const datosTipoActividad:any=Object.values(response[0])
    for (let i = 0; i < cantidadElementos; i++) {
        if (response[i].estado == 1) {
            TipoActi[i] = {
                idTipoActividad: response[i].idTipoActividad,
                tipoActividad: response[i].tipoActividad,
                icono: response[i].ruta_icono_activo,
                estado: response[i].estado,
                modal: response[i].modal
            };
        }
        else {
            TipoActi[i] = {
                idTipoActividad: response[i].idTipoActividad,
                tipoActividad: response[i].tipoActividad,
                icono: response[i].ruta_icono_inactivo,
                estado: response[i].estado,
                modal: response[i].modal
            };
        }
    }
    return TipoActi;
});
exports.getTipoActividadService = getTipoActividadService;

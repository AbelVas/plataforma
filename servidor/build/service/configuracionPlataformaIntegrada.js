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
exports.getExtensionesDocumentosService = exports.getExtensionesImagenesService = exports.getConfiguracionesService = void 0;
const database_1 = __importDefault(require("../config/database"));
const getConfiguracionesService = () => __awaiter(void 0, void 0, void 0, function* () {
    const query = yield database_1.default.query("SELECT desp.idConfiguracionesPlataforma,p.plan,p.descripcion,desp.tamano_maximo_foto_perfil_usuario,desp.tamano_maximo_foto_curso,desp.tamano_maximo_archivo_actividadaes,desp.tamano_maximo_archivo_recurso,desp.tamano_maximo_subida_alumno,desp.tamano_maximo_subida_rubrica_actividad,desp.tamano_maximo_subida_descripcion_actividad,desp.tamano_maximo_renas_penales_policiacos,GROUP_CONCAT(DISTINCT eimg.extension SEPARATOR ',') AS extensiones_imagenes,GROUP_CONCAT(DISTINCT ea.extension SEPARATOR ',') AS extensiones_documentos FROM tbPlan p INNER JOIN tbPlanAdquirido plad ON p.idPlan = plad.idPlan INNER JOIN tbDesplieguePlataforma desp ON desp.idConfiguracionesPlataforma = plad.idConfiguracionesPlataforma INNER JOIN tbExtensionesPermitidasImagenes eimg ON eimg.idConfiguracionesPlataforma = desp.idConfiguracionesPlataforma INNER JOIN tbExtensionesPermitidasArchivos ea ON ea.idConfiguracionesPlataforma=desp.idConfiguracionesPlataforma WHERE p.activo = 1 GROUP BY p.plan, p.descripcion;");
    return query;
});
exports.getConfiguracionesService = getConfiguracionesService;
const getExtensionesImagenesService = () => __awaiter(void 0, void 0, void 0, function* () {
    const query = yield database_1.default.query("SELECT idExtensionesImagenes,admin_agrega, extension, fecha_agrega,admin_edita,fecha_editada,activo FROM tbExtensionesPermitidasImagenes");
    return query;
});
exports.getExtensionesImagenesService = getExtensionesImagenesService;
const getExtensionesDocumentosService = () => __awaiter(void 0, void 0, void 0, function* () {
    const query = yield database_1.default.query("SELECT idExtensionesArchivos,admin_agrega, extension, fecha_agrega,admin_edita,fecha_editada,activo FROM tbExtensionesPermitidasArchivos");
    return query;
});
exports.getExtensionesDocumentosService = getExtensionesDocumentosService;

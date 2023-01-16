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
exports.duplicarActividades = exports.updateActividadService = exports.deleteTareaService = exports.getActividadesCursoService = exports.crearTareaService = void 0;
const database_1 = __importDefault(require("../config/database"));
//traigo las tareas por curso (tanto foros, examenes, etc...)
const getActividadesCursoService = (idCurso) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield database_1.default.query('SELECT ac.idDetalleActividad,ac.nombre_actividad,ac.detalle,ac.cotejo,DATE_FORMAT(ac.fecha_entrega, "%Y-%m-%d") as fecha_entrega,ac.valor,ac.recurso,ac.ruta_recurso,DATE_FORMAT(ac.creada, "%Y-%m-%d") as creada,ac.disponible,ac.entrega_fuera_fecha,ta.tipoActividad,u.idUnidad,u.unidad,ac.ultima_modificacion, tc.color_curso FROM ((tbDetalleActividad ac INNER JOIN tbTipoActividad ta ON ta.idTipoActividad=ac.idTipoActividad)INNER JOIN tbCurso tc ON tc.idCurso=ac.idCurso)INNER JOIN tbUnidad u ON u.idUnidad=ac.idUnidad WHERE ac.idCurso=? ORDER BY ac.fecha_entrega DESC', [idCurso]);
    return response;
});
exports.getActividadesCursoService = getActividadesCursoService;
const crearTareaService = (dataActividad) => __awaiter(void 0, void 0, void 0, function* () {
    const idCurso = dataActividad.idCurso;
    const idTipoActividad = dataActividad.idTipoActividad;
    const response = yield database_1.default.query('INSERT INTO tbDetalleActividad set ?', [dataActividad]);
    const ultimoRegistro = yield database_1.default.query('SELECT MAX(idDetalleActividad) FROM tbDetalleActividad WHERE idCurso=?', [idCurso]);
    const DetalleActividad = Object.values(ultimoRegistro[0]);
    const idDetalleActividad = DetalleActividad[0];
    if (idTipoActividad == 1) {
        //tarea
        const InserttbTarea = yield database_1.default.query('INSERT INTO tbTarea(idDetalleActividad) VALUES(?)', [idDetalleActividad]);
        return true;
    }
    else if (idTipoActividad == 2) {
        //foro
        const InserttbTarea = yield database_1.default.query('INSERT INTO tbForo(idDetalleActividad) VALUES(?)', [idDetalleActividad]);
        return true;
    }
    else if (idTipoActividad == 3) {
        //examen
        const InserttbTarea = yield database_1.default.query('INSERT INTO tbExamen(idDetalleActividad) VALUES(?)', [idDetalleActividad]);
        return true;
    }
    else {
        const EliminarDetalleActividad = yield database_1.default.query('DELETE FROM tbDetalleActividad WHERE idDetalleActividad=?', [idDetalleActividad]);
        return true;
    }
});
exports.crearTareaService = crearTareaService;
const deleteTareaService = (idActividad) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteNotas = yield database_1.default.query('DELETE FROM tbCalificacion WHERE idDetalleActividad=?', [idActividad]);
    const deletetbTarea = yield database_1.default.query('DELETE FROM tbTarea WHERE idDetalleActividad=?', [idActividad]);
    const deletetbForo = yield database_1.default.query('DELETE FROM tbForo WHERE idDetalleActividad=?', [idActividad]);
    const deletetbExamen = yield database_1.default.query('DELETE FROM tbExamen WHERE idDetalleActividad=?', [idActividad]);
    const response = database_1.default.query('DELETE FROM tbDetalleActividad WHERE idDetalleActividad=?', [idActividad]);
    return response;
});
exports.deleteTareaService = deleteTareaService;
const updateActividadService = (data, idActividad) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield database_1.default.query('UPDATE tbDetalleActividad SET ? WHERE idDetalleActividad=?', [data, idActividad]);
    return response;
});
exports.updateActividadService = updateActividadService;
const duplicarActividades = (data, idActividad) => __awaiter(void 0, void 0, void 0, function* () {
    const DatosActividadOriginal = yield database_1.default.query('SELECT idUnidad,idTipoActividad,nombre_actividad,detalle,cotejo, DATE_FORMAT(fecha_entrega, "%Y-%m-%d") as fecha_entrega,valor,recurso,ruta_recurso,DATE_FORMAT(creada, "%Y-%m-%d") as creada,disponible,vence,entrega_fuera_fecha,ultima_modificacion FROM tbDetalleActividad WHERE idDetalleActividad=?', [idActividad]);
    var DatosObject = JSON.parse(JSON.stringify(DatosActividadOriginal));
    DatosObject[0].idCurso;
    var contador = 0;
    for (let i = 0; i < data.length; i++) {
        //console.log(data[i].idCurso)
        var Aux = 0;
        DatosObject[0].idCurso = data[i].idCurso;
        const insertarCopias = yield database_1.default.query('INSERT INTO tbDetalleActividad SET ?', [DatosObject[0]]);
        const ultimoRegistro = yield database_1.default.query('SELECT MAX(idDetalleActividad) FROM tbDetalleActividad WHERE idCurso=?', [DatosObject[0].idCurso]);
        const DetalleActividad = Object.values(ultimoRegistro[0]);
        const idDetalleActividad = DetalleActividad[0];
        if (DatosObject[0].idTipoActividad == '1') {
            //copiar tarea
            const InserttbTarea = yield database_1.default.query('INSERT INTO tbTarea(idDetalleActividad) VALUES(?)', [idDetalleActividad]);
            if (InserttbTarea) {
                Aux = i + 1;
            }
            else {
                const EliminarDetalleActividad = yield database_1.default.query('DELETE FROM tbDetalleActividad WHERE idDetalleActividad=?', [idDetalleActividad]);
            }
        }
        else if (DatosObject[0].idTipoActividad == '2') {
            //foro
            const InserttbTarea = yield database_1.default.query('INSERT INTO tbForo(idDetalleActividad) VALUES(?)', [idDetalleActividad]);
            if (InserttbTarea) {
                Aux = i + 1;
            }
            else {
                const EliminarDetalleActividad = yield database_1.default.query('DELETE FROM tbDetalleActividad WHERE idDetalleActividad=?', [idDetalleActividad]);
            }
        }
        else if (DatosObject[0].idTipoActividad == '3') {
            //examen
            const InserttbTarea = yield database_1.default.query('INSERT INTO tbExamen(idDetalleActividad) VALUES(?)', [idDetalleActividad]);
            if (InserttbTarea) {
                Aux = i + 1;
            }
            else {
                const EliminarDetalleActividad = yield database_1.default.query('DELETE FROM tbDetalleActividad WHERE idDetalleActividad=?', [idDetalleActividad]);
            }
        }
    }
    //console.log(Aux)
    //console.log(data.length)
    return true;
});
exports.duplicarActividades = duplicarActividades;

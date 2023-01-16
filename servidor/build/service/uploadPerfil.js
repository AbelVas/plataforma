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
Object.defineProperty(exports, "__esModule", { value: true });
exports.actualizaraPerfilAdminService = exports.actualizaraPerfilProfesorService = exports.actualizaraPerfilAlumnoService = exports.actualizaraPerfilTutorService = void 0;
const actualizaraPerfilAdminService = (idAdmin, data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(data);
    return idAdmin;
});
exports.actualizaraPerfilAdminService = actualizaraPerfilAdminService;
const actualizaraPerfilTutorService = (idTutor, data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(data);
});
exports.actualizaraPerfilTutorService = actualizaraPerfilTutorService;
const actualizaraPerfilAlumnoService = (idAlumno, data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(data);
});
exports.actualizaraPerfilAlumnoService = actualizaraPerfilAlumnoService;
const actualizaraPerfilProfesorService = (idProfesor, data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(data);
});
exports.actualizaraPerfilProfesorService = actualizaraPerfilProfesorService;

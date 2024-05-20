"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const session_1 = require("../middleware/session");
const RenasPolicialesPenales_1 = require("../controllers/RenasPolicialesPenales");
const router = (0, express_1.Router)();
exports.router = router;
router.get("/renas/:id", session_1.checkJwt, RenasPolicialesPenales_1.obtenerRenasController);
router.get("/apenales/:id", session_1.checkJwt, RenasPolicialesPenales_1.obtenerAntecedentesPenalesController);
router.get("/apoliciacos/:id", session_1.checkJwt, RenasPolicialesPenales_1.obtenerAntecedentesPoliciacosController);
router.put("/renas/:id"); //update
router.put("/apenales/:id"); //update
router.put("/apoliciacos/:id"); //update
router.post("/renas/:id", session_1.checkJwt, RenasPolicialesPenales_1.insertarRenasController); //insert
router.post("/apenales/:id", session_1.checkJwt, RenasPolicialesPenales_1.insertarAPenalesController); //insert
router.post("/apoliciacos/:id", session_1.checkJwt, RenasPolicialesPenales_1.insertarAPoliciacosController); //insert
router.delete("/eliminararchivo/:id/:tipoArchivo", session_1.checkJwt, RenasPolicialesPenales_1.EliminarArchivoVontroller);

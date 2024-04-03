"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const administradores_1 = require("../controllers/administradores");
const log_1 = require("../middleware/log");
const session_1 = require("../middleware/session");
const uploadFile_1 = require("../middleware/uploadFile"); // Importa el middleware uploadFile.ts
const router = (0, express_1.Router)();
exports.router = router;
router.post("/admin", log_1.logMiddleware, administradores_1.putAdmin);
router.get("/admin/:id", session_1.checkJwt, administradores_1.getAdmin);
router.get("/admin", session_1.checkJwt, administradores_1.getAdmins);
router.put("/admin/:id", session_1.checkJwt, administradores_1.updateAdmin);
router.delete("/admin/:id", session_1.checkJwt, administradores_1.deleteAdmin);
router.post("/admin/pass/:id", session_1.checkJwt, administradores_1.compararPass);
// Nueva ruta para subir archivos
router.post("/admin/upload", session_1.checkJwt, uploadFile_1.uploadFile);

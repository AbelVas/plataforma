"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const codigos_1 = require("../controllers/codigos");
const session_1 = require("../middleware/session");
const router = (0, express_1.Router)();
exports.router = router;
router.get("/", session_1.checkJwt, codigos_1.getCodigos);
router.post("/verify/", codigos_1.getCodigo);
router.put("/:id", session_1.checkJwt, codigos_1.updateCodigo);
router.delete("/:id", session_1.checkJwt, codigos_1.deleteCodigo);
router.post("/", session_1.checkJwt, codigos_1.insertCodigo);

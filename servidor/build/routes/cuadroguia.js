"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const cuadroguia_1 = require("../controllers/cuadroguia");
const session_1 = require("../middleware/session");
const router = (0, express_1.Router)();
exports.router = router;
router.post("/:idGrado", session_1.checkJwt, cuadroguia_1.getCursoBimestreConsolidado);

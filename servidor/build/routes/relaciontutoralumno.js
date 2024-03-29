"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const relaciontutoralumno_1 = require("../controllers/relaciontutoralumno");
const session_1 = require("../middleware/session");
const router = (0, express_1.Router)();
exports.router = router;
router.get("/tutoralumnos/:id", session_1.checkJwt, relaciontutoralumno_1.getTutorAlumno);

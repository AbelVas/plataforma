"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const anuncios_1 = require("../controllers/anuncios");
const session_1 = require("../middleware/session");
// Mi primer Appi Queza
const router = (0, express_1.Router)();
exports.router = router;
router.get("/", session_1.checkJwt, anuncios_1.getAnuncios);
router.get("/:id", session_1.checkJwt, anuncios_1.getAnuncio);
router.put("/:id", session_1.checkJwt, anuncios_1.updateAnuncio);
router.delete("/:id", session_1.checkJwt, anuncios_1.deleteAnuncio);
router.post("/", session_1.checkJwt, anuncios_1.insertAnuncio);
router.get("/anuncio-grado/:id", session_1.checkJwt, anuncios_1.getAnuncioGrado);

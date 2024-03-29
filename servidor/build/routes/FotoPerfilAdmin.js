"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const FotoPerfilAdmin_1 = require("../utils/FotoPerfilAdmin");
const router = (0, express_1.Router)();
exports.router = router;
router.get("/profil-admin/photo", (req, res) => {
    res.send({ jala: "ahueso" });
});
router.post("/profil-admin/photo", FotoPerfilAdmin_1.handleFileUpload, (req, res) => {
    res.json({ message: 'Archivo Subido Correctamente' });
});

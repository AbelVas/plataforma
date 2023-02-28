import { Router } from "express";
import { getAnuncios,getAnuncio,updateAnuncio,deleteAnuncio,insertAnuncio,getAnuncioGrado } from "../controllers/anuncios";
import { checkRol } from "../middleware/rolCheck";
import { checkJwt } from "../middleware/session";
// Mi primer Appi Queza

const router=Router();

router.get("/",checkJwt,getAnuncios);
router.get("/:id",checkJwt,getAnuncio);
router.put("/:id",checkJwt,updateAnuncio);
router.delete("/:id",checkJwt,deleteAnuncio);
router.post("/",checkJwt,insertAnuncio);
router.get("/anuncio-grado/:id",checkJwt,getAnuncioGrado);

export{router};
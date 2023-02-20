import { Router } from "express";
import { getTutorAlumno } from "../controllers/relaciontutoralumno";
import { logMiddleware } from "../middleware/log";
import { checkJwt } from "../middleware/session";

const router=Router();

router.get("/tutoralumnos/:id",checkJwt,getTutorAlumno);

export {router};
import { Request, Response } from "express";
import { obtenerJornadasService, obtenerJornadaService, insertJornadaService, updateJornadaService, deleteJornadaService } from "../service/jornadas";
import { handleHttp } from "../utils/error.handle";

// Obtener todas las jornadas
const getJornadas = async (req: Request, res: Response) => {
    try {
        const resultadoJornada = await obtenerJornadasService();
        res.status(200).send(resultadoJornada);
    } catch (e) {
        handleHttp(e, req, res);
    }
};

// Obtener una jornada por su ID
const getJornada = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const resultadoJornada = await obtenerJornadaService(id);

        if (!resultadoJornada) {
            res.status(404).send({ message: "Jornada no encontrada" });
            return;
        }

        res.status(200).send(resultadoJornada);
    } catch (e) {
        handleHttp(e, req, res);
    }
};

// Actualizar una jornada
const updateJornada = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const resultadoJornada = await updateJornadaService(req.body, id);

        if (resultadoJornada.affectedRows === 0) {
            res.status(404).send({ message: "No se pudo actualizar, jornada no encontrada" });
            return;
        }

        res.status(200).send({ message: "Jornada actualizada con éxito" });
    } catch (e) {
        handleHttp(e, req, res);
    }
};

// Eliminar una jornada
const deleteJornada = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const resultadoJornada = await deleteJornadaService(id);

        if (resultadoJornada.affectedRows === 0) {
            res.status(404).send({ message: "No se pudo eliminar, jornada no encontrada" });
            return;
        }

        res.status(200).send({ message: "Jornada eliminada con éxito" });
    } catch (e) {
        handleHttp(e, req, res);
    }
};

// Insertar una nueva jornada
const insertarJornada = async (req: Request, res: Response) => {
    try {
        const resultadoJornada = await insertJornadaService(req.body);
        res.status(201).send({ message: "Jornada creada con éxito", id: resultadoJornada.insertId });
    } catch (e) {
        handleHttp(e, req, res);
    }
};

export { getJornadas, getJornada, updateJornada, deleteJornada, insertarJornada };

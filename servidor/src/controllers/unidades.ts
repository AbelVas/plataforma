import { Request, Response } from "express";
import {
    insertUnidadService,
    obtenerUnidadesService,
    obtenerUnidadService,
    updateUnidadService,
    deleteUnidadService,
    getUnidadesActivasService
} from "../service/unidades";
import { handleHttp } from "../utils/error.handle";

// Obtener todas las unidades
const getUnidades = async (req: Request, res: Response) => {
    try {
        const resultadoUnidades = await obtenerUnidadesService();
        res.status(200).send(resultadoUnidades);
    } catch (e) {
        handleHttp(e, req, res);
    }
};

// Obtener una unidad por su ID
const getUnidad = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const resultadoUnidad = await obtenerUnidadService(id);

        if (!resultadoUnidad) {
            res.status(404).send({ message: "Unidad no encontrada" });
            return;
        }

        res.status(200).json(resultadoUnidad);
    } catch (e) {
        handleHttp(e, req, res);
    }
};

// Insertar una nueva unidad
const postUnidad = async (req: Request, res: Response) => {
    try {
        const responseUnidad = await insertUnidadService(req.body);
        res.status(201).send({ message: "Unidad creada con éxito", id: responseUnidad.insertId });
    } catch (e) {
        handleHttp(e, req, res);
    }
};

// Actualizar una unidad por su ID
const updateUnidades = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const responseUpdate = await updateUnidadService(req.body, id);

        if (responseUpdate.affectedRows === 0) {
            res.status(404).send({ message: "No se pudo actualizar, unidad no encontrada" });
            return;
        }

        res.status(200).send({ message: "Unidad actualizada con éxito" });
    } catch (e) {
        handleHttp(e, req, res);
    }
};

// Eliminar una unidad por su ID
const deleteUnidad = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const responseDelete = await deleteUnidadService(id);

        if (responseDelete.affectedRows === 0) {
            res.status(404).send({ message: "No se pudo eliminar, unidad no encontrada" });
            return;
        }

        res.status(200).send({ message: "Unidad eliminada con éxito" });
    } catch (e) {
        handleHttp(e, req, res);
    }
};

// Obtener todas las unidades activas
const getUnidadActiva = async (req: Request, res: Response) => {
    try {
        const resultadoUnidades = await getUnidadesActivasService();
        res.status(200).send(resultadoUnidades);
    } catch (e) {
        handleHttp(e, req, res);
    }
};

export { getUnidades, getUnidad, postUnidad, updateUnidades, deleteUnidad, getUnidadActiva };

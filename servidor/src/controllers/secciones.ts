import { Request, Response } from "express";
import { 
    deleteSeccionService, 
    updateSeccionService, 
    insertarSeccionService, 
    getSeccionesService, 
    getSeccionService 
} from "../service/secciones";
import { handleHttp } from "../utils/error.handle";

// Obtener todas las secciones
const getSecciones = async (req: Request, res: Response) => {
    try {
        const secciones = await getSeccionesService();
        res.status(200).send(secciones);
    } catch (e) {
        handleHttp(e, req, res);
    }
};

// Obtener una sección por ID
const getSeccion = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const seccion = await getSeccionService(id);

        if (!seccion) {
            res.status(404).send({ message: "Sección no encontrada" });
            return;
        }

        res.status(200).send(seccion);
    } catch (e) {
        handleHttp(e, req, res);
    }
};

// Actualizar una sección por su ID
const updateSeccion = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await updateSeccionService(id, req.body);

        if (result.affectedRows === 0) {
            res.status(404).send({ message: "No se pudo actualizar, sección no encontrada" });
            return;
        }

        res.status(200).send({ message: "Sección actualizada con éxito" });
    } catch (e) {
        handleHttp(e, req, res);
    }
};

// Eliminar una sección por su ID
const deleteSeccion = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await deleteSeccionService(id);

        if (result.affectedRows === 0) {
            res.status(404).send({ message: "No se pudo eliminar, sección no encontrada" });
            return;
        }

        res.status(200).send({ message: "Sección eliminada con éxito" });
    } catch (e) {
        handleHttp(e, req, res);
    }
};

// Insertar una nueva sección
const insertSeccion = async (req: Request, res: Response) => {
    try {
        const result = await insertarSeccionService(req.body);
        res.status(201).send({ message: "Sección creada con éxito", id: result.insertId });
    } catch (e) {
        handleHttp(e, req, res);
    }
};

export { getSecciones, getSeccion, updateSeccion, deleteSeccion, insertSeccion };

import { Request, Response } from "express";
import { 
    insertNivelService, 
    obtenerNivelesService, 
    obtenerNivelService, 
    eliminarNivelService, 
    editarNivelService, 
    getNivelesporJornadaService 
} from "../service/niveles";
import { handleHttp } from "../utils/error.handle";
import { io } from "../app"; // Importa el objeto de Socket.io

// Obtener todos los niveles
const getNiveles = async (req: Request, res: Response) => {
    try {
        const responseNivel = await obtenerNivelesService();
        res.status(200).send(responseNivel);
    } catch (e) {
        handleHttp(e, req, res);
    }
};

// Obtener un nivel por ID
const getNivel = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const responseNivel = await obtenerNivelService(id);

        if (!responseNivel) {
            res.status(404).send({ message: "Nivel no encontrado" });
            return;
        }

        res.status(200).send(responseNivel);
    } catch (e) {
        handleHttp(e, req, res);
    }
};

// Actualizar un nivel
const updateNivel = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;  // El nombre del usuario que realiza la actualización

        const responseNivel = await editarNivelService(req.body, id);

        if (responseNivel.affectedRows === 0) {
            res.status(404).send({ message: "No se pudo actualizar, nivel no encontrado" });
            return;
        }

        // Emitir un evento de Socket.io para notificar a los administradores
        io.emit("Actualizar-nivel", { mensaje: `El usuario "${nombre}" actualizó un nivel` });
        res.status(200).send({ message: "Nivel actualizado con éxito" });
    } catch (e) {
        handleHttp(e, req, res);
    }
};

// Eliminar un nivel
const deleteNivel = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;  // El nombre del usuario que realiza la eliminación

        const responseNivel = await eliminarNivelService(id);

        if (responseNivel.affectedRows === 0) {
            res.status(404).send({ message: "No se pudo eliminar, nivel no encontrado" });
            return;
        }

        // Emitir un evento de Socket.io para notificar a los administradores
        io.emit("Eliminar-nivel", { mensaje: `El usuario "${nombre}" eliminó un nivel` });
        res.status(200).send({ message: "Nivel eliminado con éxito" });
    } catch (e) {
        handleHttp(e, req, res);
    }
};

// Insertar un nuevo nivel
const insertNivel = async (req: Request, res: Response) => {
    try {
        const { nombre } = req.body;  // El nombre del usuario que realiza la inserción
        const responseNivel = await insertNivelService(req.body);

        // Emitir un evento de Socket.io para notificar a los administradores
        io.emit("nuevo-nivel", { mensaje: `El usuario "${nombre}" creó un nuevo nivel` });
        res.status(201).send({ message: "Nivel creado con éxito", id: responseNivel.insertId });
    } catch (e) {
        handleHttp(e, req, res);
    }
};

// Obtener niveles por jornada
const getNivelesporJornada = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const responseNivelporJornada = await getNivelesporJornadaService(id);

        if (!responseNivelporJornada.length) {
            res.status(404).send({ message: "No se encontraron niveles para la jornada proporcionada" });
            return;
        }

        res.status(200).send(responseNivelporJornada);
    } catch (e) {
        handleHttp(e, req, res);
    }
};

export { getNiveles, getNivel, updateNivel, deleteNivel, insertNivel, getNivelesporJornada };

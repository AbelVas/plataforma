import { Request, Response } from "express";
import { 
    obtenerCodigoService, 
    obtenerCodigosService, 
    updateCodigoService, 
    deleteCodigoService, 
    insertCodigoService 
} from "../service/codigos";
import { handleHttp } from "../utils/error.handle";

// Obtener todos los códigos
const getCodigos = async (req: Request, res: Response) => {
    try {
        const resultadoCodigos = await obtenerCodigosService();
        res.status(200).send(resultadoCodigos);
    } catch (e) {
        handleHttp(e, req, res);
    }
};

// Obtener un código específico por su valor y tipo
const getCodigo = async (req: Request, res: Response) => {
    try {
        const { codigo, idTipoCodigo } = req.body;
        const resultadoCodigo = await obtenerCodigoService(codigo, idTipoCodigo);

        if (!resultadoCodigo) {
            res.status(404).send({ message: "Código no encontrado o inactivo" });
            return;
        }

        res.status(200).send(resultadoCodigo);
    } catch (e) {
        handleHttp(e, req, res);
    }
};

// Actualizar un código por su ID
const updateCodigo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const resultadoUpCodigo = await updateCodigoService(req.body, id);

        if (resultadoUpCodigo.affectedRows === 0) {
            res.status(404).send({ message: "Código no encontrado" });
            return;
        }

        res.status(200).send({ message: "Código actualizado con éxito" });
    } catch (e) {
        handleHttp(e, req, res);
    }
};

// Eliminar un código por su ID
const deleteCodigo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const resulDeletCodigo = await deleteCodigoService(id);

        if (resulDeletCodigo.affectedRows === 0) {
            res.status(404).send({ message: "Código no encontrado" });
            return;
        }

        res.status(200).send({ message: "Código eliminado con éxito" });
    } catch (e) {
        handleHttp(e, req, res);
    }
};

// Insertar un nuevo código
const insertCodigo = async (req: Request, res: Response) => {
    try {
        const resultadoInsCodigo = await insertCodigoService(req.body);
        res.status(201).send({ message: "Código creado con éxito", id: resultadoInsCodigo.insertId });
    } catch (e) {
        handleHttp(e, req, res);
    }
};

export { getCodigo, getCodigos, updateCodigo, deleteCodigo, insertCodigo };

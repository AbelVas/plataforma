import conexion from "../config/database";

// Definimos un tipo para el nivel
interface Nivel {
    idNivel?: string;
    idJornada: string;
    jornada: string;
    nivel: string;
}

// Insertar un nuevo nivel
const insertNivelService = async (data: Partial<Nivel>): Promise<any> => {
    try {
        const response = await conexion.query("INSERT INTO tbNivel SET ?", [data]);
        return response;
    } catch (error) {
        throw new Error("Error al insertar nivel");
    }
};

// Obtener todos los niveles
const obtenerNivelesService = async (): Promise<Nivel[]> => {
    try {
        const response = await conexion.query(`
            SELECT n.idNivel, j.idJornada, j.jornada, n.nivel 
            FROM tbNivel n 
            INNER JOIN tbJornada j ON j.idJornada = n.idJornada
        `);
        return response;
    } catch (error) {
        throw new Error("Error al obtener niveles");
    }
};

// Obtener un nivel por su ID
const obtenerNivelService = async (id: string): Promise<Nivel | null> => {
    try {
        const response = await conexion.query(`
            SELECT n.idNivel, j.idJornada, j.jornada, n.nivel 
            FROM tbNivel n 
            INNER JOIN tbJornada j ON j.idJornada = n.idJornada 
            WHERE n.idNivel = ?
        `, [id]);
        return response.length ? response[0] : null;
    } catch (error) {
        throw new Error(`Error al obtener nivel con ID: ${id}`);
    }
};

// Eliminar un nivel por su ID
const eliminarNivelService = async (id: string): Promise<any> => {
    try {
        const response = await conexion.query("DELETE FROM tbNivel WHERE idNivel = ?", [id]);
        return response;
    } catch (error) {
        throw new Error(`Error al eliminar nivel con ID: ${id}`);
    }
};

// Editar un nivel por su ID
const editarNivelService = async (data: Partial<Nivel>, id: string): Promise<any> => {
    try {
        const response = await conexion.query("UPDATE tbNivel SET ? WHERE idNivel = ?", [data, id]);
        return response;
    } catch (error) {
        throw new Error(`Error al actualizar nivel con ID: ${id}`);
    }
};

// Obtener niveles por jornada
const getNivelesporJornadaService = async (idJornada: string): Promise<Nivel[]> => {
    try {
        const response = await conexion.query(`
            SELECT n.idNivel, j.idJornada, j.jornada, n.nivel 
            FROM tbNivel n 
            INNER JOIN tbJornada j ON j.idJornada = n.idJornada 
            WHERE j.idJornada = ?
        `, [idJornada]);
        return response;
    } catch (error) {
        throw new Error(`Error al obtener niveles por jornada con ID: ${idJornada}`);
    }
};

export {
    insertNivelService,
    obtenerNivelesService,
    obtenerNivelService,
    eliminarNivelService,
    editarNivelService,
    getNivelesporJornadaService
};

/**
 * Configuración centralizada de constantes para evitar "magic strings".
 * Se utiliza la API oficial de tiempo real del Ministerio para mayor estabilidad.
 */
export const CONFIG = {
    // URL base estándar para obtener los datos de estaciones actuales
    API_URL_BASE: "https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/FiltroProvincia",

    // Lista de provincias con sus IDs correspondientes
    PROVINCIAS_INTERES: [
        { id: "28", nombre: "Madrid" },
        { id: "15", nombre: "A Coruña" },
        { id: "38", nombre: "Santa Cruz de Tenerife" },
        { id: "06", nombre: "Badajoz" }
    ]
};

// Interfaz para asegurar el tipado correcto en el resto del proyecto
export interface Provincia {
    id: string;
    nombre: string;
}
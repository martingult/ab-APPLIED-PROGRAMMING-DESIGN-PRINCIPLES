export interface Provincia {
    id: string;
    nombre: string;
}

export const CONFIG = {
    API_URL_BASE: "https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/FiltroProvincia",
    
    PROVINCIAS_INTERES: [
        { id: "28", nombre: "Madrid" },
        { id: "15", nombre: "A Coruña" },
        { id: "38", nombre: "Santa Cruz de Tenerife" },
        { id: "06", nombre: "Badajoz" }
    ] as Provincia[],

    // Definimos el objeto y sus propiedades explícitamente
    COMBUSTIBLES: {
        GASOLEO_A: "precioGasoleoA",
        GASOLINA_95: "precioGasolina95E5"
    }
};
export interface RawFuelStation {
    "Provincia": string;
    "Localidad": string;
    "Rótulo": string;
    "Dirección": string;
    "Precio Gasoleo A": string;
    "Precio Gasolina 95 E5": string;
}

export interface RawMinistryResponse {
    "Fecha": string;
    "ListaEESSPrecio": RawFuelStation[];
}
/**
 * Interfaz que representa una gasolinera con precios normalizados.
 */
export interface FuelStation {
    provincia: string;
    localidad: string;
    rotulo: string;
    direccion: string;
    precioGasoleoA: number | null;
    precioGasolina95E5: number | null;
}
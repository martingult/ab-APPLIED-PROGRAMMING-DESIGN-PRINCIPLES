/**
 * Interfaz que representa una gasolinera con precios normalizados.
 * Los nombres de las propiedades se han estandarizado para cumplir con Clean Code.
 */
export interface FuelStation {
    provincia: string;
    localidad: string;
    rotulo: string;
    direccion: string;
    precioGasoleoA: number | null;
    precioGasolina95E5: number | null;
}
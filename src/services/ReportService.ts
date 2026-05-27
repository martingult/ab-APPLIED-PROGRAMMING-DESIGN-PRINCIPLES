import { FuelStation } from '../models/FuelStation.js';

/**
 * Servicio encargado de realizar los cálculos estadísticos sobre los datos de gasolineras.
 * Implementa métodos eficientes para el procesamiento de precios.
 */
export class ReportService {
    private stations: FuelStation[];

    constructor(stations: FuelStation[]) {
        this.stations = stations;
    }

    /**
     * Calcula la media aritmética de un tipo de combustible.
     * @param fuelType El campo del combustible a procesar.
     * @returns La media redondeada a 3 decimales o 0 si no hay datos.
     */
    getAveragePrice(fuelType: 'precioGasoleoA' | 'precioGasolina95E5'): number {
        const prices = this.stations
            .map(s => s[fuelType])
            .filter((p): p is number => p !== null && p > 0);

        if (prices.length === 0) return 0;

        const sum = prices.reduce((acc, curr) => acc + curr, 0);
        return parseFloat((sum / prices.length).toFixed(3));
    }

    /**
     * Obtiene el Top 5 de gasolineras más baratas y más caras.
     * Se filtra primero para evitar errores con valores nulos.
     */
    getTop5(fuelType: 'precioGasoleoA' | 'precioGasolina95E5') {
        const validStations = this.stations.filter(s => s[fuelType] !== null);

        // Ordenamos una sola vez para extraer ambos extremos
        const sorted = [...validStations].sort((a, b) => (a[fuelType]! - b[fuelType]!));

        return {
            cheapest: sorted.slice(0, 5),
            expensive: sorted.slice(-5).reverse()
        };
    }
}
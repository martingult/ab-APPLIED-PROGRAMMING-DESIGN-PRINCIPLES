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
    /**
     * Devuelve una estructura con datos de ejemplo para la gráfica semanal.
     * En el futuro, puedes sustituir los valores por el filtrado real de tus datos.
     *  fuelType Tipo de combustible
     * Array de 7 números (precio medio por cada día de la semana)
     */
    getWeeklyAverageData(fuelType: 'precioGasoleoA' | 'precioGasolina95E5'): number[] {
        // Simulamos la media de los 7 días de la semana
        // Aquí es donde harías un .filter() por fechas si tuvieras el histórico
        return [1.55, 1.54, 1.56, 1.58, 1.57, 1.55, 1.53]; 
    }
}

import { FuelStation } from '../models/FuelStation.js';

/**
 * Servicio encargado de realizar los cálculos estadísticos sobre los datos de gasolineras.
 * Implementa métodos eficientes para el procesamiento de precios y visualización.
 */
export class ReportService {
    private stations: FuelStation[];

    constructor(stations: FuelStation[]) {
        this.stations = stations;
    }

    /**
     * Calcula la media aritmética de un tipo de combustible.
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
     * Obtienes el Top 5 de gasolineras más baratas y más caras.
     */
    getTop5(fuelType: 'precioGasoleoA' | 'precioGasolina95E5') {
        const validStations = this.stations.filter(s => s[fuelType] !== null);

        // Ordenamos para obtener los extremos
        const sorted = [...validStations].sort((a, b) => (a[fuelType]! - b[fuelType]!));

        return {
            cheapest: sorted.slice(0, 5),
            expensive: sorted.slice(-5).reverse()
        };
    }

    /**
     * Generas una URL dinámica para QuickChart visualizando los precios del Top 5.
     * stations Array de estaciones (ej. el resultado del getTop5().cheapest)
     *fuelType El campo del combustible a graficar
     *  URL pública de la gráfica generada por QuickChart
     */
    getChartUrl(stations: FuelStation[], fuelType: 'precioGasoleoA' | 'precioGasolina95E5'): string {
        const labels = stations.map(s => s['rotulo']);
        const prices = stations.map(s => s[fuelType]);

        const chartConfig = {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Precio (€)',
                    data: prices,
                    backgroundColor: 'rgba(54, 162, 235, 0.5)'
                }]
            },
            options: {
                title: { display: true, text: 'Top 5 Estaciones más Baratas' }
            }
        };

        // Construyo la URL codificando el objeto de configuración
        return `https://quickchart.io/chart?c=${encodeURIComponent(JSON.stringify(chartConfig))}`;
    }

    /**
     * Devuelves datos para la gráfica semanal.
     */
    getWeeklyAverageData(fuelType: 'precioGasoleoA' | 'precioGasolina95E5'): number[] {
        return [1.55, 1.54, 1.56, 1.58, 1.57, 1.55, 1.53]; 
    }
}
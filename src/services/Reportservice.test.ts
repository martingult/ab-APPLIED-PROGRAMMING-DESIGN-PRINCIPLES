import { FuelStation } from '../models/FuelStation.js';

export class ReportService {
    constructor(private stations: FuelStation[]) {}

    // Usamos filter para ignorar nulos y map para obtener precios
    getAveragePrice(fuelType: 'precioGasoleoA' | 'precioGasolina95E5'): number {
        const validPrices = this.stations
            .map(s => s[fuelType])
            .filter((p): p is number => p !== null);

        if (validPrices.length === 0) return 0;
        const sum = validPrices.reduce((a, b) => a + b, 0);
        return parseFloat((sum / validPrices.length).toFixed(3));
    }

    // Mejora de eficiencia: En lugar de ordenar todo, si solo quieres el top 5, 
    // podrías usar algoritmos más avanzados, pero un .sort().slice(0, 5) 
    // suele ser aceptable si el dataset no tiene millones de registros.
    getTop5(fuelType: 'precioGasoleoA' | 'precioGasolina95E5') {
        const sorted = [...this.stations]
            .filter(s => s[fuelType] !== null)
            .sort((a, b) => (a[fuelType]! - b[fuelType]!));
            
        return {
            cheapest: sorted.slice(0, 5),
            expensive: sorted.slice(-5).reverse()
        };
    }
}
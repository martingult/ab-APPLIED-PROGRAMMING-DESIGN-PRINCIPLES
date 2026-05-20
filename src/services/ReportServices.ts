
interface FuelStation {
    precioGasoleoA?: number | null;
    precioGasolina95E5?: number | null;
    [key: string]: any;
}

export class ReportService {
    private stations: FuelStation[];

    constructor(stations: FuelStation[]) {
        this.stations = stations;
    }
/**
     * Calcula la media aritmética de un tipo de combustible, ignorando valores nulos.
     *  fuelType La propiedad del combustible a calcular.
     *  El precio medio redondeado a 3 decimales.
     */
    
    /**
     * Ordena las gasolineras por precio para obtener el top 5 más barato y más caro.
     * fuelType La propiedad del combustible a filtrar.
     *  Objeto con las 5 más baratas y las 5 más caras.
     */
    public getAveragePrice(fuelType: 'precioGasoleoA' | 'precioGasolina95E5'): number {
        const validStations = this.stations.filter(s => s[fuelType] !== null);
        if (validStations.length === 0) return 0;
        const total = validStations.reduce((sum, s) => sum + (s[fuelType] as number), 0);
        return parseFloat((total / validStations.length).toFixed(3));
    }

    public getTop5(fuelType: 'precioGasoleoA' | 'precioGasolina95E5') {
        const valid = this.stations.filter(s => s[fuelType] !== null);
        valid.sort((a, b) => (a[fuelType] as number) - (b[fuelType] as number));
        return {
            cheapest: valid.slice(0, 5),
            mostExpensive: valid.slice(-5).reverse()
        };
    }
}
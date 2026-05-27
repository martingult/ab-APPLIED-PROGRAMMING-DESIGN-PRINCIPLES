import { FuelStation } from '../models/FuelStation.js';

export class ApiService {
    private baseUrl = "https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/FiltroProvincia";

    async getStationsByProvince(provinceId: string): Promise<FuelStation[]> {
        try {
            const response = await fetch(`${this.baseUrl}/${provinceId}`);
            if (!response.ok) {
                throw new Error(`Error de red: ${response.status}`);
            }
            const data = await response.json();
            
            // MAPEO: Transformamos los datos crudos a nuestra interfaz
            return data.ListaEESSPrecio.map((estacion: any) => ({
                rotulo: estacion['Rótulo'] || 'Sin Rótulo',
                provincia: estacion['Provincia'],
                localidad: estacion['Localidad'],
                direccion: estacion['Dirección'],
                // Transformamos "1,55" a número 1.55 para poder hacer cálculos
                precioGasoleoA: estacion['Precio Gasoleo A'] ? parseFloat(estacion['Precio Gasoleo A'].replace(',', '.')) : null,
                precioGasolina95E5: estacion['Precio Gasolina 95 E5'] ? parseFloat(estacion['Precio Gasolina 95 E5'].replace(',', '.')) : null
            }));
        } catch (error) {
            console.error(`Error al obtener datos de la provincia ${provinceId}:`, error);
            return [];
        }
    }
}
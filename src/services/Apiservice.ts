import { CONFIG } from '../config/constant.js';
import { FuelStation } from '../models/FuelStation.js';

export class ApiService {
    async getStationsByProvince(idProvincia: string): Promise<FuelStation[]> {
        try {
            // Construcción correcta: URL base + ID
            const url = `${CONFIG.API_URL_BASE}/${idProvincia}`;
            const response = await fetch(url);
            
            if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
            
            const data = await response.json();
            // Retornamos la lista de estaciones
            return data.ListaEESSPrecio || [];
        } catch (error) {
            console.error(`Error en provincia ${idProvincia}:`, error);
            return [];
        }
    }
}
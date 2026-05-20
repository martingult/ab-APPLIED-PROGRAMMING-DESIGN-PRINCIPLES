import { CONFIG } from '../config/constants.js';
import { RawMinistryResponse, RawFuelStation } from '../models/RawData.js';
import { FuelStation } from '../models/FuelStations';

export class ApiService {
    
    /**
     * Descarga y normaliza los datos de gasolineras de una provincia específica.
     *provinciaId El código identificador de la provincia.
     * Una promesa con un array de objetos FuelStation limpios.
     */
    async getStationsByProvince(provinciaId: string): Promise<FuelStation[]> {
        // Usamos la URL desde la configuración para evitar "magic values"
        const url = `${CONFIG.API_URL_BASE}${provinciaId}`;
        
        const response = await fetch(url);
        const data: RawMinistryResponse = await response.json();

        // Normalizamos los datos de la API al modelo de nuestra aplicación
        return data.ListaEESSPrecio.map((raw: RawFuelStation) => ({
            provincia: raw.Provincia,
            localidad: raw.Localidad,
            rotulo: raw['Rótulo'],
            direccion: raw['Dirección'],
            precioGasoleoA: this.parsePrice(raw['Precio Gasoleo A']),
            precioGasolina95E5: this.parsePrice(raw['Precio Gasolina 95 E5'])
        }));
    }

    private parsePrice(price: string | null): number | null {
        if (!price) return null;
        return parseFloat(price.replace(',', '.'));
    }
}
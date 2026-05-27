import { CONFIG } from '../config/constant.js';
import { FuelStation } from '../models/FuelStation.js';

export class ApiService {
    /**
     * Descarga los datos de gasolineras filtrando por fecha y provincia.
     * @param fecha Fecha en formato DD-MM-YYYY
     * @param idProvincia ID de la provincia
     */
    async getStationsByProvince(fecha: string, idProvincia: string): Promise<FuelStation[]> {
        try {
            // Construcción correcta de la URL usando la constante que definimos
            const url = `${CONFIG.API_URL_BASE}/${fecha}/${idProvincia}`;
            
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            const data = await response.json();

            // Mapeo de datos recibidos al nuevo modelo estandarizado
            return data.ListaEESSPrecio.map((raw: any) => ({
                provincia: raw.Provincia,
                localidad: raw.Localidad,
                rotulo: raw['Rótulo'],
                direccion: raw['Dirección'],
                precioGasoleoA: this.parsePrice(raw['Precio Gasoleo A']),
                precioGasolina95E5: this.parsePrice(raw['Precio Gasolina 95 E5'])
            }));
            
        } catch (error) {
            console.error(`Error en ApiService para provincia ${idProvincia}:`, error);
            // Devolvemos un array vacío para que el programa no se detenga
            return [];
        }
    }

    private parsePrice(price: string | null): number | null {
        if (!price) return null;
        // Convertimos el formato español "1,55" a formato número "1.55"
        return parseFloat(price.replace(',', '.'));
    }
}
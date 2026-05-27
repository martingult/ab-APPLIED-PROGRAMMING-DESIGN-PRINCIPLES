import { CONFIG } from '../config/constant.js';
import { FuelStation } from '../models/FuelStation.js';

export class ApiService {

async getStationsByProvince(fecha: string, idProvincia: string): Promise<FuelStation[]> {
    try {
        // CAMBIO: Muchas APIs del Geoportal usan el ID como parte de la ruta, 
        // no como parámetro ?IDProvincia=
        const url = `${CONFIG.API_URL_BASE}/${idProvincia}`;
        
        console.log("DEBUG: Intentando acceder a la URL ->", url);
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        
        // El Geoportal devuelve la lista bajo la propiedad 'ListaEESSPrecio'
        const lista = data.ListaEESSPrecio || [];

        return lista.map((raw: any) => ({
            provincia: raw.Provincia,
            localidad: raw.Localidad,
            rotulo: raw['Rótulo'],
            direccion: raw['Dirección'],
            precioGasoleoA: this.parsePrice(raw['Precio Gasoleo A']),
            precioGasolina95E5: this.parsePrice(raw['Precio Gasolina 95 E5'])
        }));
        
    } catch (error) {
        console.error(`Error en ApiService para provincia ${idProvincia}:`, error);
        return [];
    }

    }

    private parsePrice(price: string | null): number | null {
        if (!price) return null;
        // Convertimos el formato español "1,55" a formato número "1.55"
        return parseFloat(price.replace(',', '.'));
    }
}
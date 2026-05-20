import { CONFIG } from '../config/constants.js';
import { RawMinistryResponse, RawFuelStation } from '../models/RawData.js';

export interface FuelStation {
    provincia: string;
    localidad: string;
    rotulo: string;
    direccion: string;
    precioGasoleoA: number | null;
    precioGasolina95E5: number | null;
}

export class ApiService {
    private parsePrice(priceStr: string): number | null {
        if (!priceStr || priceStr.trim() === "") return null;
        const numericPrice = parseFloat(priceStr.replace(',', '.'));
        return isNaN(numericPrice) ? null : numericPrice;
    }

    public async getStationsByProvince(fecha: string, idProvincia: string): Promise<FuelStation[]> {
        const url = `${CONFIG.API_URL_BASE}/${fecha}/${idProvincia}`;
        try {
            const respuesta = await fetch(url);
            if (!respuesta.ok) throw new Error(`Error HTTP: ${respuesta.status}`);
            const rawData = (await respuesta.json()) as RawMinistryResponse;
            return rawData.ListaEESSPrecio.map((raw: RawFuelStation) => ({
                provincia: raw["Provincia"],
                localidad: raw["Localidad"],
                rotulo: raw["Rótulo"],
                direccion: raw["Dirección"],
                precioGasoleoA: this.parsePrice(raw["Precio Gasoleo A"]),
                precioGasolina95E5: this.parsePrice(raw["Precio Gasolina 95 E5"])
            }));
        } catch (error) {
            console.error(`Error al obtener datos de provincia ${idProvincia}:`, error);
            return [];
        }
    }
}
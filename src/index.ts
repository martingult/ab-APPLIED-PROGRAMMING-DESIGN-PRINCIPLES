import { CONFIG } from './config/constant.js';
import { ApiService } from './services/Apiservice.js';
import { ReportService } from './services/ReportService.js';

const apiService = new ApiService();

async function main() {
    console.log("Iniciando generación de informes de mercado...");

    for (const provincia of CONFIG.PROVINCIAS_INTERES) {
        console.log(`\n--- Generando informe para: ${provincia.nombre} ---`);
        
        // Pasamos solo el ID, tal como espera el ApiService
        const stations = await apiService.getStationsByProvince(provincia.id);
        
        if (stations.length === 0) {
            console.log(`No se encontraron datos para ${provincia.nombre}.`);
            continue;
        }

        const reportService = new ReportService(stations);
        const fuelKey = CONFIG.COMBUSTIBLES.GASOLEO_A as "precioGasoleoA";
        
        // Generación del informe simple
        const media = reportService.getAveragePrice(fuelKey);
        console.log(`Media Gasóleo A: ${media} €`);
        
        const top5 = reportService.getTop5(fuelKey);
        console.log("Top 5 más baratas:");
        top5.cheapest.forEach((s: any) => console.log(` - ${s['Rótulo']}: ${s[fuelKey]} €`));
    }
}

main();
import { CONFIG } from './config/constants';
import { ApiService } from './services/Apiservices.ts';
import { ReportService } from './services/ReportServices.ts';
import { FuelStation } from './models/FuelStations.ts';
async function main() {
    console.log("Iniciando generación de informe de mercado...");
    const fecha = "09-04-2026"; 
    const apiService = new ApiService();
    let allStations: FuelStation[] = [];

    for (const provincia of CONFIG.PROVINCIAS_INTERES) {
        console.log(`Descargando datos de ${provincia.nombre}...`);
        const stations = await apiService.getStationsByProvince(fecha, provincia.id);
        allStations = allStations.concat(stations);
    }

    const reportService = new ReportService(allStations);

    console.log("\n=== INFORME: GASÓLEO A ===");
    console.log(`Media en las provincias objetivo: ${reportService.getAveragePrice('precioGasoleoA')} €`);
    const top5Gasoleo = reportService.getTop5('precioGasoleoA');
    console.log("\nTop 5 Más Baratas (Gasóleo A):");
    top5Gasoleo.cheapest.forEach(s => console.log(`- ${s.rotulo} (${s.localidad}, ${s.provincia}): ${s.precioGasoleoA} €`));

    console.log("\n=== INFORME: GASOLINA 95 E5 ===");
    console.log(`Media en las provincias objetivo: ${reportService.getAveragePrice('precioGasolina95E5')} €`);
    const top5Gasolina = reportService.getTop5('precioGasolina95E5');
    console.log("\nTop 5 Más Baratas (Gasolina 95):");
    top5Gasolina.cheapest.forEach(s => console.log(`- ${s.rotulo} (${s.localidad}, ${s.provincia}): ${s.precioGasolina95E5} €`));
}

main();
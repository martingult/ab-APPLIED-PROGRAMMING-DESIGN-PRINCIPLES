import { ApiService } from './services/Apiservice.js';
import { ReportService } from './services/ReportService.js';

const PROVINCIAS_INTERES = [
    { id: "28", nombre: "Madrid" },
    { id: "15", nombre: "A Coruña" },
    { id: "38", nombre: "Santa Cruz de Tenerife" },
    { id: "06", nombre: "Badajoz" }
];

async function main() {
    console.log("Iniciando generación de informes de mercado...\n");
    const apiService = new ApiService();

    for (const provincia of PROVINCIAS_INTERES) {
        // 1. Obtenemos datos limpios
        const stations = await apiService.getStationsByProvince(provincia.id);
        const reportService = new ReportService(stations);

        // 2. Calculamos estadísticas
        const mediaGasoleoA = reportService.getAveragePrice('precioGasoleoA');
        const mediaGasolina95 = reportService.getAveragePrice('precioGasolina95E5');
        const top5GasoleoA = reportService.getTop5('precioGasoleoA');

        // 3. Imprimimos el informe
        console.log(`=== INFORME: ${provincia.nombre} ===`);
        console.log(`Media Gasóleo A: ${mediaGasoleoA} €`);
        console.log(`Media Gasolina 95: ${mediaGasolina95} €`);
        console.log("Top 5 más baratas (Gasóleo A):");
        
        top5GasoleoA.cheapest.forEach(s => {
            console.log(`  - ${s.rotulo}: ${s.precioGasoleoA} €`);
        });

        // 4. Generamos la URL de la gráfica
        const chartUrl = reportService.getChartUrl(top5GasoleoA.cheapest, 'precioGasoleoA');
        console.log(`\nGráfica del Top 5: ${chartUrl}`);
        console.log("------------------------------------------\n");
    }
}

main();
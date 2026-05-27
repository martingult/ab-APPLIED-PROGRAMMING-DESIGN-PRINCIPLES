import { CONFIG } from './config/constant.js';
import { ApiService } from './services/Apiservice.js';
import { ReportService } from './services/ReportService.js';
import { FuelStation } from './models/FuelStation.js';

async function main() {
    console.log("Iniciando generación de informes de mercado...");

    // Usamos la fecha actual en lugar de una hard-coded
    const fechaActual = new Date().toLocaleDateString('es-ES').replace(/\//g, '-');
    const apiService = new ApiService();

    // Procesamos cada provincia por separado
    interface Provincia {
        id: string;
        nombre: string;
    }

    for (const provincia of CONFIG.PROVINCIAS_INTERES as Provincia[]) {
        try {
            console.log(`\n--- Generando informe para: ${provincia.nombre} ---`);
            
            // Gestión de errores: Si una provincia falla, el programa no se detiene
            const stations = await apiService.getStationsByProvince(fechaActual, provincia.id);
            
            if (stations.length === 0) {
                console.log(`No se encontraron datos para ${provincia.nombre}.`);
                continue;
            }

            const reportService = new ReportService(stations);
            printReport(provincia.nombre, reportService);

        } catch (error) {
            console.error(`Error crítico procesando ${provincia.nombre}:`, error);
        }
    }
}

function printReport(nombreProvincia: string, reportService: ReportService) {
    console.log(`=== INFORME: ${nombreProvincia} ===`);
    console.log(`Media Gasóleo A: ${reportService.getAveragePrice('precioGasoleoA')} €`);
    console.log(`Media Gasolina 95: ${reportService.getAveragePrice('precioGasolina95E5')} €`);
    
    const top5 = reportService.getTop5('precioGasoleoA');
    console.log(`Top 5 más baratas (Gasóleo A):`);
    top5.cheapest.forEach(s => console.log(`  - ${s.rotulo}: ${s.precioGasoleoA} €`));
}

main().catch(err => console.error("Error inesperado:", err));
import { CONFIG } from './config/constant.js';
import { ApiService } from './services/Apiservice.js';
import { ReportService } from './services/ReportService.js';

const apiService = new ApiService();

async function main() {
    console.log("Iniciando generación de informes de mercado...\n");

    for (const provincia of CONFIG.PROVINCIAS_INTERES) {
        console.log(`=== INFORME: ${provincia.nombre} ===`);
        
        // Descargamos las estaciones
        const stations = await apiService.getStationsByProvince(provincia.id);
        
        if (stations.length === 0) {
            console.log(`No se encontraron datos para ${provincia.nombre}.\n`);
            continue;
        }

        const reportService = new ReportService(stations);
        
        // 1. Mostrar Medias
        const mediaGasoleo = reportService.getAveragePrice('precioGasoleoA');
        const mediaGasolina = reportService.getAveragePrice('precioGasolina95E5');
        
        console.log(`Media Gasóleo A: ${mediaGasoleo} €`);
        console.log(`Media Gasolina 95: ${mediaGasolina} €`);
        
        // 2. Mostrar Top 5
        const top5 = reportService.getTop5('precioGasoleoA');
        console.log("Top 5 más baratas (Gasóleo A):");
        
        // Usamos 'rotulo' en minúsculas y sin tilde tal como lo arreglaste
        top5.cheapest.forEach(s => {
            console.log(`  - ${s.rotulo}: ${s.precioGasoleoA} €`);
        });

        // 3. Generar Gráfica Dinámica (Hito 3)
        // Comprobamos si has añadido el método getChartUrl. Si lo hiciste, usamos esto:
        if (typeof reportService.getChartUrl === 'function') {
            const chartUrl = reportService.getChartUrl(top5.cheapest, 'precioGasoleoA');
            console.log(`\nGráfica del Top 5: ${chartUrl}`);
        } else {
            // Si usaste el método getWeeklyAverageData original:
            const dataSemanal = reportService.getWeeklyAverageData('precioGasoleoA');
            const chartUrl = `https://quickchart.io/chart?c={type:'bar',data:{labels:['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'],datasets:[{label:'Precio Media',data:[${dataSemanal.join(',')}]}]}}`;
            console.log(`\nGráfica semanal: ${chartUrl}`);
        }

        console.log("------------------------------------------\n");
    }
}

main().catch(err => console.error("Error inesperado:", err));
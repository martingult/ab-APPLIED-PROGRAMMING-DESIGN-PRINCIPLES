import { test } from 'node:test';

function assertStrictEqual(actual: any, expected: any) {
    if (actual !== expected) {
        throw new Error(`Expected ${expected} but got ${actual}`);
    }
}
import { ReportService } from './ReportService.js';

test('El cálculo de la media debe ser correcto', () => {
    // 1. Preparamos datos falsos (mock) para la prueba
    const mockStations = [
        { precioGasoleoA: 1.0 },
        { precioGasoleoA: 2.0 }
    ] as any; 

    // 2. Iniciamos el servicio con esos datos
    const service = new ReportService(mockStations);

    // 3. Comprobamos que la media de 1.0 y 2.0 sea exactamente 1.5
    assertStrictEqual(service.getAveragePrice('precioGasoleoA'), 1.5);
});
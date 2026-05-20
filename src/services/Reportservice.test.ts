import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { ReportService } from './ReportServices.js';
import { FuelStation } from '../models/FuelStations.js';

describe('Pruebas del ReportService', () => {

    test('Debe calcular la media correctamente ignorando las gasolineras sin precio (null)', () => {
        // 1. PREPARACIÓN (Datos falsos)
        const gasolinerasInventadas: FuelStation[] = [
            { provincia: 'Madrid', localidad: 'A', rotulo: 'Gasolinera 1', direccion: '', precioGasoleoA: 1.500, precioGasolina95E5: null },
            { provincia: 'Madrid', localidad: 'B', rotulo: 'Gasolinera 2', direccion: '', precioGasoleoA: 2.000, precioGasolina95E5: null },
            { provincia: 'Madrid', localidad: 'C', rotulo: 'Gasolinera Rota', direccion: '', precioGasoleoA: null, precioGasolina95E5: null }
        ];

        const servicio = new ReportService(gasolinerasInventadas);

        // 2. EJECUCIÓN (Llamamos a tu función matemática)
        const mediaCalculada = servicio.getAveragePrice('precioGasoleoA');

        // 3. COMPROBACIÓN (La media de 1.5 y 2.0 tiene que ser 1.75)
        // Si no es 1.75, el test fallará y nos avisará.
        assert.strictEqual(mediaCalculada, 1.75);
    });

});
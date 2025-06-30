/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, HttpException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Controller('facturas')
export class FacturasController {
    constructor(
        @Inject('MS_FACTURAS') private readonly facturaClient: ClientProxy,
    ) { }

    @Post()
    crearFactura(@Body() data: any) {
        return this.facturaClient.send('createFactura', data).pipe(
            catchError((err) => {
                const status = err?.status || 500;
                const message = err?.message || 'Error inesperado en microservicio';
                return throwError(() => new HttpException(message, status));
            }),
        );
    }

    @Get()
    obtenerFacturas() {
        return this.facturaClient.send('findAllFactura', {}).pipe(
            catchError((err) => {
                const status = err?.status || 500;
                const message = err?.message || 'Error al obtener facturas';
                return throwError(() => new HttpException(message, status));
            }),
        );
    }

    @Get(':id')
    obtenerFactura(@Param('id') id: string) {
        return this.facturaClient.send('findOneFactura', id).pipe(
            catchError((err) => {
                const status = err?.status || 500;
                const message = err?.message || 'Factura no encontrada';
                return throwError(() => new HttpException(message, status));
            }),
        );
    }

    @Patch(':id')
    actualizarFactura(@Param('id') id: string, @Body() data: any) {
        return this.facturaClient.send('updateFactura', { id, data }).pipe(
            catchError((err) => {
                const status = err?.status || 500;
                const message = err?.message || 'Error al actualizar factura';
                return throwError(() => new HttpException(message, status));
            }),
        );
    }

    @Delete(':id')
    eliminarFactura(@Param('id') id: string) {
        return this.facturaClient.send('removeFactura', id).pipe(
            catchError((err) => {
                const status = err?.status || 500;
                const message = err?.message || 'Error al eliminar factura';
                return throwError(() => new HttpException(message, status));
            }),
        );
    }
}

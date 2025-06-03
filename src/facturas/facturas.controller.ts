import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('facturas')
export class FacturasController {
    constructor(@Inject('MS_FACTURAS') private readonly facturaClient: ClientProxy) { }

    @Post()
    crearFactura(@Body() data: any) {
        return this.facturaClient.send('createFactura', data); // espera respuesta
    }

    @Get()
    obtenerFacturas() {
        return this.facturaClient.send('findAllFactura', {});
    }

}

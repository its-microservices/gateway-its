import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('facturas')
export class FacturasController {
    constructor(@Inject('FACTURA_SERVICE') private client: ClientProxy) { }

    @Post()
    crearFactura(@Body() data: any) {
        return this.client.send('createFactura', data); // espera respuesta
    }

    @Get()
    obtenerFacturas() {
        return this.client.send('findAllFactura', {});
    }

}

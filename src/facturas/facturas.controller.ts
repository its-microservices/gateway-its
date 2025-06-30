import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('facturas')
export class FacturasController {
    constructor(@Inject('MS_FACTURAS') private readonly facturaClient: ClientProxy) { }

    @Post()
    crearFactura(@Body() data: any) {
        return this.facturaClient.send('createFactura', data);
    }

    @Get()
    obtenerFacturas() {
        return this.facturaClient.send('findAllFactura', {});
    }

    @Get(':id')
    obtenerFactura(@Param('id') id: string) {
        return this.facturaClient.send('findOneFactura', id);
    }

    @Patch(':id')
    actualizarFactura(@Param('id') id: string, @Body() data: any) {
        return this.facturaClient.send('updateFactura', { id, data });
    }

    @Delete(':id')
    eliminarFactura(@Param('id') id: string) {
        return this.facturaClient.send('removeFactura', id);
    }
}

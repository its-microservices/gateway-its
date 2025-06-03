import { Module } from '@nestjs/common';
import { FacturasController } from './facturas.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, FACTURA_SERVICE } from 'src/config';

@Module({
  controllers: [FacturasController],
  imports: [
    ClientsModule.register([
      {
        name: FACTURA_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.MS_FACTURA_HOST,
          port: envs.MS_FACTURA_PORT
        }
      }
    ]),
  ],
})
export class FacturasModule { }

import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { FacturasModule } from './facturas/facturas.module';

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    FacturasModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

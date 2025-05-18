import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/common';

@Controller('products')
export class ProductsController {
    constructor(
        @Inject('MS_PRODUCTS') private readonly productsClient: ClientProxy
    ) { }

    @Post()
    createProduct(@Body() data) {
        return this.productsClient.send('create_producto', data).pipe(
            catchError((error) => {
                throw new RpcException(error); // Lanza la excepción para que el cliente la maneje
            })
        );
    }

    @Get()
    findAllProducts(@Query() PaginationDto: PaginationDto)/* : Observable<any> */ {
        return this.productsClient.send('find_all_productos', PaginationDto);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.productsClient.send('find_one_producto', id).pipe(
            catchError((error) => {
                throw new RpcException(error); // Lanza la excepción para que el cliente la maneje
            })
        );
    }

    @Delete(':id')
    removeProducto(@Param('id', ParseIntPipe) id: number) {
        return this.productsClient.send('remove_producto', id).pipe(
            catchError((error) => {
                throw new RpcException(error); // Lanza la excepción para que el cliente la maneje
            })
        );
    }

    @Patch(':id')
    patchProducto(@Param('id', ParseIntPipe) id: number, @Body() updateProductoDto) {
        return this.productsClient.send('update_producto', { id, updateProductoDto }).pipe(
            catchError((error) => {
                throw new RpcException(error); // Lanza la excepción para que el cliente la maneje
            })
        );
    }
}

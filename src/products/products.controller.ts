import { Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/common';

@Controller('products')
export class ProductsController {
    constructor(
        @Inject('MS_PRODUCTS') private readonly productsClient: ClientProxy
    ) { }

    @Post()
    createProduct() {
        return 'Crear Producto';
    }


    @Get()
    findAllProducts(@Query() PaginationDto: PaginationDto)/* : Observable<any> */ {
        return this.productsClient.send('find_all_productos', PaginationDto);
        // return this.appService.getUsers().pipe(
        //   map((response: {data: []}) => {
        //     // Podés procesar la respuesta si querés, o devolverla directo
        //     return response.data; // o response.data si lo tenés estructurado así
        //   })
        // );
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
    removeProducto(@Param('id') id: string) {
        return `Eliminar usuario ${id}`;
    }

    @Patch(':id')
    patchProducto(@Param('id') id: string) {
        return `Actualizar usuario ${id}`;
    }
}

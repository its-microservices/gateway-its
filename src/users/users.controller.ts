import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/common';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('MS_USER') private readonly userClient: ClientProxy
  ) { }

  @Post()
  createUser(@Body() createUserDto) {
    return this.userClient.send('create_user', createUserDto);
  }


  @Get()
  findAllUsers(@Query() PaginationDto: PaginationDto)/* : Observable<any> */ {
    return this.userClient.send('find_all_users', PaginationDto);
    // return this.appService.getUsers().pipe(
    //   map((response: {data: []}) => {
    //     // Podés procesar la respuesta si querés, o devolverla directo
    //     return response.data; // o response.data si lo tenés estructurado así
    //   })
    // );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userClient.send('find_one_user', { id: id }).pipe(
      catchError((error) => {
        throw new RpcException(error); // Lanza la excepción para que el cliente la maneje
      })
    );
  }

  @Delete(':id')
  removeUser(@Param('id') id: string) {
    return `Eliminar usuario ${id}`;
  }

  @Patch(':id')
  patchUser(@Param('id') id: string) {
    return `Actualizar usuario ${id}`;
  }

}

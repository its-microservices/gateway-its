import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { map, Observable } from 'rxjs';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);
  constructor(private readonly appService: AppService) { }

  @Get('users')
  getUsers(): Observable<any> {
    return this.appService.getUsers().pipe(
      map((response: {data: []}) => {
        // Podés procesar la respuesta si querés, o devolverla directo
        return response.data; // o response.data si lo tenés estructurado así
      })
    );

  }
}
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {

  private readonly logger = new Logger(AppService.name);

  constructor(@Inject('MS_USER') private readonly userClient: ClientProxy, @Inject('MS_PRODUCTS') private readonly productsClient: ClientProxy) {
    this.userClient.connect().then(() => {
      this.logger.log('🟢 Conectado con el microservicio de usuarios');
    }).catch(err => {
      this.logger.error('🔴 No se pudo conectar al microservicio', err);
    });
  }

  getHello(): string {
    return 'Hello World!';
  }

  getUsers(): Observable<any> {
    this.logger.log('gateway service getUsers');
    return this.userClient.send('find_all_users', { page: 1, limit: 10 });
  }

  getProducts(): Observable<any> {
    this.logger.log('gateway service getProducts');
    return this.productsClient.send('find_all_products', { page: 1, limit: 10 });
  }
}

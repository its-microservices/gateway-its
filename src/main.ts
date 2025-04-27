import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.info(`Gateway escuchando desde le puerto: ${envs.MS_USER_PORT}`);
  await app.listen(envs.MS_USER_PORT);
}
bootstrap();

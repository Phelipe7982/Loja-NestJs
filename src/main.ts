import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurando o ValidationPipe (necessário para validação de dados)
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,    // Transforma os dados para o formato correto
      whitelist: true,    // Remove os dados que não foram validados
      forbidNonWhitelisted: true,   // Retorna um erro se houver dados não validados
    })
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const PORT = Number(process.env.PORT) || 3000;
  const app = await NestFactory.create(AppModule, { cors: true });
  const config = new DocumentBuilder()
    .setTitle('User requests service')
    .setDescription('')
    .setVersion('v1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT, () =>
    process.stdout.write(`server started on port: ${PORT}\n`),
  );
}
bootstrap();

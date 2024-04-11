import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    const swaggerConfig = new DocumentBuilder()
      .setTitle('Nest Test Api')
      .setDescription("Cat API documentation")
      .setVersion('2.0')
      .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('/api-docs', app, document);
    await app.listen(3000);
    console.log(`Application is running on: ${await app.getUrl()}`);
  } catch(err) {

  }
}
bootstrap();

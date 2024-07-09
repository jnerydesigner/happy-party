import { NestFactory } from '@nestjs/core';
import { AppModule } from './infra/modules/app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { ZodFilter } from '@application/filters/zod-filter.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ZodFilter());
  const configService = new ConfigService();
  const logger = new Logger('Main Class');
  const PORT = configService.get('PORT');

  const config = new DocumentBuilder()
    .setTitle('Happy party API')
    .setDescription('Happy party api description')
    .setVersion('1.0')
    .addTag('happy-party')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    jsonDocumentUrl: '/api-json',
  });
  await app.listen(PORT, () => {
    logger.log(`Server is running on http://localhost:${PORT}`);
  });
}
bootstrap();

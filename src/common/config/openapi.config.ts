import { DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';

export const documentOptions = new DocumentBuilder()
  .setTitle('Simple-Tasks API')
  .setDescription('The Simple-Tasks API')
  .setVersion(process.env.npm_package_version)
  .build();

export const swaggerOptions: SwaggerCustomOptions = {
  customSiteTitle: 'Swagger Simple-Tasks API',
};

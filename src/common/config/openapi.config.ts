import { DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';

export const documentOptions = new DocumentBuilder()
  .setTitle('Simple-Todo API')
  .setDescription('The Simple-Todo API')
  .setVersion(process.env.npm_package_version)
  .build();

export const swaggerOptions: SwaggerCustomOptions = {
  customSiteTitle: 'Swagger Simple-Todo API',
};

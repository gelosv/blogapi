import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Blog API',
      description: 'Documentación de la API usando Swagger',
      version: '1.0.0',
    },
  },
  apis: ['./**/*.router.ts'],
};

const openapiSpecification = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
};

import swaggerJsdoc from 'swagger-jsdoc'

import dotenv from 'dotenv'
import { serve, setup } from 'swagger-ui-express';
dotenv.config();
const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Flaunt Fashion API documentation.',
      version: '1.0.0'
    },
    servers: [
      {
        url: process.env.SERVER === 'Dev' ? 
            'http://localhost:'+process.env.PORT : 
            process.env.LIVE_LINK,
      },
    ],
  },
  apis: ['../index.js', '../app.js', '../routes/**/*.js'],
}

const swaggerSpecs = swaggerJsdoc(options)

const swaggerMiddleWare = server => server.use("/api-docs", serve, setup(swaggerSpecs, {
  customCssUrl:
    "https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-flattop.css",
}))

export default swaggerMiddleWare
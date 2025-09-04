/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app/app.module';

async function bootstrap() {
  try {
    console.log('🔄 Starting NestJS application...');
    console.log('Environment:', {
      NODE_ENV: process.env.NODE_ENV,
      PORT: process.env.PORT,
      FRONTEND_URL: process.env.FRONTEND_URL
    });

    const app = await NestFactory.create(AppModule);
    console.log('✅ NestJS application created successfully');

    app.enableCors({
      origin: process.env.FRONTEND_URL || 'http://localhost:4200',
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    });
    console.log('✅ CORS enabled');

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      })
    );
    console.log('✅ Global validation pipes configured');

    const port = process.env.PORT ?? 3001;
    console.log(`🔄 Attempting to listen on port ${port}...`);
    
    await app.listen(port, '0.0.0.0');
    console.log(`🚀 Backend server running on http://0.0.0.0:${port}`);
    console.log(`🏥 Health check available at http://0.0.0.0:${port}/health`);
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

bootstrap().catch((error) => {
  console.error('❌ Bootstrap failed:', error);
  process.exit(1);
});

// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module.js';
// import { ValidationPipe } from '@nestjs/common';

// // starts the server / backend entry point

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   app.useGlobalPipes(
//     new ValidationPipe({
//       whitelist: true,
//       forbidNonWhitelisted: true, // rejects properties not defined in the DTO
//       transform: true,
//     }),
//   );
//   app.enableCors({
//     origin: process.env.FRONTEND_URL ?? 'http://localhost:5173',
//   });
//   await app.listen(process.env.PORT ?? 3000);
// }
// try {
//   await bootstrap();
// } catch (error) {
//   console.error('Failed to start application:', error);
//   throw error;
// }



// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module.js';
// import { ValidationPipe } from '@nestjs/common';

// async function bootstrap() {
//   console.log('BOOT: starting Nest');

//   const app = await NestFactory.create(AppModule);

//   console.log('BOOT: Nest created');

//   app.useGlobalPipes(
//     new ValidationPipe({
//       whitelist: true,
//       forbidNonWhitelisted: true,
//       transform: true,
//     }),
//   );

//   app.enableCors({
//     origin: process.env.FRONTEND_URL ?? 'http://localhost:5173',
//   });

//   console.log('BOOT: DATABASE_URL exists:', Boolean(process.env.DATABASE_URL));
//   console.log('BOOT: FRONTEND_URL exists:', Boolean(process.env.FRONTEND_URL));

//   await app.listen(process.env.PORT ?? 3000);

//   console.log('BOOT: listening');
// }

// try {
//   await bootstrap();
// } catch (error) {
//   console.error('BOOT FAILED:', error);
//   throw error;
// }



import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((error) => {
  console.error('BOOT FAILED:', error);
  process.exit(1);
});
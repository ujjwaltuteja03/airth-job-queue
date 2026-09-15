import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { AppController } from './app.controller.js';
// import { AppService } from './app.service.js';
import { JobsModule } from './jobs/jobs.module.js';
import { DatabaseModule } from './database/database.module.js';

// organizational container

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    JobsModule,
  ],
  controllers: [], // classes handling incoming requests
  providers: [], // classes containing functionality
})
export class AppModule {}

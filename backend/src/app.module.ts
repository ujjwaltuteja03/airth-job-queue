// import { Module } from '@nestjs/common';
// import { ConfigModule } from '@nestjs/config';
// import { JobsModule } from './jobs/jobs.module.js';
// import { DatabaseModule } from './database/database.module.js';


// @Module({
//   imports: [
//     ConfigModule.forRoot({ isGlobal: true }),
//     DatabaseModule,
//     JobsModule,
//   ],
// })
// export class AppModule {}

import { Module, Controller, Get } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module.js';
import { JobsModule } from './jobs/jobs.module.js';

@Controller()
class TestController {
  @Get()
  root() {
    return { message: 'Nest is running' };
  }

  @Get('health')
  health() {
    return { status: 'ok' };
  }
}

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    JobsModule,
  ],
  controllers: [TestController],
})
export class AppModule {}
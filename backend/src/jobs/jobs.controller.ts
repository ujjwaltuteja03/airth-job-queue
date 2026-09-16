import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  ParseIntPipe,
  Patch,
  Delete,
} from '@nestjs/common';
import { JobsService } from './jobs.service.js';
import { CreateJobDto } from './dto/create-job.dto.js';
import { UpdateJobStatusDto } from './dto/update-job-status.dto.js';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  getAllJobs() {
    return this.jobsService.getAllJobs();
  }

  @Post()
  createJob(@Body() createJobDto: CreateJobDto) {
    return this.jobsService.createJob(createJobDto);
  }

  @Get(':id')
  getJobById(@Param('id', ParseIntPipe) id: number) {
    return this.jobsService.getJobById(id);
  }

  @Patch(':id/status')
  updateJobStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateJobStatusDto: UpdateJobStatusDto,
  ) {
    return this.jobsService.updateJobStatus(id, updateJobStatusDto);
  }

  @Delete(':id')
  deleteJob(@Param('id', ParseIntPipe) id: number) {
    return this.jobsService.deleteJob(id);
  }
}

import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service.js';
import { CreateJobDto } from './dto/create-job.dto.js';
import { UpdateJobStatusDto } from './dto/update-job-status.dto.js';

@Injectable()
export class JobsService {
  constructor(private readonly databaseService: DatabaseService) {}

  // POST ---------------------------------
  async createJob(CreateJobDto: CreateJobDto) {
    const { title, type } = CreateJobDto;
    const result = await this.databaseService.query(
      `INSERT INTO jobs (title, type) VALUES ($1, $2) RETURNING *`,
      [title, type],
    );
    return result.rows[0];
  }

  // GET ----------------------------------------
  async getAllJobs() {
    const result = await this.databaseService.query(
      `SELECT * FROM jobs ORDER BY created_at DESC`, // newest first
    );
    return result.rows;
  }

  //GET BY ID --------------------------------------
  async getJobById(id: number) {
    const result = await this.databaseService.query(
      `SELECT * FROM jobs WHERE id = $1`,
      [id],
    );

    if (result.rows.length === 0) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }

    return result.rows[0];
  }

  // UPDATE(PATCH) --------------------------------
  // contains rules for valid updates, handles concurrency, error messages
  async updateJobStatus(
    id: number,
    updateJobStatusDto: UpdateJobStatusDto,
  ) {
    const job = await this.getJobById(id);
    const newStatus = updateJobStatusDto.status;
    const allowedTransitions: Record<string, string[]> = {
      pending: ['running'],
      running: ['completed', 'failed'],
      completed: [],
      failed: [],
    };
    
    if (!allowedTransitions[job.status].includes(newStatus)) {
      throw new BadRequestException(
        `Cannot transition job from ${job.status} to ${newStatus}`,
      );
    }

    const result = await this.databaseService.query(
      `UPDATE jobs SET status = $1 WHERE id = $2 AND status = $3 RETURNING *`, [newStatus, id, job.status],
    );

    if (result.rows.length === 0){
      throw new ConflictException(
        'Job Status changed before this request could be completed',
      )
    }
    return result.rows[0];
  }


  // DELETE -----------------------------------
  async deleteJob(id: number) {
    const result = await this.databaseService.query(
      `DELETE FROM jobs WHERE id = $1 RETURNING *`, [id],
    );

    if (result.rows.length === 0 ){
      throw new NotFoundException(`Job with ID $(id) not found`);
    }

    return result.rows[0];
  }
}

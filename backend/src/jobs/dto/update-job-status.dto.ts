import { IsIn, IsString } from 'class-validator';

export class UpdateJobStatusDto {
  @IsString()
  @IsIn(['pending', 'running', 'completed', 'failed'])
  status!: string;
}
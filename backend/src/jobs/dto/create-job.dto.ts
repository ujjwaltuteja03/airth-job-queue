import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

// Data Transfer Object ~ shape of data accepted

export class CreateJobDto {
    //id, status(default pending), created_at(timestampwithzone) auto created
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  type!: string;
}

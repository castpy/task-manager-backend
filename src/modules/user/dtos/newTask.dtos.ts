import { ApiProperty } from '@nestjs/swagger';

class DateDto {
  @ApiProperty({
    type: String,
    example: '2025-04-08T08:00:00Z',
  })
  from: string;

  @ApiProperty({
    type: String,
    example: '2025-04-01T18:00:00Z',
  })
  to: string;
}

export class NewTaskDto {
  @ApiProperty({
    type: String,
    example: 'Complete project report',
  })
  title: string;

  @ApiProperty({
    type: String,
    example: 'Prepare and submit the final project report',
  })
  description: string;

  @ApiProperty({
    type: DateDto,
  })
  date: DateDto;

  @ApiProperty({
    type: String,
    example: 'to-do',
  })
  status: string;
}

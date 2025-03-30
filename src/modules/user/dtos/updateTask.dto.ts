import { ApiProperty } from '@nestjs/swagger';

export class PutTaskDto {
  @ApiProperty({
    type: String,
    example: '123456789',
  })
  id: string;

  @ApiProperty({
    type: String,
    example: 'to-do',
  })
  status: string;
}

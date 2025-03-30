import { ApiProperty } from '@nestjs/swagger';

export class TaskDto {
  @ApiProperty({
    type: String,
    example: '4ae1a8f4-3111-406d-ba34-dd2da32917a7',
  })
  id: string;

  @ApiProperty({ type: String, example: 'Teste 01' })
  title: string;

  @ApiProperty({ type: String, example: 'Teste 01' })
  description: string;

  @ApiProperty({ type: String, example: '2025-03-30T20:26:27.074Z' })
  date_from: string;

  @ApiProperty({ type: String, example: '2025-04-06T20:26:27.074Z' })
  date_to: string;

  @ApiProperty({ type: String, example: 'to-do' })
  status: string;
}

import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty({
    type: String,
    example: 'User not found',
  })
  mesage: string;

  @ApiProperty({
    type: String,
    example: 'Not Found',
  })
  error: string;

  @ApiProperty({
    type: Number,
    example: 404,
  })
  statusCode: number;
}

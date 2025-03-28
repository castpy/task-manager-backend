import { ApiProperty } from '@nestjs/swagger';

export class AuthBodyDto {
  @ApiProperty({ type: String, example: 'user@email.com' })
  email: string;

  @ApiProperty({ type: String, example: 'Teste@123' })
  password: string;
}

export class AuthOkResponseDto {
  @ApiProperty({
    type: String,
    example: '90931e71-c82b-40fa-a3ea-e9d87d0ba965',
  })
  token: string;
}

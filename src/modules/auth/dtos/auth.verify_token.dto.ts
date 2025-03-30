import { ApiProperty } from '@nestjs/swagger';

export class AuthVerifyTokenBodyDto {
  @ApiProperty({ type: String, example: '123456789' })
  token: string;
}

export class AuthVerifyTokenOkResponseDto {
  @ApiProperty({
    type: Boolean,
    example: true,
  })
  valid: boolean;
}

export class AuthVerifyTokenUnauthorizedResponseDto {
  @ApiProperty({
    type: Boolean,
    example: true,
  })
  valid: boolean;

  @ApiProperty({ type: String, example: 'Não autorizado' })
  error: string;
}

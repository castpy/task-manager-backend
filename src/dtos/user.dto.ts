import { ApiProperty } from '@nestjs/swagger';

class InfosDto {
  @ApiProperty({
    type: String,
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    type: String,
    nullable: true,
    example: 'https://example.com/avatar.jpg',
  })
  avatar: string | null;
}

export class UserDto {
  @ApiProperty({
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    type: String,
    example: 'user@example.com',
  })
  email: string;

  @ApiProperty({
    type: [InfosDto],
  })
  infos: InfosDto[];
}

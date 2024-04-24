import { ApiProperty } from '@nestjs/swagger';

export class UpdateMovieDto {
  @ApiProperty({ required: false })
  readonly title?: string;

  @ApiProperty({ required: false })
  readonly description?: string;

  @ApiProperty({ required: false })
  readonly releaseYear?: number;
}

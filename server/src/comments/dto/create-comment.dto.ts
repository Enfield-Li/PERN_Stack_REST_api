import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty()
  comment_text: string;
  @ApiProperty()
  parentId?: number;
}

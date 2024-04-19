import { Schema } from 'mongoose';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUrlDto {
  @IsNotEmpty()
  readonly userId: Schema.Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  readonly url: string;
}

import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(9)
  @MaxLength(9)
  @Matches(/^\d{9}$/, { message: 'Id number must be a number' })
  idNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}

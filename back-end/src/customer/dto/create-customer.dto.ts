import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  birthday: Date;
}

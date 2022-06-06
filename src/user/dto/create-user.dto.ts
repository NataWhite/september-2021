import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {

  @IsString()
  @Length(2, 10)
  public name: string;

  @ApiProperty({ example: 'user@gmail.com', description: 'email' })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsNumber()
  public age: number;

  @IsString()
  public city: string;

  @IsString()
  @Length(3, 10)
  readonly password: string;

  @IsBoolean()
  public status: boolean;
}

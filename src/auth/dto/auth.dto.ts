import { IsNotEmpty, IsString, IsEmail, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty()
  public email: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 20, { message: 'Password has to be at between 3 and 20 chars' })
  @ApiProperty()
  public password: string;
}

export class SignUpAuthDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty()
  public email: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 20, { message: 'Password has to be at between 3 and 20 chars' })
  @ApiProperty()
  public password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public lastName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public firstName: string;
}

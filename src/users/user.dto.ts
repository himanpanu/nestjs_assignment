import { IsString, IsEmail, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @IsEmail()
  @ApiProperty()
  public email: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  public lastName: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  public firstName: string;
}

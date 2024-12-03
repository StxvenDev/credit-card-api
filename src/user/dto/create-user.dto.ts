import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserDto {

  @IsString()
  @MinLength(2)
  fullname : string;

  @IsEmail()
  @IsString()
  @MinLength(2)
  email : string;
}

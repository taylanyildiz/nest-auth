import { IsEmail, IsNotEmpty, IsString, Length, MinLength } from "class-validator";

export class ResetPasswordDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(6)
    code: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
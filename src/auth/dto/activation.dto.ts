import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class ActivationDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(6)
    code: string;
}
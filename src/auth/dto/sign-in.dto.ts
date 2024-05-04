import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignInDTO {
    @ApiProperty({ example: "example@mail.com" })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: 'Passwrod123.' })
    @IsString()
    @IsNotEmpty()
    password: string;
}
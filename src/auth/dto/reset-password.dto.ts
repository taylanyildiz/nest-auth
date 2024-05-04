import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length, MinLength } from "class-validator";

export class ResetPasswordDTO {
    @ApiProperty({ example: 'example@mail.com' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: '123456' })
    @IsString()
    @MinLength(6)
    code: string;

    @ApiProperty({ example: 'NewPassword123.' })
    @IsString()
    @IsNotEmpty()
    password: string;
}
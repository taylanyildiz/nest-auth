import { ApiProperty } from "@nestjs/swagger";
import { isEmail, IsEmail, IsEnum, IsMobilePhone, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";
import { UserRole } from "src/user/enums";

export class SignUpDTO {
    @ApiProperty({ enum: UserRole })
    @IsEnum(UserRole)
    role: UserRole;

    @ApiProperty({example:'Jack'})
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @ApiProperty({example:'Jonea'})
    @IsString()
    @IsNotEmpty()
    lastName: string;

    @ApiProperty({example:'example@mail.com'})
    @IsEmail()
    email: string;

    @ApiProperty({example:'+9055555555555'})
    @IsMobilePhone('tr-TR', { strictMode: true })
    @IsNotEmpty()
    phone: string;

    @ApiProperty({example:'Password12.'})
    @IsStrongPassword()
    @IsNotEmpty()
    password: string;
}
import { IsEmail, IsEnum, IsMobilePhone, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";
import { UserRole } from "src/user/enums";

export class SignUpDTO {
    @IsEnum(UserRole)
    role: UserRole;

    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsEmail()
    email: string;

    @IsMobilePhone('tr-TR', { strictMode: true })
    @IsNotEmpty()
    phone: string;

    @IsStrongPassword()
    @IsNotEmpty()
    password: string
}
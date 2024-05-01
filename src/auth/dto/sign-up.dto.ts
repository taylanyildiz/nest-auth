import { UserRole } from "src/user/enums";

export class SignUpDTO {
    role: UserRole;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string
}
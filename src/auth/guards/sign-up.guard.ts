import { BadRequestException, CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { Request } from "express";
import { User } from "src/user/entities/user.entity";

@Injectable()
export class SignUpGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const http: HttpArgumentsHost = context.switchToHttp();
        const req: Request = http.getRequest<Request>();
        const { email, phone }: { email?: string | null, phone?: string | null } = req.body;
        if (!email || !phone) throw new BadRequestException('Phone or Email Required');
        const user: User = await User.findOne({ where: [{ email }, { phone }] });
        if (user) throw new BadRequestException('Phone or Email Already Used')
        return true;
    }
}
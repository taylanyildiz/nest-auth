import { CanActivate, ExecutionContext, Injectable, Provider, UnauthorizedException } from "@nestjs/common";
import { APP_GUARD, Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { PUBLIC_KEY } from "../decorators";


@Injectable()
class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly reflector: Reflector,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride(PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) return true;

        const req: Request = context.switchToHttp().getRequest<Request>();
        const token = req.accessToken;
        if (!token) throw new UnauthorizedException('Token Not Found');
        try {
            const payload = await this.jwtService.verifyAsync(token);
            req['user'] = payload;
        } catch (error) {
            throw new UnauthorizedException(error);
        }
        return true;
    }
}


export const AuthAppGuard: Provider = {
    provide: APP_GUARD,
    useClass: AuthGuard,
};

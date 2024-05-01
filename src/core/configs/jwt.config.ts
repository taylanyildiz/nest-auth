import { ConfigService } from "@nestjs/config";
import { JwtModuleAsyncOptions, JwtModuleOptions } from "@nestjs/jwt";

export const jwtConfig: JwtModuleAsyncOptions = {
    global: true,
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
        signOptions: {
            expiresIn: config.get('JWT_EXPIRES'),
        },
    }),
} 
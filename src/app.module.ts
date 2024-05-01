import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { configOptions, jwtConfig, typeOrmOptions } from "./core/configs";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthAppGuard } from "./core/guards";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";

@Module({
    imports: [
        ConfigModule.forRoot(configOptions),
        JwtModule.registerAsync(jwtConfig),
        TypeOrmModule.forRootAsync(typeOrmOptions),
        AuthModule,
        UserModule,
    ],
    providers: [
        AuthAppGuard,
    ]
})
export class AppModule { }
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { configOptions, jwtConfig, typeOrmOptions } from "./core/configs";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthGuardProvider } from "./core/guards";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { HttpExceptionProvider } from "./core/filters";

@Module({
    imports: [
        ConfigModule.forRoot(configOptions),
        JwtModule.registerAsync(jwtConfig),
        TypeOrmModule.forRootAsync(typeOrmOptions),
        AuthModule,
        UserModule,
    ],
    providers: [
        AuthGuardProvider,
        HttpExceptionProvider,
    ]
})
export class AppModule { }
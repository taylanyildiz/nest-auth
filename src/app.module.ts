import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { configOptions, jwtConfig, typeOrmOptions } from "./core/configs";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [
        ConfigModule.forRoot(configOptions),
        JwtModule.registerAsync(jwtConfig),
        TypeOrmModule.forRootAsync(typeOrmOptions)
    ]
})
export class AppModule { }
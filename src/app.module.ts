import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { configOptions, jwtConfig } from "./core/configs";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [
        ConfigModule.forRoot(configOptions),
        JwtModule.registerAsync(jwtConfig),
    ]
})
export class AppModule { }
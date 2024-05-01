import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import path from "path";

export const typeOrmOptions: TypeOrmModuleAsyncOptions = {
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
        synchronize: true,
        autoLoadEntities: true,
        migrationsRun: false,
        type: 'postgres',
        host: config.get<string>('POSTGRES_HOST'),
        port: config.get<number>('POSTGRES_PORT'),
        database: config.get<string>('POSTGRES_NAME'),
        username: config.get<string>('POSTGRES_USER'),
        password: config.get<string>('POSTGRES_PASSWORD'),
        logger: "debug",
        entities: [
            path.join(__dirname, '../../**', '*.entity.{ts,js}'),
        ],
        migrations: [
            path.join(__dirname, '../migrations', '*.{ts,js}'),
        ],
    })
}
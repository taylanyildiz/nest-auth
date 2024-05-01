import { ConfigModuleOptions } from '@nestjs/config';
export * from './jwt.config';
export * from './type_orm.config';
export * from './api.config';

/// Configuation Options
export const configOptions: ConfigModuleOptions = {
    isGlobal: true,
    envFilePath: `${process.cwd()}/.env.${process.env.NODE_ENV}`,
};
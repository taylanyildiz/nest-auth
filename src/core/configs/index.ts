import { ConfigModuleOptions } from '@nestjs/config';
export * from './jwt.config';


export const configOptions: ConfigModuleOptions = {
    isGlobal: true,
    envFilePath: `${process.cwd()}/.env.${process.env.NODE_ENV}`,
};
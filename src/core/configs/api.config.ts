import { VersioningOptions, VersioningType } from "@nestjs/common";

export const apiOptions: VersioningOptions = {
    type: VersioningType.URI,
    prefix: 'api/v',
    defaultVersion: '1',
}
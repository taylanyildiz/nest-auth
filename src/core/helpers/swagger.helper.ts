import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export class SwaggerHelper {
    constructor(private readonly app: NestExpressApplication) {
        this.init();
    }
    
    private config = new DocumentBuilder()
        .setTitle('Authentication App')
        .setDescription('Api Documentation')
        .setVersion('1.0')
        .build();


    private init() {
        const document = SwaggerModule.createDocument(this.app, this.config);
        SwaggerModule.setup('api-docs', this.app, document);
    }
}
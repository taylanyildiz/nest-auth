import { Body, Controller, ForbiddenException, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public } from "src/core/decorators";
import { SignUpGuard } from "./guards";
import { SignUpDTO } from "./dto";

@Public()
@Controller('auth')
export class AuthController {
    constructor(private readonly service: AuthService) { }

    @UseGuards(SignUpGuard)
    @Post('sign-up')
    public signUp(@Body() body: SignUpDTO): any {
        return this.service.signUp(body);
    }
}
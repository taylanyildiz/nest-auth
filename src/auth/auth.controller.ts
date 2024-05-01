import { Body, Controller, ForbiddenException, Post, Query, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public } from "src/core/decorators";
import { SignUpGuard } from "./guards";
import { ActivationDTO, SignInDTO, SignUpDTO } from "./dto";

@Public()
@Controller('auth')
export class AuthController {
    constructor(private readonly service: AuthService) { }

    @UseGuards(SignUpGuard)
    @Post('sign-up')
    public signUp(@Body() body: SignUpDTO): any {
        return this.service.signUp(body);
    }

    @Post('activation')
    public activation(@Query() query: ActivationDTO): any {
        return this.service.activation(query.email, query.code);
    }

    @Post('code')
    public sendActivationCode(@Body('email') email: string): any {
        return this.service.sendActivationCode(email);
    }

    @Post('sign-in')
    public signIn(@Body() body: SignInDTO): any {
        return this.service.signIn(body.email, body.password);
    }
}
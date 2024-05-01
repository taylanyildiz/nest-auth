import { Body, Controller, ForbiddenException, Post, Put, Query, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public } from "src/core/decorators";
import { SignUpGuard } from "./guards";
import { ActivationDTO, ResetCodeDTO, ResetPasswordDTO, SignInDTO, SignUpDTO } from "./dto";

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

    @Post('forgot-password')
    public forgotPassword(@Body('email') body: string): any {
        return this.service.forgotPassword(body);
    }

    @Post('forgot-password/check')
    public checkResetCode(@Body() body: ResetCodeDTO): any {
        return this.service.checkResetCode(body.email, body.code);
    }

    @Put('forgot-password')
    public resetPassword(@Body() body: ResetPasswordDTO): any {
        return this.service.resetPassword(body.email, body.code, body.password);
    }

}
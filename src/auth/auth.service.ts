import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { SignUpDTO } from "./dto";
import { TransactionFactory, TransactionService } from "src/core/database/transaction";
import { User } from "src/user/entities/user.entity";
import { RegistrationCode } from "./entities";
import { compareHash, generateCode } from "src/core/helpers/functions";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly transactionService: TransactionService,
    ) { }


    public async signUp(data: SignUpDTO): Promise<any> {
        const transaction: TransactionFactory = await this.transactionService.createTransaction();
        try {
            const user = await transaction.manager.save(new User(data));
            const code = generateCode(6);
            await transaction.manager.save(new RegistrationCode({
                user,
                email: user.email,
                code,
            }));
            await transaction.commit();
            return { message: 'Registration Code Send' }
        } catch (error) {
            await transaction.rollback();
            throw error;
        } finally {
            await transaction.release();
        }
    }

    public async activation(email: string, code: string): Promise<any> {
        const transaction: TransactionFactory = await this.transactionService.createTransaction();
        try {
            const user = await User.findOneBy({ email });
            if (!user) throw new NotFoundException('User Not Found');
            if (user.status) throw new ForbiddenException('User Already Activated');

            const registrationCode = await RegistrationCode.findOneBy({ email: user.email, code, });
            if (!registrationCode) throw new NotFoundException('Registration Code Not Found or Expired');

            user.status = true;

            await transaction.manager.save(user);
            await transaction.manager.remove(registrationCode);
            await transaction.commit();
            return { message: 'User Activated Successfully' };
        } catch (error) {
            await transaction.rollback();
            throw error;
        } finally {
            await transaction.release();
        }
    }

    public async sendActivationCode(email: string): Promise<any> {
        const transaction: TransactionFactory = await this.transactionService.createTransaction();
        try {
            const user = await User.findOneBy({ email });
            if (!user) throw new NotFoundException('User Not Found');
            if (user.status) throw new ForbiddenException('User Already Activated');

            const code = generateCode(6);
            await RegistrationCode.upsert({ user, email, code }, { conflictPaths: ['email'] });
            return { message: 'Registration Code Send' };
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    public async signIn(email: string, password: string): Promise<any> {
        const user = await User.findOneBy({ email });
        if (!user.status) throw new ForbiddenException('User Not Activated');
        if (!await compareHash(password, user.password)) throw new ForbiddenException('Email or Password Wrong');
        user.password = null;
        return { data: { user } };
    }
}
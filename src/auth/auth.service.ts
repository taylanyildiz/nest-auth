import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ActivationDTO, SignUpDTO } from "./dto";
import { TransactionFactory, TransactionService } from "src/core/database/transaction";
import { User } from "src/user/entities/user.entity";
import { RegistrationCode } from "./entities";
import { generateCode } from "src/core/helpers/functions";

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
            return { message: 'Account Created Successfully' }
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
}
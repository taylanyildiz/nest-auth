import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { SignUpDTO } from "./dto";
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
        } finally {
            await transaction.release();
        }
    }
}
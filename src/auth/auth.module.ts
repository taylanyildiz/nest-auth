import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import TransactionService from "src/core/database/transaction/transaction.service";

@Module({
    controllers: [AuthController],
    providers: [AuthService, TransactionService],
})
export class AuthModule { }
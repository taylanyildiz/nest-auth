import { DataSource } from "typeorm";
import { Injectable } from "@nestjs/common";
import { TransactionFactory } from "./transaction.factory";

@Injectable()
export class TransactionService {
    constructor(private readonly dataSource: DataSource) { }

    public async createTransaction(): Promise<TransactionFactory> {
        const runner = this.dataSource.createQueryRunner();
        await runner.connect();
        const transactionFactory = new TransactionFactory(runner);
        await transactionFactory.start();
        return transactionFactory;
    }
}
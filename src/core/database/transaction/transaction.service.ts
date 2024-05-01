import { DataSource } from "typeorm";
import TransactionFactory from "./transaction.factory";
import { Injectable } from "@nestjs/common";

@Injectable()
export default class TransactionService {
    constructor(private readonly dataSource: DataSource) { }

    public async createTransaction(): Promise<TransactionFactory> {
        const runner = this.dataSource.createQueryRunner();
        await runner.connect();
        const transactionFactory = new TransactionFactory(runner);
        await transactionFactory.start();
        return transactionFactory;
    }
}
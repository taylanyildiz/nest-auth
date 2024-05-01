import { EntityManager, QueryRunner } from "typeorm";
import ITransacion from "./transaction.interface";

export class TransactionFactory implements ITransacion {
    constructor(private readonly runner: QueryRunner) { }


    manager: EntityManager = this.runner.manager;


    start(): Promise<void> {
        return this.runner.startTransaction();
    }
    commit(): Promise<void> {
        return this.runner.commitTransaction();
    }
    rollback(): Promise<void> {
        return this.runner.rollbackTransaction();
    }
    release(): Promise<void> {
        return this.runner.release();
    }
}
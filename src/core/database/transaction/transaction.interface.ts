import { EntityManager } from "typeorm";

export default abstract class ITransacion {

    /**
     * Entity Manager
     */
    abstract manager: EntityManager;

    /**
     * Start Transaction
     */
    abstract start(): Promise<void>;

    /**
     * Commit Transaction
     */
    abstract commit(): Promise<void>;

    /**
     * Rollback Transaction
     */
    abstract rollback(): Promise<void>;


    /**
     * Release Transaction
     */
    abstract release(): Promise<void>;
}
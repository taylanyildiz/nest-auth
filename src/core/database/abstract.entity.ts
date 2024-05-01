import { BaseEntity, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export default class AbstractEntity<T extends Object> extends BaseEntity {
    constructor(args?: Partial<T>) {
        super();
        Object.assign(this, args);
    }


    @PrimaryGeneratedColumn('increment')
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
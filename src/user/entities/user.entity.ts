import AbstractEntity from "src/core/database/abstract.entity";
import { UserRole } from "../enums";
import { BeforeInsert, Column, Entity, OneToOne } from "typeorm";
import { setHash } from "src/core/helpers/functions";

@Entity('users')
export class User extends AbstractEntity<User> {
    @Column('enum', { enum: UserRole, default: UserRole.customer, nullable: false })
    role: UserRole;

    @Column('varchar', { nullable: false, length: 100 })
    firstName: string;

    @Column('varchar', { nullable: false, length: 100 })
    lastName: string;

    @Column('text', { unique: true, nullable: false })
    email: string;

    @Column('varchar', { unique: true, nullable: false, length: 200 })
    phone: string;

    @Column('text', { nullable: false })
    password: string;

    @Column('boolean', { nullable: false, default: false })
    status: boolean;

    @BeforeInsert()
    public async hashPassword(): Promise<void> {
        this.password = await setHash(this.password);
    }
}
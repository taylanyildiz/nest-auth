import AbstractEntity from "src/core/database/abstract.entity";
import { UserRole } from "../enums";
import { Column, Entity } from "typeorm";

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

    @Column('enum', { nullable: false, default: false })
    status: boolean;
}
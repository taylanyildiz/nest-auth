import AbstractEntity from "src/core/database/abstract.entity";
import { UserRole } from "../enums";
import { AfterLoad, BeforeInsert, BeforeUpdate, Column, Entity, OneToOne } from "typeorm";
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

    private templatePassword: string;
    @AfterLoad()
    private loadTemplatePassword(): void {
        this.templatePassword = this.password;
    }

    @BeforeInsert()
    private async hashPassword(): Promise<void> {
        this.password = await setHash(this.password);
    }

    @BeforeUpdate()
    private async updatePassword(): Promise<void> {
        if (this.templatePassword == this.password) return;
        this.password = await setHash(this.password);
    }
}
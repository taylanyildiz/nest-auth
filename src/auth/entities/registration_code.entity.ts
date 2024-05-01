import AbstractEntity from "src/core/database/abstract.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

@Entity('registration_codes')
export class RegistrationCode extends AbstractEntity<RegistrationCode> {
    @Column()
    userId: number;

    @Column('text', { nullable: false, unique: true })
    email: string;

    @Column('varchar', { nullable: false, length: 6 })
    code: string;

    @OneToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user: User;
}
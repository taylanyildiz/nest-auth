import AbstractEntity from "src/core/database/abstract.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

@Entity('reset_codes')
export class ResetCode extends AbstractEntity<ResetCode> {
    @Column()
    userId: number;

    @Column('text', { unique: true, nullable: false })
    email: string;

    @Column('varchar', { nullable: false, length: 6 })
    code: string;

    @OneToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user: User;
}
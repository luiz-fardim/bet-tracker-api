import { Transaction } from 'src/transactions/entities/transaction.entity';
import { Role } from 'src/enum/role.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @Column()
  birth: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  role: Role;

  @OneToMany(() => Transaction, (transaction) => transaction.user, {
    cascade: true,
  })
  transactions: Transaction[];
}

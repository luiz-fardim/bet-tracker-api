import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'bets' })
export class Bet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: true,
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: { to: (v) => v, from: (v) => parseFloat(v) },
  })
  profit: number;

  @Column()
  homeTeam: string;

  @Column()
  visitingTeam: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  value: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  odd: number;

  @Column()
  market: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @Column({
    type: 'enum',
    enum: betStatus,
    default: betStatus.PENDING,
  })
  status: betStatus;

  @ManyToOne(() => User, (user) => user.bets, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;
}

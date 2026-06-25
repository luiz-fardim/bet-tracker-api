import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum betStatus {
  PENDING = 'pending',
  WON = 'won',
  LOST = 'lost',
}

@Entity()
export class Bet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
}

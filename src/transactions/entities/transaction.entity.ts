import { AssetTypeEnum } from 'src/enum/assetType.enum';
import { TransactionStatusEnum } from 'src/enum/transactionStatus.enum';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'transactions' })
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  assetName: string;

  @Column({
    type: 'enum',
    enum: AssetTypeEnum,
    default: AssetTypeEnum.STOCK,
  })
  assetType: AssetTypeEnum;

  @Column({ nullable: true })
  broker: string;

  @Column({ type: 'decimal', precision: 10, scale: 4 })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  buyPrice: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  sellPrice: number | null;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  fees: number;

  @Column({
    type: 'enum',
    enum: TransactionStatusEnum,
    default: TransactionStatusEnum.OPEN,
  })
  status: TransactionStatusEnum;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  profit: number | null;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.transactions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;
}

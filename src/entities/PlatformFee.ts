import {
      Entity,
      Column,
      CreateDateColumn,
      UpdateDateColumn,
      PrimaryGeneratedColumn,
      ManyToOne,
      JoinColumn
} from 'typeorm';
import { Specialist } from './Specialist';


@Entity("platform_fees")
export class PlatformFee {
      @PrimaryGeneratedColumn("uuid")
      id!: string;

      @ManyToOne(() => Specialist, { nullable: false })
      @JoinColumn({ name: "specialist_id" })
      specialist!: Specialist;

      @Column()
      tier_name!: string;

      @Column("decimal", { precision: 10, scale: 2 })
      min_value!: number;

      @Column("decimal", { precision: 10, scale: 2 })
      max_value!: number;

      @Column("decimal", { precision: 5, scale: 2 })
      platform_fee_percentage!: number;

      @CreateDateColumn()
      created_at!: Date;

      @UpdateDateColumn()
      updated_at!: Date;
}
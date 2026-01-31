import {
      Entity,
      Column,
      CreateDateColumn,
      UpdateDateColumn,
      PrimaryGeneratedColumn
} from 'typeorm';


@Entity("platform_fees")
export class PlatformFee {
      @PrimaryGeneratedColumn("uuid")
      id!: string;

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
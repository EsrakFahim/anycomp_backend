import {
      Entity,
      PrimaryGeneratedColumn,
      Column,
      CreateDateColumn,
      UpdateDateColumn,
      DeleteDateColumn,
      OneToMany
} from 'typeorm';
import { Media } from './Media';


console.log('Specialist entity file loaded');
@Entity("specialists")
export class Specialist {
      @PrimaryGeneratedColumn("uuid")
      id!: string;

      @Column()
      title!: string;

      @Column({ nullable: true })
      description!: string;

      @Column({ unique: true })
      slug!: string;

      @Column()
      is_draft!: boolean;

      @Column("decimal", { precision: 3, scale: 2 })
      average_rating!: number;

      @Column()
      total_number_of_reviews!: number;

      @Column("decimal", { precision: 10, scale: 2 })
      base_price!: number;

      @Column("decimal", { precision: 10, scale: 2 })
      platform_fee!: number;

      @Column("decimal", { precision: 10, scale: 2 })
      final_price!: number;

      @Column()
      verification_status!: string;

      @Column()
      is_verified!: boolean;

      @Column()
      duration_days!: number;

      // 🔥 THIS WAS MISSING
      @OneToMany(() => Media, (media) => media.specialist)
      media!: Media[];

      @CreateDateColumn()
      created_at!: Date;

      @UpdateDateColumn()
      updated_at!: Date;

      @DeleteDateColumn()
      deleted_at!: Date | null;
}
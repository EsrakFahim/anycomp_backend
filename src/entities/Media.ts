import {
      Entity,
      PrimaryGeneratedColumn,
      Column,
      UpdateDateColumn,
      CreateDateColumn,
      DeleteDateColumn,
      ManyToOne,
      JoinColumn
} from 'typeorm';
import { Specialist } from './Specialist';


@Entity("media")
export class Media {
      @PrimaryGeneratedColumn("uuid")
      id!: string;

      @ManyToOne(() => Specialist, { nullable: false })
      @JoinColumn({ name: "specialist_id" })
      specialist!: Specialist;
      @Column()
      file_name!: string;

      @Column()
      file_size!: number;

      @Column()
      display_order!: number;

      @Column()
      mime_type!: string;

      @Column({ type: "enum", enum: ["video", "image", "pdf"] })
      media_type!: string;

      @CreateDateColumn()
      created_at!: Date;

      @UpdateDateColumn()
      updated_at!: Date;

      @DeleteDateColumn()
      deleted_at!: Date | null;
}
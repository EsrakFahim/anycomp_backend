import {
      Entity,
      Column,
      CreateDateColumn,
      UpdateDateColumn,
      Index,
      PrimaryGeneratedColumn
} from 'typeorm';

@Entity("service_offerings_master_list")
export class ServiceOfferingMasterList {
      @PrimaryGeneratedColumn("uuid")
      id!: string;

      @Column()
      title!: string;

      @Column("text")
      description!: string;

      @Column()
      s3_key!: string;

      @Column()
      bucket_name!: string;

      @CreateDateColumn()
      created_at!: Date;

      @UpdateDateColumn()
      updated_at!: Date;
}
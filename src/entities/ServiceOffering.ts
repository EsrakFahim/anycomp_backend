import {
      Entity,
      Column,
      CreateDateColumn,
      UpdateDateColumn,
      PrimaryGeneratedColumn,
      Index,
      ManyToOne,
      JoinColumn
} from 'typeorm';
import { Specialist } from './Specialist';
import {  ServiceOfferingMasterList } from './ServiceOfferingsMasterList';


@Entity("service_offerings")
@Index(["specialist", "serviceOffering"])
export class ServiceOffering {
      @PrimaryGeneratedColumn("uuid")
      id!: string;

      @ManyToOne(() => Specialist, { nullable: false })
      @JoinColumn({ name: "specialist_id" })
      specialist!: Specialist;
      @ManyToOne(() => ServiceOfferingMasterList, { nullable: false })
      @JoinColumn({ name: "service_id" })
      serviceOffering!: ServiceOfferingMasterList;

      @CreateDateColumn()
      created_at!: Date;

      @UpdateDateColumn()
      updated_at!: Date;
}
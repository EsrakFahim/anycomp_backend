import { DataSource } from 'typeorm';
import { Specialist } from './entities/Specialist';
import { Media } from './entities/Media';
import { ServiceOffering } from './entities/ServiceOffering';
import { ServiceOfferingMasterList } from './entities/ServiceOfferingsMasterList';
import { PlatformFee } from './entities/PlatformFee';

export const AppDataSource = new DataSource({

  type: 'postgres',
  url: process.env.DATABASE_URL, // ✅ USE THIS
  ssl: {
    rejectUnauthorized: false,
  },
  synchronize: true, // ⚠️ OK for dev, NOT prod

  logging: false,
  entities: [
    Specialist,
    Media,
    ServiceOffering,
    ServiceOfferingMasterList,
    PlatformFee,
  ],
});
import { DataSource } from 'typeorm';
import { Specialist } from './entities/Specialist';
import { Media } from './entities/Media';
import { ServiceOffering } from './entities/ServiceOffering';
import { ServiceOfferingMasterList } from './entities/ServiceOfferingsMasterList';
import { PlatformFee } from './entities/PlatformFee';

console.log(
  'DB CONFIG:',
  {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  }
)
export const AppDataSource = new DataSource({

  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [
    Specialist,
    Media,
    ServiceOffering,
    ServiceOfferingMasterList,
    PlatformFee
  ],
  migrations: [],
  subscribers: [],
});

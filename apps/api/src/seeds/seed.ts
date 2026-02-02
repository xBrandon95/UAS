// apps/api/src/seeds/seed.ts

import { DataSource, DataSourceOptions } from 'typeorm';
import { Usuario } from '../modules/usuarios/entities/usuario.entity';
import { Unidad } from '../modules/unidades/entities/unidad.entity';
import { seedAdmin } from './admin.seed';
import { config } from 'dotenv';

config();

const options: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Usuario, Unidad],
  synchronize: false,
};

const dataSource = new DataSource(options);

async function runSeeds() {
  try {
    await dataSource.initialize();
    console.log('🗄️  Conectado a la base de datos.');

    await seedAdmin(dataSource);

    await dataSource.destroy();
    console.log('🗄️  Conexión cerrada.');
  } catch (error) {
    console.error('❌ Error ejecutando seeds:', error);
    await dataSource.destroy();
    process.exit(1);
  }
}

void runSeeds();

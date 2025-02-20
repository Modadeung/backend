import configuration from 'src/config/configuration';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config as configDotenv } from 'dotenv';
import { ConfigSchema } from 'src/config';

configDotenv({
  path: `envs/.env.${process.env.NODE_ENV}`,
});

const config: ConfigSchema = configuration();

export const dataSourceOption: DataSourceOptions = {
  type: 'postgres',
  host: config.postgresHost,
  port: config.postgresPort,
  username: config.postgresUserName,
  password: config.postgresPassword,
  database: config.postgresDatabaseName,
  dropSchema: false,
  synchronize: false,
  entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
  migrationsTableName: 'migrations',
};

export const dataSource = new DataSource(dataSourceOption);
